require("dotenv").config()

const stripeSdk = require('stripe')
const stripe = stripeSdk(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  if (!event.body || event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        status: 'invalid-method'
      })
    }
  }

  const data = JSON.parse(event.body)

  if ( !data.amount ) {
    console.error('Required information is missing.')

    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
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
      amount: 10,
      source: '123456789',
      receipt_email: 'kiearh@hotmail.com',
      description: `charge for a widget`
    }, {
      idempotency_key: 'zWCAjw2rUMO7gnLq'
    })
  } catch (err) {
    console.log(err)
  }
  const status = (!charge || charge.status !== 'succeeded') ? 'failed' : charge.status
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    body: JSON.stringify({
      status: status
    })
  }
}