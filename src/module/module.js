/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  // Counter
  async getCounter () {
    try {
      const counter = (await firebase.database().ref('/counter').once('value')).val()
      return counter
    } catch (e) {
      console.log(e)
    }
  },
  async addCounter () {
    try {
      const id = (await firebase.database().ref('/counter').once('value')).val()
      const counter = (await firebase.database().ref('counter').set(id + 1))
      return counter
    } catch (e) {}
  },

  // IMG
  async addImg (title, lang, img, id, name) {
    try {
      return await firebase.storage().ref(`${title}/${id}/${lang}/${name}`).put(img).then(
        async (snapshot) => {
          return await snapshot.ref.getDownloadURL()
        }
      )
    } catch (e) { }
  },
  async addOtherImg (title, lang, imgs, id) {
    try {
      const temImg = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
      let localImgArr = []
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].img != temImg) {
          if ( !imgs[i].imgData) {
            localImgArr.push(imgs[i].img) 
          } else {
            const link = await firebase.storage().ref(`${title}/${id}/${lang}/other/${i}`).put(imgs[i].imgData).then(
              async (snapshot) => {
                let linkItem =  await snapshot.ref.getDownloadURL();
                localImgArr.push(linkItem)
              }
            )
          }
        }
      }
      return localImgArr
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },

    // BANNER
  async fetchInfoBanner (title, banner) {
    try {
      const info = (await firebase.database().ref(`/${title}/${banner}`).once('value')).val() || {}
      return Object.keys(info).map(key => ({ ...info[key], id: key }))
    } catch (e) {}
  },
  async deleteItemBanner (title, banner, id) {
    try {
      await firebase.database().ref(`${title}/${banner}/${id}`).remove()
    } catch (e) {}
  },
  async addBannerImg (title, banner, img, id, name) {
    try {
      return await firebase.storage().ref(`${title}/${banner}/${id}/${name}`).put(img).then(
        async (snapshot) => {
          return await snapshot.ref.getDownloadURL()
        }
      )
    } catch (e) { }
  },
  async addBanner (title, banner, id, item) {
    try {
      await firebase.database().ref(`/${title}/${banner}/${id}`).set(item)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async addBannerSpeed (title, banner, speed) {
    try {
      await firebase.database().ref(`/${title}/${banner}`).set(speed)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchInfoBannerSpeed (title, banner) {
    try {
      return (await firebase.database().ref(`/${title}`).child(`${banner}`).get()).val()
    } catch (e) {}
  },
  
    // CINEMA
  async addHallById (title, item, lang, id, cinemaId) {
    try {
      await firebase.database().ref(`/${title}/${cinemaId}/${id}/${lang}`).set(item)
      await firebase.database().ref(`/${title}/${cinemaId}/${id}/lang`).set(lang)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async fetchCinemaHallsById (title, id) {
    try {
      return (await firebase.database().ref(`/${title}`).child(id).once('value')).val() || {}
    } catch (e) {
      console.log(e)
    }
  },
  async deleteHall (title, cinemaId, id) {
    try {
      await firebase.database().ref(`${title}/${cinemaId}/${id}`).remove()
    } catch (e) {}
  },
  async fetchCinemaHallById (title, cinemaId, id) {
    try {
      return (await firebase.database().ref(`/${title}/${cinemaId}`).child(id).once('value')).val() || {}
    } catch (e) {
      console.log(e)
    }
  },
    // HALLS
  async fetchInfoHallsById (title, id, cinemaId) {
    try {
      const info = (await firebase.database().ref(`/${title}/${cinemaId}`).child(id).once('value')).val() || {}
      const newInfo = { ...info, id }
      return newInfo
    } catch (e) {
      console.log(e)
    }
  },
  async fetchHallsById (title, id) {
    try {
      const info = (await firebase.database().ref(`/${title}`).child(id).once('value')).val() || {}
      return Object.keys(info).map(key => ({ ...info[key], id: key }))
    } catch (e) {
      console.log(e)
    }
  },

    // MAILING
  async addMailing (title, id, type, item) {
    try {
      await firebase.database().ref(`/${title}/${id}/${type}`).set(item)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async addFile (title, id, item) {
    try {
      return await firebase.storage().ref(`${title}/${id}`).put(item).then(
        async (snapshot) => {
          return await snapshot.ref.getDownloadURL()
        }
      )
    } catch (e) { }
  },

  async fetchInfo (title) {
    try {
      const info = (await firebase.database().ref(`/${title}`).once('value')).val() || {}
      return Object.keys(info).map(key => ({ ...info[key], id: key }))
    } catch (e) {}
  },
  async fetchInfoById (title, id) {
    try {
      const info = (await firebase.database().ref(`/${title}`).child(id).once('value')).val() || {}
      const newInfo = { ...info, id }
      return newInfo
    } catch (e) {
      console.log(e)
    }
  },

  async deleteItem (title, id) {
    try {
      await firebase.database().ref(`${title}/${id}`).remove()
    } catch (e) {}
  }, 
  async addInfoById (title, item, lang, id) {
    try {
      await firebase.database().ref(`/${title}/${id}/${lang}`).set(item)
      await firebase.database().ref(`/${title}/${id}/lang`).set(lang)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async addPageById (title, item, lang, id) {
    try {
      await firebase.database().ref(`/${title}/${id}/${lang}/SEO`).set(item)
      await firebase.database().ref(`/${title}/${id}/lang`).set(lang)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  },
  async addPageCinemaById (title, item, lang, id) {
    try {
      for (let i = 0; i < item.length; i++) {
        await firebase.storage().ref(`${title}/${id}/${lang}/Cinemas/${item[i].id}`).put(item[i].imgData).then(
          async (snapshot) => {
            item[i].logo = await snapshot.ref.getDownloadURL()
          }
        )
        await firebase.database().ref(`/${title}/${id}/${lang}/Cinemas/${item[i].id}`).set(item[i])
      }
    } catch (e) {}
  },
  async addInfoByIdUsers (title, item, id) {
    try {
      await firebase.database().ref(`/${title}/${id}`).set(item)
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }
}
