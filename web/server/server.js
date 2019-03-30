import dotenv from 'dotenv';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });
  server.get('*', (req, res) => handle(req, res));

  // Express: Listener
  server.listen(process.env.WEB_PORT, () => {
    console.log(`Server listening on port: ${process.env.WEB_PORT}...`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
