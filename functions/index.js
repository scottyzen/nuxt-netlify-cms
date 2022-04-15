require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const accountId = 'acct_1Fe1WMKAmvfmsK5Z'; // scott
// const accountId = 'acct_19LrA2ARXliUGQz1'; // rc
const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};


exports.handler = async (event, context) => {

  //-- We only care to do anything if this is our POST request.
  if(event.httpMethod !== 'POST' || !event.body) {
    return { statusCode, headers, body: ''};
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body);
  
  // -- Make sure we have all required data. Otherwise, escape.
  if( !data.stripeToken || !data.amount || !data.idempotency_key ) {
    return {
      statusCode,
      body: JSON.stringify({status: 'missing-information'})
    };
  }

  // Create Customer
  const customer = await stripe.customers.create({
    email: data.stripeEmail,
    name : data.stripeName,
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
    phone: '+15105551234',
  });

  await stripe.customers.createSource(customer.id, {
    source: data.stripeToken.id,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: 'eur',
    receipt_email: data.stripeEmail,
    description: `Donation of €${data.amount / 100}`,
    customer: customer.id,
    capture_method: 'automatic',
    confirm: true,


    application_fee_amount: 123,
    transfer_data: {
      destination: accountId,
    },
  });



  // const charge = await stripe.charges.create( {
  //   amount: data.amount,
  //   currency: 'eur',
  //   receipt_email: data.stripeEmail,
  //   description: `Donation of €${data.amount / 100}`,
  //   customer: customer.id,
  //   expand: ['balance_transaction'],
  //   metadata: {
  //     idempotency_key: data.idempotency_key,
  //   },
  // });

  const status = paymentIntent.status;

  return {
    statusCode,
    headers,
    body: JSON.stringify({status})
  };

}
