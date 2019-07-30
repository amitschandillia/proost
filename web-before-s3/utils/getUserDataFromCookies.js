const getUserDataFromCookies = (req) => {
  let userData = '';

  if (req) {
    if (req.cookies) {
      if (req.cookies['_UDATA.BB']) {
        userData = req.cookies['_UDATA.BB'];
      }
    }
  }
  return userData;
};

export default getUserDataFromCookies;
