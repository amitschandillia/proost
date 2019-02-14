const subdomain = require('express-subdomain');
const express = require('express');
require('dotenv').config();
const path = require('path');
const { createReadStream } = require('fs');
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
const APIRoutes = require('./routes/api');
const AdminRoutes = require('./routes/admin');
const GraphRoutes = require('./routes/graph');
// const config = require('./config/main');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    mongoose.connect(
      process.env.MONGO_PATH_ATLAS_34,
      {
        auth: {
          user: process.env.MONGO_USERNAME,
          password: process.env.MONGO_PASSWORD,
        },
        useNewUrlParser: true,
      },
    );
    mongoose.set('useFindAndModify', false);

    server.use(compression());
    server.use(favicon(path.join(__dirname, 'static', 'images', 'icons', 'favicon.ico')));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(helmet());

    // Subdomain routing
    // ---------------------------------------------------------------------
    server.use(subdomain('api', APIRoutes));
    server.use(subdomain('admin', AdminRoutes));
    server.use(subdomain('graph', GraphRoutes));
    // ---------------------------------------------------------------------

    // Custom build resources aliases
    // ---------------------------------------------------------------------
    server.get('/sw.js', (req, res) => {
      res.set({ 'Content-Type': 'text/javascript' });
      createReadStream('./offline/serviceWorker.js').pipe(res);
    });
    server.use('/_s', express.static(path.join(__dirname, '.build', 'static')));
    server.use('/_f', express.static(path.join(__dirname, 'static')));
    server.use('/favicon.ico', express.static(path.join(__dirname, 'static', 'images', 'icons', 'favicon.ico')));
    server.use('/_next/webpack/static', express.static(path.join(__dirname, '.build', 'static')));
    // ---------------------------------------------------------------------

    // Custom/dynamic routes
    // ---------------------------------------------------------------------
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })
    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })
    // ---------------------------------------------------------------------


    // Default route (not to be edited)
    // ---------------------------------------------------------------------
    server.get('*', (req, res) => handle(req, res));
    // ---------------------------------------------------------------------

    server.listen(process.env.PORT, (err) => {
      if (err) throw err;
      console.log(`> Listening on port ${process.env.PORT}...`); // eslint-disable-line no-console
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
