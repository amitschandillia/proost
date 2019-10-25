import uuidv4 from 'uuid/v4';

import User from '../models/user';

const rememberMeCookie = async (username) => {
  // Create hash
  // let remember = `${username} ` + uuidv4();
  let remember = uuidv4();
  // Store hash in db doc where emails[] contains username OR username = username
  const updatedUser = await User.findOneAndUpdate(
    { $or: [{ username }, { emails: username }] },
    { remember },
    { new: true },
  );
  // Return hash
  return updatedUser ? remember : null;
};

export default rememberMeCookie;
