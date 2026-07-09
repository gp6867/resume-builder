from fastapi import APIRouter, HTTPException
import stripe
import os

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")

FRONTEND_URL = os.getenv("FRONTEND_URL", "https://resumex-ai.com")


@router.post("/create-checkout")
async def create_checkout(data: dict):
    try:
        plan_name = data.get("plan_name", "Pro")
        user_email = data.get("user_email", "")
        user_id = data.get("user_id", "")

        if plan_name == "Pro":
            amount = 900
            interval = "month"
        else:
            amount = 4900
            interval = None

        if interval:
            price_data = {
                "currency": "usd",
                "unit_amount": amount,
                "recurring": {"interval": interval},
                "product_data": {"name": f"ResumeX AI {plan_name} Plan"},
            }
        else:
            price_data = {
                "currency": "usd",
                "unit_amount": amount,
                "product_data": {"name": f"ResumeX AI {plan_name} Plan"},
            }

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price_data": price_data, "quantity": 1}],
            mode="subscription" if interval else "payment",
            success_url=f"{FRONTEND_URL}/dashboard?payment=success",
            cancel_url=f"{FRONTEND_URL}/pricing?payment=cancelled",
            customer_email=user_email,
            metadata={"user_id": user_id, "plan": plan_name}
        )

        return {"session_url": session.url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
