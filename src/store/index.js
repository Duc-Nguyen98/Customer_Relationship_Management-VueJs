import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    verticalMenu,
  },
  strict: process.env.DEV,
})
