const getLanguageFromCookies = (req) => {
  let language = 'en';
  const languageCookie = process.env.USER_LANGUAGE_COOKIE;

  if (req) {
    if (req.cookies) {
      if (req.cookies[languageCookie]) {
        language = req.cookies[languageCookie];
      }
    }
  }
  return language;
};

export default getLanguageFromCookies;
