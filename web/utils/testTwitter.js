const Twitter = require('twitter');
const dotenv = require('dotenv');
dotenv.config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


client.post('statuses/update', {status: '/'})
  .then((tweet, response) => {
    console.log(tweet); // Tweet body.
    console.log(response);  // Raw response object.
  })
  .catch((error) => {
    throw error;
  })
