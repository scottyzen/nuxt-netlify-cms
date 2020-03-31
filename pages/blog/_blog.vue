<template>
  <div class="container">
    <article class="fadeUp">
      <img
        :src="blogPost.thumbnail"
        class="object-cover w-full h-48 mb-8 border-8 border-white shadow-xs"
      />
      <h1 class="text-xl text-gray-800">{{blogPost.title}}</h1>
      <p class="tracking-wide text-gray-700 whitespace-pre-line" v-html="blogPost.body">Loading</p>
    </article>
  </div>
</template>

<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
    this.$store.commit('updateScrollPossition', 0)
  },
  methods: {
    handleScroll () {
      var progress = window.scrollY / ( document.body.scrollHeight - window.innerHeight) ;
      progress = Math.round(progress * 100);
      this.$store.commit('updateScrollPossition', progress)
    }
  }
}
</script>