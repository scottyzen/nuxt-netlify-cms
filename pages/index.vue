<template>
  <div class="container">
    <div class="flex flex-wrap">
      <img
        class="w-full max-w-md px-12 pb-8 mx-auto"
        src="~/assets/wallet.svg"
      />
      <div class="flex flex-wrap w-full">
        <input
          class="w-full p-3 leading-none bg-white border-b border-gray-300 rounded md:mr-4 md:w-64"
          type="text"
          name="name"
          placeholder="Name"
          v-model="customerName"
        />
        <input
          class="w-full p-3 mt-4 leading-none bg-white border-b border-gray-300 rounded md:mt-0 md:flex-1"
          type="email"
          name="email"
          placeholder="Email Address"
          v-model="customerEmail"
        />
      </div>

      <card
        class="w-full p-3 mt-4 bg-white border-b border-gray-300 rounded"
        id="card"
        :class="{ complete }"
        :options="stripeOptions"
        stripe="pk_test_PnccujKJJqnELQBTdWpHx5s900OzMpEh6o"
        @change="complete = $event.complete"
      />

      <button
        class="p-3 mt-4 leading-none text-green-900 bg-green-300 border-b border-green-500 rounded"
        @click="pay"
      >
        Pay with credit card
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { v1 as uuidv1 } from 'uuid'
const endPoint =
  'https://loving-wing-0e7dc4.netlify.com/.netlify/functions/index'

export default {
  components: {
    Card,
  },
  data() {
    return {
      complete: false,
      customerName: '',
      customerEmail: '',
      amount: 50,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true,
        style: {
          base: {
            iconColor: '#69B87E',
            fontSize: '16px',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            '::placeholder': {
              color: '#AEB9C7',
            },
          },
          invalid: {
            iconColor: '#FFC7EE',
            color: '#FFC7EE',
          },
        },
      },
    }
  },
  methods: {
    pay() {
      createToken().then((data) => {
        console.log('Here is the data :', data)
        axios
          .post(
            endPoint,
            {
              stripeEmail: this.customerEmail,
              amount: Math.floor(this.amount * 100), //it expects the price in cents, as an integer
              stripeToken: data.token,
              idempotency_key: uuidv1(),
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
              },
            }
          )
          .then((res) => console.log('res: ', res))
      })
    },
  },
}
</script>
