export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Z-Jobs - Join Us',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '~/assets/scss/app.scss', lang: 'scss' }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      mode: 'client',
      extensions: ['.js']
    },
    {
      src: '~/plugins/services'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        suffix: true,
        solid: true,
        regular: true
      }
    ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/fontawesome'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.PUBLIC_API_URL
  },
  fontawesome: {
    icons: {
      solid: ['faStar', 'faTrash', 'faPen', 'faPlus', 'faMinus', 'faDownload'],
      regular: ['faStar'],
    }
  },
  toast: {
    position: 'top-center',
    duration: 2000
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  loading: {
    color: '#00bfff',
    height: '5px'
  },
  loader: {
    test: /\.s[a|c]ss$/,
    loader: 'style!css!sass'
  }
}
