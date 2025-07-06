@echo off
echo ========================================
echo    TaskFlow Application Starter
echo ========================================
echo.

echo Step 1: Installing server dependencies...
cd server
npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies!
    pause
    exit /b 1
)
echo ✅ Server dependencies installed successfully!
echo.

echo Step 2: Installing client dependencies...
cd ../client
npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies!
    pause
    exit /b 1
)
echo ✅ Client dependencies installed successfully!
echo.

echo Step 3: Checking environment files...
cd ../server
if not exist ".env" (
    echo ⚠️  No .env file found in server directory!
    echo Creating a basic .env file...
    echo PORT=5000 > .env
    echo NODE_ENV=development >> .env
    echo MONGO_URI=mongodb://localhost:27017/taskflow >> .env
    echo JWT_SECRET=your-super-secret-jwt-key-here >> .env
    echo CLIENT_URL=http://localhost:5173 >> .env
    echo.
    echo Please update the .env file with your actual credentials!
    echo See OAUTH_SETUP_GUIDE.md for OAuth setup instructions.
    echo.
)

cd ../client
if not exist ".env" (
    echo ⚠️  No .env file found in client directory!
    echo Creating a basic .env file...
    echo VITE_API_URL=http://localhost:5000/api > .env
    echo VITE_WS_URL=http://localhost:5000 >> .env
    echo.
)

echo ✅ Environment files checked!
echo.

echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your OAuth credentials in server/.env
echo 2. Set up MongoDB (local or Atlas)
echo 3. Start the server: cd server && npm run dev
echo 4. Start the client: cd client && npm run dev
echo.
echo For detailed setup instructions, see:
echo - OAUTH_SETUP_GUIDE.md
echo - TROUBLESHOOTING.md
echo.
pause 