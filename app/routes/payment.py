from fastapi import APIRouter, HTTPException, Request, Depends
from sqlalchemy.orm import Session
import razorpay
import os
import hmac
import hashlib
import json
from app.database import get_db, User

router = APIRouter()

rzp_client = razorpay.Client(
    auth=(
        os.getenv("RAZORPAY_KEY_ID", ""),
        os.getenv("RAZORPAY_KEY_SECRET", "")
    )
)

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://resumex-ai.com")


@router.post("/create-order")
async def create_order(data: dict):
    try:
        amount = data.get("amount", 0)
        plan_name = data.get("plan_name", "Pro")
        user_id = data.get("user_id", "")

        order = rzp_client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "plan": plan_name.lower(),
                "user_id": user_id
            }
        })

        return {"order_id": order["id"], "amount": amount, "currency": "INR"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/verify")
async def verify_payment(data: dict, db: Session = Depends(get_db)):
    try:
        payment_id = data.get("razorpay_payment_id")
        order_id = data.get("razorpay_order_id")
        signature = data.get("razorpay_signature")
        user_id = data.get("user_id", "")
        plan = data.get("plan", "pro")

        rzp_client.utility.verify_payment_signature({
            "razorpay_payment_id": payment_id,
            "razorpay_order_id": order_id,
            "razorpay_signature": signature
        })

        # Update user plan
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                user.plan = plan.lower()
                db.commit()

        return {"success": True, "payment_id": payment_id}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Payment verification failed")


@router.post("/webhook")
async def razorpay_webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.body()
    signature = request.headers.get("X-Razorpay-Signature", "")
    webhook_secret = os.getenv("RAZORPAY_WEBHOOK_SECRET", "")

    if webhook_secret:
        expected = hmac.new(
            webhook_secret.encode(),
            body,
            hashlib.sha256
        ).hexdigest()

        if not hmac.compare_digest(expected, signature):
            raise HTTPException(status_code=400, detail="Invalid signature")

    data = json.loads(body)
    event = data.get("event")

    if event == "payment.captured":
        payment = data["payload"]["payment"]["entity"]
        user_id = payment.get("notes", {}).get("user_id", "")
        plan = payment.get("notes", {}).get("plan", "pro")

        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user:
                user.plan = plan.lower()
                db.commit()

    return {"status": "ok"}
