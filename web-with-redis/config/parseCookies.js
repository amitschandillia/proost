import cookies from 'browser-cookies';

const parseCookies = (isBrowser, res, req) => {
  let userData = {};

  if (isBrowser) {
    console.log('ON CLIENT');
    userData = cookies.get('token');
  } else if (req) {
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
