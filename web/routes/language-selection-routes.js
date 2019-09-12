import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const {selectedLanguage} = req.body;
  const dictionary = require(`../dictionaries/${selectedLanguage}`);
  res.cookie(process.env.USER_LANGUAGE_COOKIE, selectedLanguage);
  res.json({
    languageCode: selectedLanguage.toUpperCase(),
    // languageName: dictionary.languageName,
    // flag: dictionary.flag,
    ...dictionary,
  });
});

module.exports = router;
