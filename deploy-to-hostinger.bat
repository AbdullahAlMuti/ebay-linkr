@echo off
echo ========================================
echo   Hostinger Deployment Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building for production...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo Step 3: Preparing files for Hostinger...
REM Create deployment folder
if exist "hostinger-deploy" rmdir /s /q "hostinger-deploy"
mkdir "hostinger-deploy"

REM Copy all files from dist to deployment folder
xcopy "dist\*" "hostinger-deploy\" /E /I /Y

echo.
echo ========================================
echo   DEPLOYMENT READY!
echo ========================================
echo.
echo Next steps:
echo 1. Go to your Hostinger hPanel
echo 2. Open File Manager
echo 3. Navigate to public_html folder
echo 4. Upload ALL contents from 'hostinger-deploy' folder
echo.
echo The 'hostinger-deploy' folder contains all files you need to upload.
echo.
echo Press any key to open the deployment folder...
pause >nul
explorer "hostinger-deploy"
