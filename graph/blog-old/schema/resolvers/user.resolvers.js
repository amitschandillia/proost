// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: argon2
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
// Imports: Models
import User from '../../models/user';
import Role from '../../models/role';
import Permission from '../../models/permission';

const argonOpts = {
  type: argon2.argon2i,
  memoryCost: 2 ** 12,
  timeCost: 3,
  hashLength: 40,
  parallelism: 1,
};

const getRolesAndPermissions = async (isOwner) => {
  let roles = [];
  let permissions = [];
  if (isOwner) {
    const owner = await User.findOne({ roles: 'Owner' });
    // if owner is not null, throw error "owner already exists"
    if (owner) throw new Error('An owner already exists');
    roles = ['Owner'];
    permissions = ['All'];
  } else {
    // create guest user:
    // get default role
    // get permissions for default role
    try {
      const defaultRole = await Role.findOne({ default: true }, 'roleName rolePermissions');
      const {roleName, rolePermissions} = JSON.parse(JSON.stringify(defaultRole));
      roles = roleName;
      for (let i = 0; i < rolePermissions.length; i += 1) {
        permissions.push(rolePermissions[i].permissionName);
      }
    } catch (err) { throw err; }
  }
  return { roles, permissions };
}

const createUser = async (args, isOwner) => {
  try {
    const { roles, permissions } = await getRolesAndPermissions (isOwner);
    const { userInfo } = args;
    return argon2.hash(args.userInfo.password, argonOpts)
      .then((hashedPassword) => {
        userInfo.password = hashedPassword;
        userInfo.roles = roles;
        userInfo.permissions = permissions;
        userInfo.apiKey = mongoose.Types.ObjectId().toString();
        const user = new User({ ...userInfo });
        return user.save();
      }).then(result => ({ ...result._doc, password: null }))
      .catch((err) => {
        const error = {
          code: err.code,
          name: err.name,
          message: err.errmsg,
        };
        return { error };
      });
  } catch (err) { throw err; }
};

const editRoles = async (args, req) => {
  // only allow edit if requesting user has permissions
  if (!req.isAuth) { throw new Error('Unauthenticated query'); }
  // permissions needed:
  // edit anyone's roles including own: all
  // edit anyone's roles excluding owner/own: ~
  const privilege = 'editRolesExceptOwn';
  const isOwner = req.userData.permissions.includes('All');
  const hasPermission = req.userData.permissions.includes(privilege);
  if(!(isOwner || hasPermission)) throw new Error('You do not have the permission');
  // get payload roles
  const payload = await User.findOne({username: args.username}, 'roles permissions');
  if (!payload) throw new Error('There was an error retrieving roles');
  if(payload.roles.includes('Owner')) throw new Error('Cannot edit owner privileges');
  if(args.username === req.userData.username) throw new Error('Cannot edit own roles');
  // retrieve requested roles, args.roles
  console.log('payload.roles', payload.roles);
  console.log('args.roles', args.roles);
  const merged = [...new Set([].concat(...[payload.roles, args.roles]))]
  console.log('merged', [...payload.roles, ...args.roles]);
  console.log(merged);
  // retrieve all permissions for this array into a distinct array
};

const editPrivileges = async (args, req) => {
  // only allow edit if the user making the edit has ADMIN or OWNER privilege
  if (!req.isAuth) { throw new Error('Unauthenticated query'); }
  const isAdmin = req.userData.privileges.includes('ADMIN');
  const isOwner = req.userData.privileges.includes('OWNER');
  if (!(isAdmin || isOwner)) throw new Error('You do not have this privilege');
  if (!isOwner && (req.userData.username === args.username)) throw new Error('Operation not allowed');
  const updatedUser = await User
    .findOneAndUpdate({ username: args.username },
      { $set: { privileges: args.privileges } },
      { new: true });
  if (!updatedUser) throw new Error('Couldn\'t update privileges');
  return updatedUser;
};

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all users
    users: () => User
      .find()
      .then(users => users.map(user => ({ ...user._doc, password: null })))
      .catch((err) => { throw err; }),

    // Retrieve user by ID
    user: (root, args) => User.findById(args._id)
      .then(user => ({ ...user._doc, password: null }))
      .catch((err) => { throw err; }),

    // Authenticate and login user
    login: async (root, args) => User
      .findOne({ username: args.username })
      .then(async (user) => {
        if (!user) { throw new Error('Wrong credentials...'); }
        const isEqual = await argon2.verify(user.password, args.password);
        if (!isEqual) { throw new Error('Wrong credentials...'); }
        const userData = user._doc;
        delete userData.password;
        const token = jwt.sign(
          { ...userData },
          process.env.GRAPH_BLOG_JWT_SECRET,
          { expiresIn: '1h' },
        );
        return { ...userData, token, tokenExpiration: 1 };
      })
      .catch((err) => { throw err; }),
  },

  // Resolve mutations
  Mutation: {
    // Create a new user
    createUser: (root, args) => createUser(args, false),

    // Add owner
    createOwner: (root, args) => createUser(args, true),

    // Edit user roles
    editRoles: (root, args, req) => editRoles(args, req),

    // Edit user privileges
    editPrivileges: async (root, args, req) => editPrivileges(args, req),
  },
};
