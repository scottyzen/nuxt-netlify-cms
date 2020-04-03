<template>
  <div class="container">
    <div>
      <logo />

      <card
        class="max-w-lg p-2 mt-12 bg-white rounded shadow-xs"
        id="card"
        :class="{ complete }"
        :options="stripeOptions"
        stripe="pk_test_5ThYi0UvX3xwoNdgxxxTxxrG"
        @change="complete = $event.complete"
      />
      <button
        class="px-4 py-2 mt-4 text-red-900 bg-red-200 rounded"
        @click="pay"
      >Pay with credit card</button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { v1 as uuidv1 } from 'uuid'
const endPoint = "https://loving-wing-0e7dc4.netlify.com/.netlify/functions/index";
export default {
  components: {
    Logo,
    Card,
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
            email: 'kiearh@hotmail.com',
            amount: 2500,
            token: data.token, //testing token, later we would use payload.data.token
            idempotency_key: uuidv1(), //we use this library to create a unique id
          },
          {
            headers: { "Content-Type": "application/json" }
          }).then((res) => console.log('res: ',res))
      })
    },
  },
}
</script>