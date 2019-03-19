// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: argon2
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
// Imports: Models
import Permission from '../../models/permission';
import Role from '../../models/role';
import User from '../../models/user';

const createRole = async (args, req) => {
  // only allow edit if the user making the edit has OWNER privilege
  // if (!req.isAuth) { throw new Error('Unauthenticated query'); }
  // const isOwner = req.userData.role.includes('OWNER');
  const role = new Role({ ...args });
  return role.save();
};

module.exports = {
  // Query: {},
  Mutation: {
    createRole: async (root, args, req) => createRole(args, req),
  },
};
