from fastapi import APIRouter, HTTPException
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()

GMAIL_USER = os.getenv("GMAIL_USER", "")
GMAIL_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")

@router.post("/send")
async def send_contact(data: dict):
    name = data.get("name", "")
    email = data.get("email", "")
    subject = data.get("subject", "No Subject")
    message = data.get("message", "")

    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="Name, email and message are required")

    try:
        msg = MIMEMultipart()
        msg['From'] = GMAIL_USER
        msg['To'] = GMAIL_USER
        msg['Subject'] = f"ResumeX AI Contact: {subject}"

        body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #0a0a0f; padding: 40px; border-radius: 12px;">
                <h1 style="color: #6c63ff;">✦ ResumeX AI</h1>
                <h2 style="color: #e8e8f0;">New Contact Message</h2>
                <p style="color: #888899;"><b style="color:#e8e8f0;">Name:</b> {name}</p>
                <p style="color: #888899;"><b style="color:#e8e8f0;">Email:</b> {email}</p>
                <p style="color: #888899;"><b style="color:#e8e8f0;">Subject:</b> {subject}</p>
                <p style="color: #888899;"><b style="color:#e8e8f0;">Message:</b></p>
                <p style="color: #e8e8f0; background: #111118; padding: 16px; border-radius: 8px;">{message}</p>
            </div>
        </body>
        </html>
        """

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(GMAIL_USER, GMAIL_PASSWORD)
        server.sendmail(GMAIL_USER, GMAIL_USER, msg.as_string())
        server.quit()

        return {"success": True, "message": "Message sent successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")
