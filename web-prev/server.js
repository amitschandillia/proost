const express = require('express')
const next = require('next')
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

// Initialize global constants
dotenvExpand(dotenv.config({ path: '../../proost/.env' }));

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    // server.get('*', (req, res) => {
    //   return handle(req, res)
    // })

    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => handle(req, res));

    server.listen(process.env.WEB_PORT, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
