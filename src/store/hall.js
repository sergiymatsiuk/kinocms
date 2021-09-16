export default {
  state: {
    hall: {}
  },
  mutations: {
    setHallInfo (state, hall) {
      state.hall = hall
    },
    clearHallInfo (state) {
      state.hall = {}
    }
  },
  actions: {
    addHallInfo ({ commit }, hall) {
      commit('setHallInfo', hall)
    }
  },
  getters: {
    hallInfo: s => s.hall
  }
}
