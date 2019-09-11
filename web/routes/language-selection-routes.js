import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const {selectedLanguage} = req.body;
  const dictionary = require(`../dictionaries/${selectedLanguage}`);
  res.json({
    languageCode: selectedLanguage.toUpperCase(),
    languageName: dictionary.languageName,
    flag: dictionary.flag,
  });
});

module.exports = router;
