const getSessIDFromCookies = (req) => {
  let sessID = '';
  const sessionHandshakeCookie = process.env.SESSION_COOKIE;

  if (req) {
    if (req.cookies) {
      if (req.cookies[sessionHandshakeCookie]) {
        sessID = req.cookies[sessionHandshakeCookie];
        [sessID] = sessID.split('.');
        [, sessID] = sessID.split(':');
      }
    }
  }
  return sessID;
};

export default getSessIDFromCookies;
