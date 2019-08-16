import rp from 'request-promise';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_ACCESS_KEY_ID,
  secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY,
});

const useProfileImg = (imageURL, userID) => {
  const options = {
    uri: imageURL,
    encoding: null,
    resolveWithFullResponse: true,
  };
  async function load() {
    const response = await rp(options);
    const uploadResult = await s3.upload({
      ACL: 'public-read',
      Bucket: `${process.env.S3_BUCKET_NAME}/w`,
      Key: `${userID}.jpg`,
      Body: response.body,
      ContentType: response.headers['content-type'],
    }).promise();
    return uploadResult;
  }
  load();
};
export default useProfileImg;
