// Imports: Babel polyfill
// import 'babel-polyfill';

const subdomain = require('express-subdomain');
const express = require('express');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');
const { createReadStream } = require('fs');
const next = require('next');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const APIRoutes = require('./routes/api');
// const AdminRoutes = require('./routes/admin');
// const GraphRoutes = require('./routes/graph');
// const config = require('./config/main');

// Initialize global constants
dotenvExpand(dotenv.config({ path: '../../proost/.env' }));

const dev = process.env.WEB_PORT !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // mongoose.connect(
    //   process.env.GRAPH_BLOG_MONGO_PATH_ATLAS_36,
    //   {
    //     useFindAndModify: false,
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //   },
    // ).then(() => {
    //   console.log('Connected to db...');
    // }).catch((err) => {
    //   throw err;
    // });

    server.use(compression());
    // server.use(favicon(path.join(__dirname, 'static', 'images', 'icons', 'favicon.ico')));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(helmet());

    // Subdomain routing
    // ---------------------------------------------------------------------
    // server.use(subdomain('api', APIRoutes));
    // server.use(subdomain('admin', AdminRoutes));
    // server.use(subdomain('graph', GraphRoutes));
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

    server.listen(process.env.WEB_PORT, (err) => {
      if (err) throw err;
      console.log(`> Listening on port ${process.env.WEB_PORT}...`); // eslint-disable-line no-console
    });
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
