import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import google from './providers/google';

const RedisStore = connectRedis(session);

const router = express.Router();
router.use(session({
  key: 'user_sid',
  cookie: { httpOnly: true },
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 86400,
  }),
  saveUninitialized: false,
  resave: false,
}));

router.use('/google', google);

// auth login
router.get('/login', (req, res) => {
  res.send('login...');
});
// auth logout
router.get('/logout', (req, res) => {
  res.send('log out...');
});

module.exports = router;
