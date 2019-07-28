const getSessIDFromCookies = (req) => {
  let sessID = '';

  if (req) {
    if (req.cookies) {
      if (req.cookies['user_sid']) {
        sessID = req.cookies['user_sid'];
        sessID = sessID.split('.')[0].split(':')[1];
      }
    }
  }
  return sessID;
};

export default getSessIDFromCookies;
