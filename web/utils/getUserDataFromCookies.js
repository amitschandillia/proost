const getUserDataFromCookies = (req) => {
  let userData = '';

  if (req) {
    if (req.cookies) {
      if (req.cookies['_UDATA.SIG.GG']) {
        userData = req.cookies['_UDATA.SIG.GG'];
      }
    }
  }
  return userData;
};

export default getUserDataFromCookies;
