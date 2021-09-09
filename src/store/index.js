import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import counter from './counter'
import main from './main'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  actions: {
  },
  modules: {
    action, counter, main, auth, info
  }
})
