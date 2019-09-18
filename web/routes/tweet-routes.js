import express from 'express';
import dotenv from 'dotenv';
import postTweet from '../utils/testTwitter';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const {message, password} = req.body;
  if(password === process.env.TWEET_PASSWORD) {
    const tweetStatus = await postTweet(message);
    res.json({success: tweetStatus});
  } else {
    res.json({success: false});
  }
});

module.exports = router;
