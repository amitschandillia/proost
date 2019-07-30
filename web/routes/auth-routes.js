import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import uuidv4 from 'uuid/v4';
import google from './auth-providers/google';
// import twitter from './auth-providers/twitter';

const RedisStore = connectRedis(session);
const router = express.Router();

router.use(session({
  name: '_ID.HSK',
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

router.use('/google', google);
// router.use('/twitter', twitter);

// auth login
router.get('/login', (req, res) => {
  res.send('login...');
});
// auth logout
router.get('/logout', (req, res) => {
  res.send('log out...');
});

module.exports = router;
