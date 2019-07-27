const parseCookies = (req) => {
  let userData = '';

  if(req){
    if (req.cookies) {
      if (req.cookies.token) {
        console.log('ON SERVER');
        userData = req.cookies.token;
      }
    }
  }
  return userData;
};

export default parseCookies;
