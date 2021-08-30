/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async changeLocale ({ commit }, locale) {
      try {
        commit('setInfo', { locale })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
 
    async deleteItem ({ commit }, { title, id }) {
      try {
        await firebase.database().ref(`${title}/${id}`).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }, 

    async addInfoCinema ({ commit }, { title, locale, name, description, conditions, mainImg, bannerImg, localImgArr, halls, SEO, id }) {
      try {
        await firebase.database().ref(`/${title}/${id}`)
          .set({ locale, name, description, conditions, mainImg, bannerImg, localImgArr, halls, SEO, id })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addInfoFilm ({ commit }, { title, active, locale, date, name, description, mainImg, localImgArr, URLyoutube, SEO, id, soon, type }) {
      try {
        const info = await firebase.database().ref(`/${title}/${id}`)
          .set({ title, active, locale, date, name, description, mainImg, localImgArr, URLyoutube, SEO, id, soon, type })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

  },
  getters: {
    info: s => s.info
  }
}
