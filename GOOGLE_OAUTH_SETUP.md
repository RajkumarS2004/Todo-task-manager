# Google OAuth Setup Guide

This guide will help you set up Google OAuth for the TaskFlow application.

## Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. The application running locally

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" at the top
3. Click "New Project"
4. Enter a project name (e.g., "TaskFlow OAuth")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google+ API" and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: TaskFlow
   - User support email: Your email
   - Developer contact information: Your email
   - Save and continue through the steps

4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: TaskFlow Web Client
   - Authorized JavaScript origins:
     - `http://localhost:5173` (for development)
     - `http://localhost:3000` (if using different port)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback` (for development)
   - Click "Create"

5. Copy the Client ID and Client Secret

## Step 4: Configure Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory:

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

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Optional: Session Secret (if using sessions)
SESSION_SECRET=your-session-secret-here
```

### Client Environment Variables

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Step 5: Test the Setup

1. Start your server: `cd server && npm start`
2. Start your client: `cd client && npm run dev`
3. Go to the sign-in page
4. Click "Continue with Google"
5. You should be redirected to Google's OAuth consent screen
6. After authorization, you should be redirected back to the app

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Make sure the redirect URI in Google Cloud Console matches exactly: `http://localhost:5000/api/auth/google/callback`

2. **"invalid_client" error**
   - Check that your Google Client ID and Secret are correct
   - Make sure you've enabled the Google+ API

3. **CORS errors**
   - Ensure your server is running on the correct port
   - Check that CORS is properly configured in your server

4. **"No authentication token received"**
   - Check that the OAuth callback is working properly
   - Verify that the server is generating and redirecting with the token

### Debug Steps:

1. Check server console logs for OAuth errors
2. Check browser network tab for failed requests
3. Verify environment variables are loaded correctly
4. Test the `/api/auth/me` endpoint manually with a valid token

## Security Notes

- Never commit your `.env` files to version control
- Use strong, unique JWT secrets in production
- Consider using environment-specific OAuth credentials
- Regularly rotate your OAuth credentials

## Production Deployment

For production deployment:

1. Update the authorized origins and redirect URIs in Google Cloud Console
2. Use HTTPS URLs for production
3. Set appropriate environment variables on your hosting platform
4. Consider using a more secure session management strategy

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [Google Cloud Console](https://console.cloud.google.com/) 