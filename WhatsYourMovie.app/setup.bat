@echo off
echo ========================================
echo WhatsYourMovie - Setup Script
echo ========================================
echo.

echo Installing root dependencies...
call npm install
if errorlevel 1 (
    echo Error installing root dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env and add your TMDB API key
echo 2. Run start.bat to launch the application
echo.
pause

