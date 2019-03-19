// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: argon2
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
// Imports: Models
import User from '../../models/user';
import Post from '../../models/post';

// Check if draft is ready for submission
const isReady = async (_id) => {
  let status = true;
  // Check if all fields for the given post are populated
  const draft = await Post.findById(_id)
    .then(post => (post._doc))
    .catch((err) => { throw err; });
  console.log(draft);
  if (
    draft.title === ''
    // ... tests for other fields: slug, content, secondary title, thumbnail, banner, excerpt
  ) status = false;
  console.log(status);
  return status;
};

// Check privilege status
const hasPrivilege = async (req, privilege) => {
  let status = true;
  if (!req.isAuth) status = false;
  else if (!req.userData.privileges.includes(privilege)) status = false;
  return status;
};

const createPost = async (req) => {
  if (!await hasPrivilege(req, 'AUTHOR')) {
    throw new Error('Unauthorized request');
  }
  const createdPost = new Post({
    author: req.userData,
  });
  return createdPost.save();
};

const submitDraft = async (req, args) => {
  // Only allow submission if user has AUTHOR privilege
  if (!req.isAuth) { throw new Error('Unauthorized request'); }
  const isAuthor = req.userData.privileges.includes('AUTHOR');
  if (!isAuthor) { throw new Error('Unauthorized request'); }
  if (!await isReady(args._id)) throw new Error('Cannot submit incomplete draft');
  const submittedDraft = await Post
    .findOneAndUpdate({ _id: args._id },
      { $set: { isPending: true, submittedAt: new Date() } },
      { new: true });
  if (!submittedDraft) throw new Error('Couldn\'t submit draft');
  return submittedDraft;
};

// Resolve queries
module.exports = {
  // Resolve queries
  // Query: {
  //   // Retrieve all users
  //   users: () => User
  //     .find()
  //     .then(users => users.map(user => ({...user._doc, password: null})))
  //     .catch((err) => { throw err; }),
  //
  //   // Retrieve user by ID
  //   user: (root, args) => User.findById(args._id)
  //     .then(user => ({...user._doc, password: null}))
  //     .catch((err) => { throw err; }),
  //
  //   // Authenticate and login user
  //   login: async (root, args) => User
  //     .findOne({ username: args.username })
  //     .then(async (user) => {
  //       if (!user) { throw new Error('Wrong credentials...'); }
  //       const isEqual = await argon2.verify(user.password, args.password);
  //       if (!isEqual) { throw new Error('Wrong credentials...'); }
  //       const userData = { ...user._doc, password: null };
  //       const token = jwt.sign(
  //         { ...userData },
  //         process.env.GRAPH_BLOG_JWT_SECRET,
  //         { expiresIn: '1h' },
  //       );
  //       return { ...userData, token, tokenExpiration: 1 };
  //     })
  //     .catch((err) => { throw err; }),
  // },

  // Resolve mutations
  Mutation: {
    // Create a new post
    createPost: (root, args, req) => createPost(req),

    // Submit draft
    submitDraft: (root, args, req) => submitDraft(req, args),
  },
};
