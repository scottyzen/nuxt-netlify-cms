<template>
  <div class="container">
    <div class="flex w-full">
      <div
        class="flex items-stretch w-1/2 mb-4 leading-none bg-center bg-cover border-b border-gray-300 rounded shadow-sm featured-post blog-items fadeUp animation-duration-1"
        :style="{ 'background-image': `url('${blogPosts[0].thumbnail}')` }"
      >
        <nuxt-link :to="`/blog/${blogPosts[0].slug}`" class="block w-full p-4">
          <h2 class="text-lg text-white">{{ blogPosts[0].title }}</h2>
          <span class="text-xs text-gray-100">{{ blogPosts[0].date }}</span>
        </nuxt-link>
      </div>
      <ul class="w-1/2 pl-8 fadeUp">
        <li
          class="mb-4 leading-none border-b border-gray-300 rounded shadow-sm fadeUp animation-duration-1"
          v-for="(post, index) in blogPosts.slice(1)"
          :key="post.id"
          :style="{ 'animation-delay': `${(index + 1) * 200}ms` }"
        >
          <nuxt-link :to="`/blog/${post.slug}`" class="block p-4 bg-white">
            <h2 class="text-lg text-gray-800">{{ post.title }}</h2>
            <span class="text-xs text-gray-700">{{ post.date }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    },
  },
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
  animation-duration: 400ms;
}
.featured-post {
  background-color: #98ce9a;
  background-blend-mode: multiply;
  animation-duration: 0;
}
</style>
