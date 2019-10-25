import User from '../models/user';

const createUserWithToken = async (email, token) => {
  const newUser = await new User({
    emails: [email],
    token,
  }).save();
  return newUser;
};

export default createUserWithToken;
