require("dotenv").config()

const stripeSdk = require('stripe')
const stripe = stripeSdk(process.env.STRIPE_SECRET_KEY)
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Max-Age': '2592000',
    'Access-Control-Allow-Credentials': 'true',
  };

exports.handler = async (event, context) => {
  if (!event.body || event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 'invalid-method'
      })
    }
  }

  const data = JSON.parse(event.body);
  console.log('Data: ', data);
  console.log('Data strip Id: ', data.stripeToken.id);
  

  if (!data.stripeToken || !data.idempotency_key) {
    console.error('Required information is missing.')

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 'missing-information'
      })
    }
  }

  /* Do stripe payment processing */
  let charge
  try {
    charge = await stripe.charges.create({
      currency: 'usd',
      amount: 23,
      source: data.stripeToken.id,
      receipt_email: 'kiearh@hotmail.com',
      description: `charge for a widget`
    }, {
      idempotency_key: data.idempotency_key
    })
  } catch (err) {
    console.log(err)
  }
  const status = (!charge || charge.status !== 'succeeded') ? 'failed' : charge.status
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      status: status
    })
  }
}