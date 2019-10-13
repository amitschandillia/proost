const getUserTokenFromCookies = (req) => {
  let userToken = '';
  const userTokenCookie = process.env.USER_DATA_COOKIE;

  if (req) {
    if (req.cookies) {
      if (req.cookies[userTokenCookie]) {
        userToken = req.cookies[userTokenCookie];
      }
    }
  }
  return userToken;
};

export default getUserTokenFromCookies;
