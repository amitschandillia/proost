/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

const Twitter = require('twitter');
const dotenv = require('dotenv');

dotenv.config();
const { split } = require('sentence-splitter');

const limit = 200;

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY_TEST,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_TEST,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY_TEST,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET_TEST,
});

const bigmessage = 'But I must explain. To you how all. This mistaken idea of denouncing pleasure and praising. Pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment.';

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
      console.log('ERR');
      throw error;
    });
  return postRes;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const postTweet = async (message) => {
  let extractedID = '';
  let tweeted = {};
  asyncForEach(message, async (item) => {
    tweeted = await tweet(item, extractedID);
    const { id } = tweeted;
    extractedID = id;
    console.log('TWEET', tweeted.tweet);
    console.log('ID', extractedID);
  });
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
  return (para);
};

postTweet(messages(bigmessage));
