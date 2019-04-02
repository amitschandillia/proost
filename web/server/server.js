import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import next from 'next';
import path from 'path';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import csp from 'helmet-csp';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  // Custom middleware
  // ---------------------------------------------------------------------
  server.use(compression());
  server.use(favicon(path.join(__dirname, '..', 'static', 'images', 'icons', 'favicon.ico')));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(helmet.referrerPolicy({ policy: 'origin' }));
  server.use(helmet.xssFilter());
  server.use(helmet.frameguard());
  server.use(helmet.noSniff());
  server.use(csp({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", '*.google-analytics.com'],
      imgSrc: ["'self'", '*.google-analytics.com'],
      connectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com'], // Remove unsafe-inline for better security
      fontSrc: ["'self'"],
      objectSrc: ["'self'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"]
    }
  }));

  // ---------------------------------------------------------------------

  // Custom build resources aliases
  // ---------------------------------------------------------------------
  server.use('/_s', express.static(path.join(__dirname, '..',  '.build', 'static')));
  server.use('/_f', express.static(path.join(__dirname, '..',  'static')));
  server.use('/favicon.ico', express.static(path.join(__dirname, '..',  'static', 'images', 'icons', 'favicon.ico')));
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
    console.log(`Server listening on port: ${process.env.WEB_PORT}...`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
