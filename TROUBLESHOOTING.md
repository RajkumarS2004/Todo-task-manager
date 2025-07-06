# TaskFlow Troubleshooting Guide

## Common Errors and Solutions

### 1. Server Crash on Startup

**Error**: `Cannot find module 'passport-github2'` or `Cannot find module 'passport-facebook'`

**Solution**: Install the missing OAuth dependencies

```bash
# Navigate to server directory
cd server

# Install the missing dependencies
npm install passport-github2 passport-facebook

# Or install all dependencies
npm install
```

### 2. OAuth Credentials Not Found

**Error**: OAuth strategies not configured

**Solution**: Set up your OAuth credentials in the `.env` file

1. Create a `.env` file in the `server` directory
2. Add your OAuth credentials:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/taskflow

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Client URL (for CORS and OAuth redirects)
CLIENT_URL=http://localhost:5173

# OAuth Credentials (at least one is required)
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

FACEBOOK_CLIENT_ID=your-facebook-client-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret-here
```

### 3. MongoDB Connection Error

**Error**: `DB connection failed`

**Solution**: Check your MongoDB connection

1. Ensure MongoDB is running locally, or
2. Use MongoDB Atlas (cloud database)
3. Update the `MONGO_URI` in your `.env` file

### 4. Port Already in Use

**Error**: `EADDRINUSE: address already in use`

**Solution**: Change the port or kill the existing process

```bash
# Option 1: Change port in .env file
PORT=5001

# Option 2: Kill existing process (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Option 2: Kill existing process (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### 5. CORS Errors

**Error**: CORS policy blocking requests

**Solution**: Check CORS configuration

1. Ensure `CLIENT_URL` is set correctly in `.env`
2. Make sure frontend is running on the correct port
3. Check that the frontend URL matches the CORS configuration

### 6. JWT Token Errors

**Error**: JWT verification failed

**Solution**: Check JWT configuration

1. Ensure `JWT_SECRET` is set in `.env`
2. Make sure the secret is consistent between server restarts
3. Check token expiration settings

## Quick Fix Script

Run the following commands to fix common issues:

```bash
# 1. Install missing dependencies
cd server
npm install passport-github2 passport-facebook

# 2. Create .env file if it doesn't exist
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env
echo "MONGO_URI=mongodb://localhost:27017/taskflow" >> .env
echo "JWT_SECRET=your-super-secret-jwt-key-here" >> .env
echo "CLIENT_URL=http://localhost:5173" >> .env

# 3. Start the server
npm run dev
```

## Development Setup Checklist

- [ ] Node.js installed (v18 or higher)
- [ ] MongoDB running or Atlas connection configured
- [ ] OAuth credentials set up (at least one provider)
- [ ] Environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors
- [ ] Frontend can connect to backend
- [ ] OAuth login works

## Testing OAuth Providers

1. **Google OAuth**: Requires Google Cloud Console setup
2. **GitHub OAuth**: Requires GitHub Developer Settings setup
3. **Facebook OAuth**: Requires Facebook Developers setup

See [OAUTH_SETUP_GUIDE.md](OAUTH_SETUP_GUIDE.md) for detailed setup instructions.

## Getting Help

If you're still experiencing issues:

1. Check the console logs for specific error messages
2. Ensure all environment variables are set correctly
3. Verify that all dependencies are installed
4. Check that MongoDB is accessible
5. Test with a single OAuth provider first

## Emergency Fallback

If OAuth setup is causing issues, you can temporarily disable OAuth and use email/password authentication only by commenting out the OAuth strategies in `server/config/Passport.js`. 