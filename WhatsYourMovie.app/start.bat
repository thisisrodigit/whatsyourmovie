@echo off
echo ========================================
echo Starting WhatsYourMovie Application
echo ========================================
echo.
echo Backend will start on http://localhost:5000
echo Frontend will start on http://localhost:3000
echo.
echo Press Ctrl+C to stop the servers
echo.

start "Backend Server" cmd /k "cd backend && node server.js"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Servers are starting...
echo.
echo Once both servers are running, open your browser to:
echo http://localhost:3000
echo.
pause

