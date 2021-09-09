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
        commit('setUserInfo', userInfo)
      }
    },
    async AddUserInfo ({ dispatch }, user) {
      const uid = await dispatch('getUid')
      console.log(uid)
      console.log(user)
      await firebase.database().ref(`/Users/${uid}`).set(user)
      dispatch('fetchInfo')
    }
  },
  getters: {
    userInfo: s => s.info
  }
}
