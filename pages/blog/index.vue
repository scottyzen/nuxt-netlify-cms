<template>
  <div class="container">
    <ul class="fadeUp">
      <li
        class="p-4 mb-4 leading-none bg-white border-b border-gray-300 rounded shadow-sm fadeUp animation-duration-1"
        v-for="(post, index) in blogPosts"
        :key="post.id"
        :style="{'animation-delay': `${index*100}ms`}"
      >
        <nuxt-link :to="`/blog/${post.slug}`">
          <div class="text-lg text-gray-800">{{post.title}}</div>
          <span class="text-xs text-gray-700">{{post.date}}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  }
}
</script>

<style>
.fadeUp {
  animation: 1s appear forwards;
  opacity: 0;
  transform: translateY(5px);
}

@keyframes appear {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animation-duration-1 {
  animation-duration: 500ms;
}
</style>