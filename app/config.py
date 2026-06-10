import os

class Settings:
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "change-this-secret")
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")
    DEBUG: bool = True

settings = Settings()

