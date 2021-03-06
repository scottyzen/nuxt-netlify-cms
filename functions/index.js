require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {
  console.log('Here comes te magic');

  //-- We only care to do anything if this is our POST request.
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body);
  
  // -- Make sure we have all required data. Otherwise, escape.
  if( !data.stripeToken || !data.amount || !data.idempotency_key ) {
    console.error('Required information is missing.');
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status: 'missing-information'})
    });
    return;
  }

  stripe.charges.create({
      currency: 'eur',
      amount: data.amount,
      source: data.stripeToken.id,
      receipt_email: data.stripeEmail,
      description: `charge for a widget`,
      metadata: {
        invoice_number: 345678
      }
    },
    {
      idempotencyKey: data.idempotency_key
    }, (err, charge) => {

      if(err !== null) {
        console.log(err);
      }

      let status = (charge === null || charge.status !== 'succeeded') ? 'failed' : charge.status;

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({status})
      });
    }
  );
}

