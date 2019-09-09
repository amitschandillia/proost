import User from '../models/user';

const updateLocalIP = async (req, ip) => {
  if(ip.length > 7) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { lastLoginIP: ip },
      { new: true },
    );
    return updatedUser;
  }
  return null;
};

export default updateLocalIP;
