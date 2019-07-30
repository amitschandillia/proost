import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import google from './providers/google';
import uuidv4 from 'uuid/v4';

const RedisStore = connectRedis(session);

const secondsInMinutes = (minutes) => minutes * 60;
const secondsInHours = (hours) => hours * 60 * 60;
const secondsInDays = (days) => days * 24 * 60 * 60;
const secondsInWeeks = (weeks) => weeks *7 * 24 * 60 * 60;
const secondsInMonths = (months) => months * 30 * 24 * 60 * 60;

const router = express.Router();
router.use(session({
  name: '_ID.HSK',
  genid: (req) => {
    return uuidv4()
  },
  cookie: {
    httpOnly: true,
  },
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: secondsInDays(1),
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
