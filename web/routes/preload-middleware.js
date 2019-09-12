import getSessIDFromCookies from '../utils/get-sessid-from-cookies';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const preLoadMiddleware = (req, res, next) => {
  const client = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
  );
  const cookieKeys = Object.keys(req.cookies);
  const sessCookie = getSessIDFromCookies(req);
  client.get(`sess:${sessCookie}`, (err, reply) => {
    if(reply) {
      res.locals.authenticated = true;
      next();
    }
    else {
      const cookieKeys = Object.keys(req.cookies);
      cookieKeys.forEach((cookie) => {
        const languageCookie = process.env.USER_LANGUAGE_COOKIE;
        if(cookie !== languageCookie) res.clearCookie(cookie);
      });
      res.locals.authenticated = false;
      next();
    }
  });
};

module.exports = preLoadMiddleware;
