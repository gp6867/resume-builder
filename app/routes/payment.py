from fastapi import APIRouter, HTTPException
import razorpay
import os

router = APIRouter()

# Razorpay client
# Stripe code saved for future use:
# import stripe
# stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")

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

        order = rzp_client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1,
            "notes": {
                "plan": plan_name,
                "user_id": data.get("user_id", "")
            }
        })

        return {"order_id": order["id"], "amount": amount, "currency": "INR"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/verify")
async def verify_payment(data: dict):
    try:
        payment_id = data.get("razorpay_payment_id")
        order_id = data.get("razorpay_order_id")
        signature = data.get("razorpay_signature")

        # Verify signature
        rzp_client.utility.verify_payment_signature({
            "razorpay_payment_id": payment_id,
            "razorpay_order_id": order_id,
            "razorpay_signature": signature
        })

        return {"success": True, "payment_id": payment_id}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Payment verification failed")


# Stripe checkout kept for future use
# @router.post("/create-checkout")
# async def create_stripe_checkout(data: dict):
#     session = stripe.checkout.Session.create(...)
#     return {"session_url": session.url}
