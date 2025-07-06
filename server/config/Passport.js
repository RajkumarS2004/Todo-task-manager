const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

const passportConfig = (passport) => {
  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists
            let user = await User.findOne({ 
              $or: [
                { googleId: profile.id },
                { email: profile.emails[0].value }
              ]
            });

            if (user) {
              // If user exists but doesn't have googleId, update it
              if (!user.googleId) {
                user.googleId = profile.id;
                user.avatar = profile.photos[0]?.value;
                await user.save();
              }
              return done(null, user);
            }

            // Create new user
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true // Google emails are verified
            });

            await user.save();
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
    console.log('✅ Google OAuth strategy configured');
  } else {
    console.log('⚠️  Google OAuth credentials not found. Google login will be disabled.');
  }

  // GitHub OAuth Strategy
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: '/api/auth/github/callback',
          scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists
            let user = await User.findOne({ 
              $or: [
                { githubId: profile.id },
                { email: profile.emails?.[0]?.value }
              ]
            });

            if (user) {
              // If user exists but doesn't have githubId, update it
              if (!user.githubId) {
                user.githubId = profile.id;
                user.avatar = profile.photos[0]?.value;
                await user.save();
              }
              return done(null, user);
            }

            // Create new user
            user = new User({
              githubId: profile.id,
              email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
              name: profile.displayName || profile.username,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true // GitHub emails are verified
            });

            await user.save();
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
    console.log('✅ GitHub OAuth strategy configured');
  } else {
    console.log('⚠️  GitHub OAuth credentials not found. GitHub login will be disabled.');
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          callbackURL: '/api/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'photos', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user already exists
            let user = await User.findOne({ 
              $or: [
                { facebookId: profile.id },
                { email: profile.emails?.[0]?.value }
              ]
            });

            if (user) {
              // If user exists but doesn't have facebookId, update it
              if (!user.facebookId) {
                user.facebookId = profile.id;
                user.avatar = profile.photos[0]?.value;
                await user.save();
              }
              return done(null, user);
            }

            // Create new user
            user = new User({
              facebookId: profile.id,
              email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
              name: profile.displayName,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true // Facebook emails are verified
            });

            await user.save();
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
    console.log('✅ Facebook OAuth strategy configured');
  } else {
    console.log('⚠️  Facebook OAuth credentials not found. Facebook login will be disabled.');
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

module.exports = passportConfig;