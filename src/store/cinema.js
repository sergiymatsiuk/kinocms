export default {
  state: {
    cinema: {}
  },
  mutations: {
    setCinemaInfo (state, cinema) {
      state.cinema = cinema
    },
    clearCinemaInfo (state) {
      state.cinema = {}
    }
  },
  actions: {
    addCinemaInfo ({ commit }, cinema) {
      commit('setCinemaInfo', cinema)
    }
  },
  getters: {
    cinemaInfo: s => s.cinema
  }
}
