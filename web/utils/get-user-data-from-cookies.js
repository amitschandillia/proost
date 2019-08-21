const getUserDataFromCookies = (req) => {
  let userData = '';
  const userDataCookie = '_UDC';

  if (req) {
    if (req.cookies) {
      if (req.cookies[userDataCookie]) {
        userData = req.cookies[userDataCookie];
      }
    }
  }
  return userData;
};

export default getUserDataFromCookies;
