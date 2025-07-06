const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware');
const { signup, signin, checkEmail } = require('../controllers/authController');
const { validateSignup, validateSignin } = require('../middleware/validationMiddleware');

// Google OAuth routes
router.get('/google', (req, res, next) => {
  console.log('Google OAuth initiated');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  console.log('Google OAuth callback received');
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  })(req, res, next);
}, (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Google OAuth successful, redirecting to:', `${process.env.CLIENT_URL}/auth-success?token=${token}`);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/signin?error=oauth_failed`);
  }
});

// GitHub OAuth routes
router.get('/github', (req, res, next) => {
  console.log('GitHub OAuth initiated');
  passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
});

router.get('/github/callback', (req, res, next) => {
  console.log('GitHub OAuth callback received');
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false
  })(req, res, next);
}, (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('GitHub OAuth successful, redirecting to:', `${process.env.CLIENT_URL}/auth-success?token=${token}`);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/signin?error=oauth_failed`);
  }
});

// Facebook OAuth routes
router.get('/facebook', (req, res, next) => {
  console.log('Facebook OAuth initiated');
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
});

router.get('/facebook/callback', (req, res, next) => {
  console.log('Facebook OAuth callback received');
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
  })(req, res, next);
}, (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Facebook OAuth successful, redirecting to:', `${process.env.CLIENT_URL}/auth-success?token=${token}`);
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error('Facebook OAuth callback error:', error);
    res.redirect(`${process.env.CLIENT_URL}/signin?error=oauth_failed`);
  }
});

// Traditional authentication routes
router.post('/signup', validateSignup, signup);
router.post('/signin', validateSignin, signin);
router.get('/check-email/:email', checkEmail);

// Get current user
router.get('/me', verifyToken, (req, res) => {
  res.json(req.user);
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
