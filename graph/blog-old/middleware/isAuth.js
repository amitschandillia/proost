import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  let decodedToken;
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  try {
    decodedToken = jwt.verify(token, process.env.GRAPH_BLOG_JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  // req._id = decodedToken._id;
  req.userData = { ...decodedToken };
  return next();
};
