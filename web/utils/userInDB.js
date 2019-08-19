import User from '../models/user';

const userInDB = async (email) => {
  const existingUser = await User.findOne({ emails: email });
  return existingUser;
};

export default userInDB;
