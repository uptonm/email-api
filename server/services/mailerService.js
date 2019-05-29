const sgMail = require('@sendgrid/mail');
const confirmTemplate = require('../assets/email-templates/confirm-email');
require('dotenv').config();

module.exports = async (toEmail, fromEmail, subject, body) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: subject,
    text: body,
    html: confirmTemplate(
      'HackWITus',
      'HackWITus | Wentworth Institute of Technology | Boston, MA',
      'https://s3.amazonaws.com/hackwitus/leo-logo-banner-min.png',
      'https://hackwit.us',
      'https://google.com/',
      'https://google.com/'
    )
  };
  await sgMail.send(msg);
};
