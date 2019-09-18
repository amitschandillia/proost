/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

const Twitter = require('twitter');
const dotenv = require('dotenv');

dotenv.config();
const { split } = require('sentence-splitter');

let success = true;

const limit = 200;

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY_TEST,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_TEST,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY_TEST,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET_TEST,
});

// const bigmessage = 'Test';

const tweet = async (message, id = '0') => {
  let postRes = {};
  let status = {};
  if (id && id.length > 4) {
    status = {
      in_reply_to_status_id: id,
      status: message,
    };
  } else {
    status = {
      status: message,
    };
  }
  await client.post('statuses/update', status)
    .then((tweetResp) => {
      postRes = {
        tweet: tweetResp.text,
        id: tweetResp.id_str,
      };
    })
    .catch((error) => {
      success = false;
    });
  return postRes;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const messages = (msg) => {
  const sentences = split(msg);
  for (let i = 0; i < sentences.length; i++) {
    sentences.splice(i + 1, 1);
  }
  sentences.forEach((s, i) => { sentences[i] = s.raw; });
  const para = [];
  let fsentence = '';
  sentences.forEach((s) => {
    if ((fsentence.length + s.length + 1) <= limit) {
      fsentence = `${fsentence} ${s}`;
    } else {
      para.push(fsentence.trim());
      fsentence = s;
    }
  });
  para.push(fsentence.trim());
  para.forEach((sentence, i) => {
    para[i] = `[${i + 1}/${para.length}] ${sentence} [contd...]`;
  });
  para[0] = `#Thread\n${para[0]}`;
  para[para.length - 1] = para[para.length - 1].substr(0, para[para.length - 1].length - 11);
  if(para.length === 1) para[0] = para[0].substr(14);
  return (para);
};

const postTweet = async (msg) => {
  const message = messages(msg);
  let extractedID = '';
  let tweeted = {};
  asyncForEach(message, async (item) => {
    tweeted = await tweet(item, extractedID);
    const { id } = tweeted;
    extractedID = id;
    const results = {
      tweet: tweeted.tweet,
      id: extractedID,
      success,
    };
  });
  // console.log('TWEET COUNT', message.length);
  return success;
};

module.exports = postTweet;
