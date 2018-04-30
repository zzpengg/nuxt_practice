import Vue from 'vue'
import Vuex from 'vuex'
import weather from './weather'

Vue.use(Vuex)
const actions = {
  async nuxtInitServer ({commit}) {
    const __initData = [
      commit('weather/__init')
    ]
    return Promise.all(__initData)
  }
}
const store = () => {
  return new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: actions,
    modules: {
      weather
    }
  })
}

export default store
