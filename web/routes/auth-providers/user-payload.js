const userPayload = req => ({
  userID: req.user._id,
  username: req.user.username,
  hasPicture: req.user.hasPicture,
  emails: req.user.emails,
  googleID: req.user.googleID,
  twitterID: req.user.twitterID,
  firstName: req.user.firstName,
  lastName: req.user.lastName,
});
export default userPayload;
