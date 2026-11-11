@echo off
echo ========================================
echo  Smart Nutricheck - Backend Startup
echo ========================================

REM Install python-dotenv if not already installed
pip install python-dotenv -q

REM Check if .env has the API key set
findstr /C:"your_gemini_api_key_here" .env >nul 2>&1
if %errorlevel%==0 (
    echo.
    echo [ERROR] Please set your Gemini API key in backend\.env
    echo   1. Open backend\.env
    echo   2. Replace "your_gemini_api_key_here" with your actual key
    echo   3. Get a free key at: https://aistudio.google.com/app/apikey
    echo.
    pause
    exit /b 1
)

echo Starting backend on http://localhost:8000 ...
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
