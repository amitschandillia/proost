import User from '../models/user';

export const tokenInDB = async (token, email) => {
  const existingUser = await User.findOne({ token, emails: email, password: { $exists: false } });
  return existingUser;
};

export const createAccount = async (fname, lname, uname, pass, existingUser) => {
  const fieldsToUpdate = {};
  if (fname) { fieldsToUpdate.firstName = fname; }
  if (lname) { fieldsToUpdate.lastName = lname; }
  if (uname) { fieldsToUpdate.username = uname; }
  if (pass) { fieldsToUpdate.password = pass; }
  const updatedUser = await User.findOneAndUpdate(
    { _id: existingUser._id },
    { ...fieldsToUpdate, $unset: { token: 1 } },
    { new: true },
  );
  return updatedUser;
};
