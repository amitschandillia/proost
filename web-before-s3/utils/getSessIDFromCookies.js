const getSessIDFromCookies = (req) => {
  let sessID = '';

  if (req) {
    if (req.cookies) {
      if (req.cookies['_ID.HSK']) {
        sessID = req.cookies['_ID.HSK'];
        sessID = sessID.split('.')[0].split(':')[1];
      }
    }
  }
  return sessID;
};

export default getSessIDFromCookies;
