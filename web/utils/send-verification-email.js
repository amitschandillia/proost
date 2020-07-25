import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import verificationMessageBody from './verification-message-body';

dotenv.config();

const sendVerificationEmail = (recipient, token) => {
  const verificationURL = `${process.env.BASE_URL}/registration?t=${token}&i=${recipient}`;
  const subject = 'Your registration is almost complete!';
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
    from: `no-reply <no-reply@${process.env.THIS_DOMAIN_LONG}>`, // sender address
    to: `${recipient} <${recipient}>`, // list of receivers
    subject: subject, // Subject line
    html: verificationMessageBody(verificationURL), // email body
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      transport.close(); // shut down the connection pool, no more messages
      if (error) { reject(error); } else { resolve(info); }
    });
  });
};

export default sendVerificationEmail;
