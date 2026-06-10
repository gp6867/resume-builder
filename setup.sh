#!/bin/bash
# ================================================
# AI Resume Builder — Backend Setup Script
# ================================================

echo "🚀 AI Resume Builder Backend Setup"
echo "===================================="

# 1. Python version check
echo "📌 Python version:"
python3 --version

# 2. Virtual environment banao
echo ""
echo "📦 Virtual environment bana rahe hain..."
python3 -m venv venv
source venv/bin/activate

# 3. Dependencies install karo
echo ""
echo "📥 Dependencies install ho rahi hain..."
pip install --upgrade pip
pip install -r requirements.txt

# 4. .env file banao
if [ ! -f .env ]; then
    echo ""
    echo "⚙️  .env file bana rahe hain..."
    cp .env.example .env
    echo "✅ .env file bani — apni API keys daalo!"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "▶️  Server start karne ke liye:"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload --port 8000"
echo ""
echo "📖 API docs dekhne ke liye browser mein kholo:"
echo "   http://localhost:8000/docs"
