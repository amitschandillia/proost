import express from 'express';
import passport from 'passport';
import passportSetup from '../config/passport-setup';

const router = express.Router();

// auth login
router.get('/login', (req, res) => {
  res.send('login...');
});
// auth logout
router.get('/logout', (req, res) => {
  res.send('log out...');
});
// auth with Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

module.exports = router;
