'use strict';

// Imports: Dotenv
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand(dotenv.config());
// Imports: Express
import express from 'express';
// Imports: GraphQL
import { ApolloServer } from 'apollo-server-express';
// Imports: GraphQL typedefs & resolvers
import { typeDefs, resolvers } from './schema';
// Imports: Mongoose
import mongoose from 'mongoose';

// DB: Connect to MongoDB
mongoose.connect(
  process.env.MONGO_PATH_ATLAS_36,
  { useNewUrlParser: true }
).then(() => {
  console.log('> Connected to db...');
}).catch(err => {
throw err;
});
mongoose.set('useFindAndModify', false);

// GraphQL: Schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/test`,
    settings: { 'editor.theme': 'light' }
  }
});

// Express: Initialize
const app = express();
// Middleware: GraphQL route
server.applyMiddleware({
  app,
  path: '/test'
});
// Express: Listener
app.listen(process.env.PORT, () => {
  console.log(`The server has started on port: ${process.env.PORT}`);
});

// Exports
export default app;
