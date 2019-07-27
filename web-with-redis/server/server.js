import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import next from 'next';
import path from 'path';
import { createReadStream } from 'fs';
import favicon from 'serve-favicon';
import csp from 'helmet-csp';
// import cookieSession from 'cookie-session';
// import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import authRoutes from '../auth-routes';

import getDirectives from './getDirectives';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  // Custom middleware
  // ---------------------------------------------------------------------
  server.use(favicon(path.join(__dirname, '..', 'static', 'brand', 'favicons', 'favicon.ico')));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(csp({
    directives: getDirectives(),
  }));

  // Cookies
  // ---------------------------------------------------------------------
  // server.use(cookieSession({
  //   name: '_SESS.CS',
  //   maxAge: 24 * 60 * 60 * 1000,
  //   keys: [process.env.COOKIE_KEY],
  // }));

  // server.use(session({
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: true }
  // }))

  // Initialize passport
  server.use(passport.initialize());
  server.use(passport.session());

  // Connect to MongoDB
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(process.env.DATABASE_URI, () => {
    // console.log('connected to mongo!');
  });

  // ---------------------------------------------------------------------

  // Custom static routes
  // ---------------------------------------------------------------------
  server.get('/serviceWorker.js', (req, res) => {
    res.set({ 'Content-Type': 'text/javascript' });
    createReadStream(path.join(__dirname, '..', 'offline', 'serviceWorker.js')).pipe(res);
  });
  server.use('/_s', express.static(path.join(__dirname, '..', '.build', 'static')));
  server.use('/_f', express.static(path.join(__dirname, '..', 'static')));
  // ---------------------------------------------------------------------

  // Auth routes
  // ---------------------------------------------------------------------
  server.use('/auth', authRoutes);
  // ---------------------------------------------------------------------

  // Custom/dynamic routes
  // ---------------------------------------------------------------------
  // server.get('/p/:id', (req, res) => {
  //   const actualPage = '/post';
  //   const queryParams = { title: req.params.id };
  //   app.render(req, res, actualPage, queryParams);
  // });
  // ---------------------------------------------------------------------

  // Default route (not to be edited)
  // ---------------------------------------------------------------------
  // server.get('*', (req, res) => handle(req, res));
  server.get('*', (req, res) => {
    // console.log('FROM SERVER', req.user);
    // res.locals.user = req.user || null;
    handle(req, res);
  });
  // ---------------------------------------------------------------------

  // Express: Listener
  server.listen(process.env.WEB_PORT, () => {
    /* eslint-disable no-console */
    console.log(`>> Listening on port ${process.env.WEB_PORT}`);
    /* eslint-enable no-console */
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
