import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import next from 'next';
import path from 'path';
import { createReadStream } from 'fs';
import favicon from 'serve-favicon';
import csp from 'helmet-csp';

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

  // Custom/dynamic routes
  // ---------------------------------------------------------------------
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });
  // ---------------------------------------------------------------------

  // Default route (not to be edited)
  // ---------------------------------------------------------------------
  server.get('*', (req, res) => handle(req, res));
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