<template>
  <div class="container">
    <article class="fadeUp">
      <img :src="blogPost.thumbnail" class="h-48 mb-8" />
      <h1 class="text-xl text-gray-800">{{blogPost.title}}</h1>
      <p class="tracking-wide text-gray-700 ">{{blogPost.body}}</p>
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
  }
}
</script>
