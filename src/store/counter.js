import firebase from 'firebase/app'

export default {
  state: {
    counter: 0
  },
  mutations: {
    setInfo (state, counter) {
      state.counter = counter
    },
    clearInfo (state) {
      state.counter = {}
    }
  },
  actions: {
    // отримуєсо ІД
    async getCounter ({ commit }) {
      try {
        const counter = (await firebase.database().ref('/counter').once('value')).val()
        commit('setInfo', counter)
        return counter
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    // збільшуємо ІД
    async addCounter ({ commit }) {
      try {
        const id = (await firebase.database().ref('/counter').once('value')).val()
        const counter = (await firebase.database().ref('counter').set(id + 1))
        commit('setInfo', counter)
        return counter
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    counter: s => s.counter
  }
}
