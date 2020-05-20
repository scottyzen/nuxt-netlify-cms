require("dotenv").config()

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
const sgMail = require('@sendgrid/mail');

exports.handler = function(event, context, callback) {

    console.log('Here comes te magic');

    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'scottyzen@gmail.com',
      from: 'scottyzen@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);

    callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({msg})
      });
};