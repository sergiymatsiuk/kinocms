/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  actions: {
    async fetchInfo ({ commit }, title) {
      try {
        const info = (await firebase.database().ref(`/${title}`).once('value')).val() || {}
        return Object.keys(info).map(key => ({ ...info[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addImg ({ commit, dispatch }, {title, img, id, name}) {
      try {
        return await firebase.storage().ref(`${title}/${id}/${name}`).put(img).then(
          async (snapshot) => {
            return await snapshot.ref.getDownloadURL();
          }
        )
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addOtherImg ({ commit, dispatch }, {title, imgs, id}) {
      try {
        const temImg = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
        let localImgArr = []
        for (let i = 0; i < imgs.length; i++) {
          if (imgs[i].img != temImg) {
            if ( !imgs[i].imgData) {
              localImgArr.push(imgs[i].img) 
            } else {
              const link = await firebase.storage().ref(`${title}/${id}/other/${i}`).put(imgs[i].imgData).then(
                async (snapshot) => {
                  let linkItem =  await snapshot.ref.getDownloadURL();
                  console.log(linkItem)
                  localImgArr.push(linkItem)
                }
              )
            }
          }
        }
        console.log(title, imgs)
        return localImgArr
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addInfo ({ commit }, { title, active, locale, date, name, description, mainImg, localImgArr, URLyoutube, SEO, id }) {
      try {
        const info = await firebase.database().ref(`/${title}/${id}`)
          .set({ title, active, locale, date, name, description, mainImg, localImgArr, URLyoutube, SEO, id })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    
    async fetchInfoById ({ commit, dispatch }, {title, id}) {
      try {
        const info = (await firebase.database().ref(`/${title}`).child(id).once('value')).val() || {}
        const newInfo = { ...info, id}
        commit('setInfo', newInfo)
        return newInfo
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  }
}