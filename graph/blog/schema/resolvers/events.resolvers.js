'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Event from '../../models/event';

// GraphQL: Resolvers
module.exports = {
  Query: {
    events: () => {
      return Event
      .find()
      .then(events => {
        return events.map(event => {
          return { ...event._doc };
        });
      })
      .catch(err => {
        throw err;
      });
    },
  },
  Mutation: {
    createEvent: (root, args, context) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
      });
      return event
      .save()
      .then(result => {
        return { ...result._doc };
      })
      .catch(err => {
        throw err;
      });
    }
  }
};
