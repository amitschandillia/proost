import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendConfirmationEmail = (recipient, user) => {
  const { firstName } = user;
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
    html: `<b>This mail is haunted!</b><h2>Congrats, ${firstName}!!!</h2>`, // email body
  };
  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      transport.close(); // shut down the connection pool, no more messages
      if (error) { reject(error); } else { resolve(info); }
    });
  });
};

export default sendConfirmationEmail;
