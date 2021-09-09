import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setUserInfo (state, info) {
      state.info = info
    },
    clearUserInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      const uid = await dispatch('getUid')
      if (uid) {
        const userInfo = (await firebase.database().ref(`/Users/${uid}`).once('value')).val()
        console.log(userInfo)
        commit('setUserInfo', userInfo)
      }
    }
  },
  getters: {
    userInfo: s => s.info
  }
}
