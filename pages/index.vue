<template>
  <div class="container">
    <div class="max-w-md">
      <card
        class="p-2 mt-12 bg-white rounded shadow-xs"
        id="card"
        :class="{ complete }"
        :options="stripeOptions"
        stripe="pk_test_PnccujKJJqnELQBTdWpHx5s900OzMpEh6o"
        @change="complete = $event.complete"
      />

      <button
        class="px-4 py-2 mt-4 text-green-900 bg-green-300 border-b border-green-500 rounded"
        @click="pay"
      >Pay with credit card</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { v1 as uuidv1 } from 'uuid'
const endPoint = "https://loving-wing-0e7dc4.netlify.com/.netlify/functions/index";

export default {
  components: {
    Card
  },
  data() {
    return {
      complete: false,
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
    }
  },
  methods: {
    pay() {
      createToken().then((data) => {
        console.log('Here is the data :', data);
          axios.post(endPoint, {
            stripeEmail: 'kiearh@hotmail.com',
            amount: 2500,
            stripeToken: data.token,
            idempotency_key: uuidv1(),
          },
          {
            headers: { "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type" }
          }).then((res) => console.log('res: ',res))
      })
    },
  },
}
</script>