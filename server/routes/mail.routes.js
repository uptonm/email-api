const express = require('express');
const mailer = require('../services/mailerService');
const router = express.Router();

router.post('/mail', async (req, res) => {
  mailer(
    'uptonm@wit.edu',
    'uptonm@wit.edu',
    'Test Email',
    'This is the body of the email'
  );
  res.send('Email Sent');
});

module.exports = router;
