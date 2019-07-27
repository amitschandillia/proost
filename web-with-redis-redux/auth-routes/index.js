import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import google from './providers/google';

const RedisStore = connectRedis(session);

const router = express.Router();
router.use(session({
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 172800,
  }),
  saveUninitialized: false,
  resave: false,
}));

// auth login
router.get('/login', (req, res) => {
  res.send('login...');
});
// auth logout
router.get('/logout', (req, res) => {
  res.send('log out...');
});

router.use('/google', google);

module.exports = router;
