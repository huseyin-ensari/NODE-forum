const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    service: 'Gmail',
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
