<template>
  <div class="container">
    <div>
      <logo />
      <form class="my-8" method="post" @submit="send">
        <input
          class="px-4 py-2 border rounded"
          type="number"
          name="amount"
          v-model="amount"
        />
        <input
          class="px-4 py-2 ml-4 text-white bg-teal-700 rounded"
          type="submit"
          value="send"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo,
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' },
      ],
    }
  },
  methods: {
    send(e) {
      e.preventDefault()
      axios
        .post(
          'https://frosty-noether-b04678.netlify.com/.netlify/functions/index',
          {
            amount: this.amount,
          }
        )
        .then((response) => {
          console.log(response)
        })
    },
  },
}
</script>
