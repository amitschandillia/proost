'use strict';

// Imports
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// Merge typeDefs
const typesArray = fileLoader(path.join(__dirname, 'typedefs', '/**/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

// Merge resolvers
const resolversArray = fileLoader(path.join(__dirname, 'resolvers', '*.resolvers.js'));
const resolvers = mergeResolvers(resolversArray);

// Exports
module.exports = { typeDefs, resolvers };
