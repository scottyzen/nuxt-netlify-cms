<template>
  <div class="container">
    <div class="flex flex-wrap">
      <img
        class="w-full max-w-md px-8 mx-auto mb-4"
        src="~/assets/wallet_gray.svg"
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
        class="w-full p-3 mt-4 leading-none text-purple-900 bg-purple-300 border-b border-purple-500 rounded"
        @click="pay"
      >
        Pay with credit card
      </button>
    </div>
    <div
      v-if="successMessage"
      class="flex p-3 mt-8 text-green-900 bg-green-100 border-b border-green-200 rounded"
    >
      <img
        src="~/assets/happy-outline.svg"
        width="24"
        class="mr-3 text-red-700"
        alt=""
      />
      {{ successMessage }}
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
      successMessage: '',
      amount: 50,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true,
        style: {
          base: {
            fontSize: '16px',
            fontFamily:
              'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            '::placeholder': {
              color: '#AEB9C7',
            },
          },
        },
      },
    }
  },
  methods: {
    pay() {
      createToken().then((data) => {
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
              },
            }
          )
          .then((res) => {
            console.log(res)

            if (res.data.status === 'succeeded') {
              this.successMessage = `Your order was successful.`
            }
          })
      })
    },
  },
}
</script>
