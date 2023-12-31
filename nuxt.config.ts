// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  typescript: {
    shim: false,
  },
  nitro: {
    preset: 'netlify',
  },

  modules: [
    ['@nuxtjs/tailwindcss', {
      viewer: false,
    }],
  ],
})
