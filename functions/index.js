require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
  };

exports.handler = async (event, context) => {
  if (!event.body || event.httpMethod !== "POST") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "invalid http method"
      })
    }
  }

  const data = JSON.parse(event.body);

  // stripe payment processing begins here
  try {
    stripe.customers.create({
        email: data.stripeEmail,
        source: data.stripeToken
      }).then(customer => {
        return stripe.charges.create({
              currency: "usd",
              amount: data.stripeAmt,
              receipt_email: data.stripeEmail,
              customer: customer.id,
              description: "Sample Charge"
            },
            {
              idempotency_key: data.idempotency_key
            }).then(result => { console.log(`Charge created: ${result}`) })
      })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "it works! beep boop"
      })
    }
  } catch (err) {
    console.log(err)

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        reason: 'hickup',
        status: err
      })
    }
  }
}