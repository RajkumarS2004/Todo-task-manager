# OAuth Setup Guide for TaskFlow

This guide will help you set up OAuth authentication for Google, GitHub, and Facebook in your TaskFlow application.

## Prerequisites

- Node.js and npm installed
- A MongoDB database (local or Atlas)
- Accounts on Google Cloud Console, GitHub, and Facebook Developers

## 1. Google OAuth Setup

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### Step 2: Configure OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "TaskFlow"
   - User support email: Your email
   - Developer contact information: Your email
4. Add scopes: `email`, `profile`
5. Add test users if needed

### Step 3: Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback` (development)
   - `https://your-domain.com/api/auth/google/callback` (production)
5. Copy the Client ID and Client Secret

## 2. GitHub OAuth Setup

### Step 1: Create a GitHub OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: "TaskFlow"
   - Homepage URL: `http://localhost:5173` (development)
   - Authorization callback URL: `http://localhost:5000/api/auth/github/callback`
4. Click "Register application"
5. Copy the Client ID and Client Secret

### Step 2: Configure Scopes
- The application will request `user:email` scope to access user's email

## 3. Facebook OAuth Setup

### Step 1: Create a Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App"
3. Choose "Consumer" app type
4. Fill in the app details:
   - App name: "TaskFlow"
   - Contact email: Your email
5. Complete the setup

### Step 2: Configure Facebook Login
1. In your app dashboard, click "Add Product"
2. Add "Facebook Login"
3. Configure the settings:
   - Valid OAuth Redirect URIs: `http://localhost:5000/api/auth/facebook/callback`
   - Client OAuth Login: Enabled
   - Web OAuth Login: Enabled
4. Copy the App ID and App Secret

## 4. Environment Configuration

### Backend Environment Variables
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

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here

# Facebook OAuth Credentials
FACEBOOK_CLIENT_ID=your-facebook-client-id-here
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret-here

# Optional: Session Secret
SESSION_SECRET=your-session-secret-here
```

### Frontend Environment Variables
Create a `.env` file in the `client` directory:

```env
# API URL
VITE_API_URL=http://localhost:5000/api

# WebSocket URL (optional - for real-time features)
VITE_WS_URL=http://localhost:5000
```

## 5. Installation and Setup

### Install Dependencies
```bash
# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

### Start the Application
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd ../client
npm run dev
```

## 6. Testing OAuth

1. Visit `http://localhost:5173`
2. Click "Sign In" or "Sign Up"
3. Try each OAuth provider:
   - Google: Should redirect to Google consent screen
   - GitHub: Should redirect to GitHub authorization
   - Facebook: Should redirect to Facebook login

## 7. Production Deployment

### Update Redirect URIs
For production deployment, update the redirect URIs in each OAuth provider:

- **Google**: Add `https://your-domain.com/api/auth/google/callback`
- **GitHub**: Update to `https://your-domain.com/api/auth/github/callback`
- **Facebook**: Update to `https://your-domain.com/api/auth/facebook/callback`

### Environment Variables
Update your production environment variables with the production URLs:

```env
CLIENT_URL=https://your-domain.com
```

## 8. Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Ensure the redirect URI in your OAuth app matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found" error**
   - Verify your environment variables are correctly set
   - Restart your server after changing environment variables

3. **CORS errors**
   - Ensure `CLIENT_URL` is correctly set in your backend
   - Check that your frontend URL matches the CORS configuration

4. **"Email not provided" error**
   - Some OAuth providers may not provide email by default
   - Check the scopes requested in your OAuth configuration

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=passport:*
```

## 9. Security Considerations

1. **Environment Variables**: Never commit OAuth secrets to version control
2. **HTTPS**: Use HTTPS in production for secure OAuth flows
3. **Scopes**: Only request necessary scopes from OAuth providers
4. **Token Storage**: Store JWT tokens securely in localStorage
5. **Rate Limiting**: Implement rate limiting for OAuth endpoints

## 10. Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/)
- [Passport.js Documentation](http://www.passportjs.org/)

---

**Note**: This setup guide assumes you're using the TaskFlow application structure. Adjust paths and configurations according to your specific setup. 