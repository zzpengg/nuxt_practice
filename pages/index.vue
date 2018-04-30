<template>
  <div>
    <b-row>
      <b-col col="4"></b-col>
      <b-col col="4">{{ weather.title }}</b-col>
      <b-col col="4">更新時間{{ weather.updatedAt }} 語系 {{ weather.lang }}</b-col>
    </b-row>
    <p>{{ weathers }}</p>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'

export default {
  components: {
    AppLogo
  },
  async fetch ({ env, store, req, query }) {
    // 處理 server side 與 client side cookies 問題
    // let cookies = {}
    // if (process.server) {
    //   cookies = cookie.parse(req.headers.cookie)
    // }
    // if (process.client) {
    //   cookies = cookie.parse(document.cookie)
    // }

    await store.dispatch('weather/getWeathers');

    return Promise.resolve()
  },
  computed: {
    weathers: function() {
      return this.$store.state.weather.list
    },
    weather: function() {
      return this.$store.state.weather.info
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
