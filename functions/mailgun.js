require("dotenv").config()

exports.handler = function (event, context, callback) {


const mailgun = require("mailgun-js");
const DOMAIN = "sandbox3fe1f38680134983b035fe584981ec9d.mailgun.org";
const mg = mailgun({apiKey: process.env.MAILGUN, domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox3fe1f38680134983b035fe584981ec9d.mailgun.org>",
	to: "scottyzen@me.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};
mg.messages().send(data, function (error, body) {
    console.log(body);
    callback(null, {
        statusCode: 200,
        status: 'Successfull',
        body: JSON.stringify({body})
      });
});

}