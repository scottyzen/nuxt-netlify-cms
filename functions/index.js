require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function(event, context, callback) {

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

  //-- Make sure we have all required data. Otherwise, escape.
  if( !data.token || !data.amount || !data.idempotency_key ) {
    console.error('Required information is missing.');
    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status: 'missing-information'})
    });
    return;
  }

  stripe.charges.create({
      currency: 'usd',
      amount: data.amount,
      source: data.token.id,
      receipt_email: data.email,
      description: `charge for a widget`
    },
    {
      idempotency_key: data.idempotency_key
    }, (err, charge) => {

      if(err !== null) {
        console.log(err);
      }

      let status = (charge === null || charge.status !== 'succeeded')
        ? 'failed'
        : charge.status;

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({status})
      });
    }
  );
}




// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Content-Type"
//   };

// exports.handler = async (event, context) => {
//   if (!event.body || event.httpMethod !== "POST") {
//     return {
//       statusCode: 400,
//       headers,
//       body: JSON.stringify({
//         status: "invalid http method"
//       })
//     }
//   }

//   const data = JSON.parse(event.body);

//   // stripe payment processing begins here
//   stripe.customers.create({
//         email: data.stripeEmail,
//         source: data.stripeToken.id
//       }).then(customer => {
//         return stripe.charges.create({
//           currency: "usd",
//           amount: data.stripeAmt,
//           receipt_email: data.stripeEmail,
//           customer: customer.id,
//           description: "Sample Charge"
//         },
//         {
//           idempotency_key: data.idempotency_key
//         }).then(result => { console.log(`Charge created: ${result}`) })
//       })

//     return {
//       statusCode: 200,
//       headers,
//       body: JSON.stringify({
//         status: "it works! beep boop"
//       })
//     }
  
// }
