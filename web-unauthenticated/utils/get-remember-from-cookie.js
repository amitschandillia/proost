const getRememberFromCookie = (req) => {
  let remember;
  const rememberCookie = process.env.USER_REMEMBER_COOKIE;

  if (req) {
    if (req.cookies) {
      if (req.cookies[rememberCookie]) {
        remember = req.cookies[rememberCookie];
      }
    }
  }
  return remember;
};

export default getRememberFromCookie;
