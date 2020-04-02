<template>
  <div class="container">
    <div>
      <logo />
      <small>
        Test using this credit card:
        <span class="cc-number">4242 4242 4242 4242</span>, and enter any 5
        digits for the zip code
      </small>
      <card
        class="stripe-card"
        id="card"
        :class="{ complete }"
        stripe="pk_test_5ThYi0UvX3xwoNdgxxxTxxrG"
        @change="complete = $event.complete"
      />
      <button
        class="pay-with-stripe button"
        @click="pay"
        :disabled="!complete || !stripeEmail"
      >
        Pay with credit card
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import axios from 'axios'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { v1 as uuidv1 } from 'uuid'

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
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
  methods: {
    pay() {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
      createToken().then((data) => {
        console.log(data.token)
        axios
          .post(
            'https://loving-wing-0e7dc4.netlify.com/.netlify/functions/index',
            {
              token: data.token,
              idempotency_key: uuidv1(),
            }
          )
          .then((response) => {
            console.log(response)
          })
      })
    },
  },
}
</script>

<style>
.stripe-card {
  margin-top: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px 10px;
}
</style>
