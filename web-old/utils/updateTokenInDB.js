import User from '../models/user';

const updateTokenInDB = async (_id, token) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { token },
    {new: true}
  );
  return updatedUser;
};

export default updateTokenInDB;
