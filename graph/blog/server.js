// Imports: Babel polyfill
import 'babel-polyfill';
// Imports: Dotenv
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
// Imports: Express
import express from 'express';
// Imports: GraphQL
import { ApolloServer } from 'apollo-server-express';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: GraphQL typedefs & resolvers
import { typeDefs, resolvers } from './schema';
// Imports: Playground settings
import playgroundSettings from './playground.json';

// Initialize global constants
dotenvExpand(dotenv.config({ path: '../../../proost/.env' }));

// DB: Connect to MongoDB
mongoose.connect(
  process.env.GRAPH_BLOG_MONGO_PATH_ATLAS_36,
  { useNewUrlParser: true },
).then(() => {
  console.log('Connected to db...');
}).catch((err) => {
  throw err;
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// GraphQL: Schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/blog', /* populates the playground endpoint box below the tab-strip. */
    settings: playgroundSettings,
  },
});

// Express: Initialize
const app = express();
// Middleware: GraphQL route
server.applyMiddleware({
  app,
  path: '/',
});
// Express: Listener
app.listen(process.env.GRAPH_BLOG_PORT, () => {
  console.log(`Server started on port: ${process.env.GRAPH_BLOG_PORT}`);
});

// Exports
export default app;
