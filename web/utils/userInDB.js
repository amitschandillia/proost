// import User from '../models/user';
//
//
// const isEmailInDB = async (email) => {
//   // Check if email exists in db
//   let emailExists;
//   await User.findOne({ emails: email }).then((existingUser) => {
//     if(existingUser) { emailExists = true; } else { emailExists = false; }
//   });
//   return emailExists;
// };
// export default isEmailInDB;




import User from '../models/user';

const userInDB = async (email) => {
  const existingUser = await User.findOne({ emails: email });
  return existingUser;
};

export default userInDB;
