/* eslint-disable */
import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, user}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        console.log(uid)
        await firebase.database().ref(`Users/${uid}`).set(user)
      } catch (e) {
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout ({commit}) {
      await firebase.auth().signOut()
      commit('clearUserInfo')
      alert('Вийшли!')
    }
  }
}
