<template>
  <div class="container">
    <div class="flex flex-wrap max-w-md ">
      <div class="flex flex-wrap w-full">

        <!-- NAME  -->
        <input class="w-full p-3 leading-none bg-white border-b border-gray-300 rounded shadow-sm" type="text"
          name="name" placeholder="Full Name" v-model="customerName" />

        <!-- EMAIL  -->
        <input class="w-full p-3 mt-4 leading-none bg-white border-b border-gray-300 rounded shadow-sm" type="email"
          name="email" placeholder="Email Address" v-model="customerEmail" />

        <!-- PREDEFINED AMOUNTS  -->
        <div class="flex items-center justify-between w-full mt-4 gap-">
          <div class="p-3 leading-none bg-white border-b border-gray-300 rounded shadow-sm">
            <input type="radio" id="amount-1" name="amount" value="25" v-model="amount" />
            <label for="amount-1">€25</label>
          </div>
          <div class="p-3 leading-none bg-white border-b border-gray-300 rounded shadow-sm">
            <input type="radio" id="amount-1" name="amount" value="50" v-model="amount" />
            <label for="amount-1">€50</label>
          </div>
          <div class="p-3 leading-none bg-white border-b border-gray-300 rounded shadow-sm">
            <input type="radio" id="amount-2" name="amount" value="100" v-model="amount" />
            <label for="amount-2">€100</label>
          </div>

          <div class="p-3 leading-none bg-white border-b border-gray-300 rounded shadow-sm">
            <input type="checkbox" id="amount-2" name="amount" value="100" v-model="showOther" />
            <label for="amount-2">Other</label>
          </div>
        </div>

        <!-- ANY AMOUNT  -->
        <input v-if="showOther" class="w-full p-3 mt-4 leading-none bg-white border-b border-gray-300 rounded shadow-sm"
          type="text" name="amount" placeholder="Amount" v-model="amount" />

      </div>

      <card class="w-full p-3 mt-4 bg-white border-b border-gray-300 rounded shadow-sm" id="card" :class="{ complete }"
        :options="stripeOptions" stripe="pk_test_PnccujKJJqnELQBTdWpHx5s900OzMpEh6o"
        @change="complete = $event.complete" />

      <button class="w-full p-3 mt-4 leading-none text-purple-900 bg-purple-300 border-b border-purple-500 rounded"
        @click="pay">
        {{ buttonText }} <span>€{{ amount }}</span>
      </button>
    </div>
    <div v-if="successMessage" class="flex p-3 mt-8 text-green-900 bg-green-100 border-b border-green-200 rounded">
      <img src="~/assets/happy-outline.svg" width="24" class="mr-3 text-red-700" alt="" />
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { v1 as uuidv1 } from 'uuid'
const endPoint =
  '/.netlify/functions/index'

export default {
  components: {
    Card,
  },
  data() {
    return {
      complete: false,
      showOther: false,
      customerName: '',
      customerEmail: '',
      successMessage: '',
      amount: 25,
      buttonText: `Donate`,
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
      this.buttonText = 'Processing...'
      createToken().then((data) => {
        axios
          .post(
            endPoint,
            {
              stripeEmail: this.customerEmail,
              stripeName: this.customerName,
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
              this.buttonText = 'Donate'
            }

          })
      })
    },
  },
}
</script>
