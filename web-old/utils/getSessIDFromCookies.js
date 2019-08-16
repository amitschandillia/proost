const getSessIDFromCookies = (req) => {
  let sessID = '';
  const sessionHandshakeCookie = '_ID.HSK';

  if (req) {
    if (req.cookies) {
      if (req.cookies[sessionHandshakeCookie]) {
        sessID = req.cookies[sessionHandshakeCookie];
        sessID = sessID.split('.')[0].split(':')[1];
      }
    }
  }
  return sessID;
};

export default getSessIDFromCookies;
