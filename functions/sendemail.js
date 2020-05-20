require("dotenv").config()

const sgMail = require('@sendgrid/mail')

exports.handler = function (event, context, callback) {

  sgMail.setApiKey('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')
//   let body = JSON.parse(event.body)

  let msg = {
    to: 'scottyzen@gmail.com',
    from: 'scottyzen@gmail.com',
    subject: 'Website Contact Form',
    text: 'Someone has filled out a form on your website, check out the message they left and get in touch with them :)',
    templateId: 'd-39c15b77271449548e2f13b66920f808',
    html: '<p>Hello HTML world!</p>'
  }

//   sgMail.send(msg);

  sgMail.send(msg).then(() => {
    console.log(`Contact form sent`)
    callback()
  }).catch(e => {
    console.error(e.toString())
    callback(e.toString())
  })
}