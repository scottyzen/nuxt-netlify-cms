require("dotenv").config()

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
exports.handler = function(event, context, callback) {
    const sgMail = require('@sendgrid/mail');

    console.log('Here comes te magic');

    
    sgMail.setApiKey('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');
    const msg = {
      to: 'scottyzen@gmail.com',
      from: 'scottyzen@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);

    callback(null, {
        statusCode: 200,
        body: "Hello, World!"
      });
};