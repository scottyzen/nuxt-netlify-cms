<template>
  <div class="container">
    <ul>
      <li class="fadeUp" v-for="(post, index) in blogPosts" :key="post.id">
        <nuxt-link
          :to="`/blog/${post.slug}`"
          class="fadeUp animation-duration-1"
          :class="`delay-${index*100}`"
        >{{post.title}}</nuxt-link>
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
  transform: translateY(10px);
}

@keyframes appear {
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animation-duration-1 {
  animation-duration: 600ms;
}
.delay-0 {
  animation-delay: 0;
}
.delay-100 {
  animation-delay: 200ms;
}
.delay-200 {
  animation-delay: 400ms;
}
.delay-300 {
  animation-delay: 600ms;
}
.delay-400 {
  animation-delay: 800ms;
}
.delay-500 {
  animation-delay: 1000ms;
}
</style>