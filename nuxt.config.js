module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'taxi-nuxt-socket-client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'socket test for taxi' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  vendor: [
    'axios',
    'bluebird',
    'query-string',
    'moment',
    'cookie',
    'moment',
    'form-data',
    'vue-socket.io',
    'socket.io-client'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/font-awesome'
  ],
  env: {
    api: 'http://opendata.cwb.gov.tw/opendataapi',
    authorizationkey: 'CWB-3FE7DA7E-E528-427C-9BEF-547E7BF09F31'
  }
}
