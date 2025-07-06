@echo off
echo Installing OAuth dependencies for TaskFlow...
echo.

echo Installing server dependencies...
cd server
npm install passport-github2 passport-facebook
echo Server dependencies installed successfully!
echo.

echo Installing client dependencies...
cd ../client
npm install
echo Client dependencies installed successfully!
echo.

echo All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Set up your OAuth credentials in the .env files
echo 2. Start the server: cd server && npm run dev
echo 3. Start the client: cd client && npm run dev
echo.
pause 