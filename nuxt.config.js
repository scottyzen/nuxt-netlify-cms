
export default {
  mode: 'universal',
  // Headers of the page
  head: {
    title: process.env.npm_package_name || '',
    script: [
      { src: 'https://js.stripe.com/v3/' },
      { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  // Nuxt.js modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

}
