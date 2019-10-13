import uuidv4 from 'uuid/v4';

import User from '../models/user';

const newRemember = uuidv4();

const getUserinfoFromRemember = async (remember) => {
  const updatedUser = await User.findOneAndUpdate(
    { remember },
    { remember: newRemember },
    { new: true },
  );
  return updatedUser;
};

export default getUserinfoFromRemember;
