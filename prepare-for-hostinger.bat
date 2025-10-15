@echo off
echo Preparing files for Hostinger deployment...
echo.

REM Check if dist folder exists
if not exist "dist" (
    echo Error: dist folder not found. Please run 'npm run build' first.
    pause
    exit /b 1
)

REM Create a deployment folder
if exist "hostinger-deploy" rmdir /s /q "hostinger-deploy"
mkdir "hostinger-deploy"

REM Copy all files from dist to deployment folder
xcopy "dist\*" "hostinger-deploy\" /E /I /Y

echo.
echo ✓ Files prepared for deployment!
echo.
echo Next steps:
echo 1. Go to your Hostinger control panel
echo 2. Open File Manager
echo 3. Navigate to public_html folder
echo 4. Upload ALL contents from the 'hostinger-deploy' folder
echo.
echo The 'hostinger-deploy' folder contains all files you need to upload.
echo.
pause
