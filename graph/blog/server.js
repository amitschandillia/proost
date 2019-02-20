'use strict';

// Imports: Dotenv
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand(dotenv.config({ path: '../../../proost/.env' }));
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
  process.env.GRAPH_BLOG_MONGO_PATH_ATLAS_36,
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
    endpoint: `/blog`, /* populates the playground endpoint box below the tab-strip. */
    settings: require('./playground.json')
  }
});

// Express: Initialize
const app = express();
// Middleware: GraphQL route
server.applyMiddleware({
  app,
  path: '/'
});
// Express: Listener
app.listen(process.env.GRAPH_BLOG_PORT, () => {
  console.log(`Server started on port: ${process.env.GRAPH_BLOG_PORT}`);
});

// Exports
export default app;
