<template>
  <div>
    <div class="container sticky top-0 z-50 bg-gray-100">
      <ul class="flex py-3 my-4 text-gray-800 border-b-2 list-reset">
        <li>
          <nuxt-link class="mr-4 font-semibold" to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link class="mr-4 font-semibold" to="/blog">Blog</nuxt-link>
        </li>
      </ul>
      <div class="line" :style="{width: this.$store.state.blogPostScrollPossiton + '%'}"></div>
    </div>
    <nuxt />
  </div>
</template>

<style lang="postcss" >
html {
  @apply .bg-gray-100;
}
.line {
  transition: all 300ms ease;
  height: 2px;
  transform: translateY(-18px);
  display: block;
  background: tomato;
}
</style>


