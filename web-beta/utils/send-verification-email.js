import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendVerificationEmail = (recipient, token) => {
  const verificationURL = `https://www.schandillia.com/registration?t=${token}&i=${recipient}`;
  const transport = nodemailer.createTransport({
    service: 'ses',
    host: process.env.SES_HOST, // Amazon email SMTP hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
      user: process.env.SES_USERNAME, // Use from Amazon Credentials
      pass: process.env.SES_PASSWORD, // Use from Amazon Credentials
    },
  });
  const mailOptions = {
    from: 'no-reply <no-reply@schandillia.com>', // sender address
    to: `Amit Schandillia <${recipient}>`, // list of receivers
    subject: 'Brand new email', // Subject line
    html: `<b>This mail is haunted!</b><p><a href="${verificationURL}">${verificationURL}</a></p>`, // email body
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      transport.close(); // shut down the connection pool, no more messages
      if (error) { reject(error); } else { resolve(info); }
    });
  });
};

export default sendVerificationEmail;
