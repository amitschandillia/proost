const getUserDataFromCookies = (req) => {
  let userData = '';

  if (req) {
    if (req.cookies) {
      if (req.cookies.token) {
        userData = req.cookies.token;
      }
    }
  }
  return userData;
};

export default getUserDataFromCookies;
