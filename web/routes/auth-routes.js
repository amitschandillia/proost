import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import uuidv4 from 'uuid/v4';
import google from './auth-providers/google';
import twitter from './auth-providers/twitter';
import local from './auth-providers/local';

const RedisStore = connectRedis(session);
const router = express.Router();

router.use(session({
  name: process.env.SESSION_COOKIE,
  genid: () => uuidv4(),
  cookie: {
    httpOnly: true,
  },
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 1 * 24 * 60 * 60, // In seconds
  }),
  saveUninitialized: false,
  resave: false,
}));

// Social auth routes
router.use('/google', google);
router.use('/twitter', twitter);
router.use('/local', local);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    Object.keys(req.cookies).forEach((cookie) => {
      res.clearCookie(cookie);
    });
    res.redirect(req.query.callback);
  });
});

module.exports = router;
