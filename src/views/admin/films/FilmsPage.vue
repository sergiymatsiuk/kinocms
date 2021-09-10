<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <form class="form-horizontal"  v-else>
      <div class="card-body">
        <div class="form-group d-flex flex-row-reverse">
          <div>
            <button
              type="submit"
              name="ukr"
              class="btn btn-lang"
              @click.prevent="changeLang(true)"
              :class="{ 'btn-info' : lang==='UA' }"
            >Українська</button>
            <button type="submit" name="ru" class="btn" @click.prevent="changeLang(false)" :class="{ 'btn-info' : lang==='RU' }">Русский</button>
          </div>
          <div class="custom-control custom-switch d-flex align-items-center">
            <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="page.active">
            <label class="custom-control-label" for="customSwitch1">ВКЛ</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-6 row">
            <label for="inputEmail3" class="col-4 col-form-label"><h6>{{ 'NameFilms' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="Название акции"
                v-model="page.name"
              />
            </div>
          </div>
          <div class="form-group col-6 row">
            <label class="col-4 col-form-label"><h6>{{'Date' | localize}}</h6></label>
            <div class="input-group date col-8">
                <input type="date" class="form-control datetimepicker-input" v-model="page.date"/>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label"><h6>{{'Description' | localize}}</h6></label>
          <div class="col-sm-10">
            <textarea
              type="text"
              class="form-control"
              id="inputPassword3"
              placeholder="Текст"
              v-model="page.description"
            />
          </div>
        </div>
        <div class="form-group row">
            <div class="col-3">
                <h6>{{'MainImg' | localize}}</h6>
            </div>
            <div class="col-6 row">
              <div class=" d-flex ">
                <button class="btn-select" @click.prevent="selectLocalImg">
                <div v-if="localMainImg.length > 1">
                  <img class="preview" height="100" width=200 :src="localMainImg" />
                </div>
                <div v-else style="height: 100px; width: 200px">
                  <img src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
                    style="height: 100px; width: 200px">
                </div>
                </button>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="saveLocalImg"
                  accept="image/*"
                  required
                />
                <button class="btn-lg btn-info align-self-center" @click.prevent="deleteLocalImg">{{'Delete' | localize}}</button>
              </div>
            </div>
        </div>
        <div class="form-group column">
          <div class="">
              <h6>{{'OtherImg' | localize}}</h6>
          </div>
          <div class="row justify-content-between">
            <div class="col-2 pt-1">
              <h6>{{'Size' | localize}}</h6>
            </div>
            <CardShowImg
              v-for="(imgLocal, idx) in localImg"
              :key="idx"
              :card="imgLocal"
              @change-local-img-card="changeLocalImg"
              @delete-local-img-card="changeLocalImg"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputURLyoutube" class="col-sm-3 col-form-label"><h6>{{'LinkYoutube' | localize}}</h6></label>
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              id="inputURLyoutube"
              placeholder="Ссылка на видео в youtube"
              v-model="page.URLyoutube"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
            <h6>{{'TypeFilms' | localize}}</h6>
          </div>
          <div class="col-sm-10">
            <div class="form-group row">
              <div class="form-check pr-5">
                <input class="form-check-input" type="checkbox" name="3d" value="3d" v-model="page.type.d3">
                <label class="form-check-label">3D</label>
              </div>
              <div class="form-check pr-5">
                <input class="form-check-input" type="checkbox" name="2d" value="2d" v-model="page.type.d2">
                <label class="form-check-label">2D</label>
              </div>
              <div class="form-check pr-5">
                <input class="form-check-input" type="checkbox" name="imax" value="imax" v-model="page.type.imax">
                <label class="form-check-label">IMAX</label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
            <h6>{{'SoonFilms' | localize}}</h6>
          </div>
          <div class="form-check pr-5">
            <input class="form-check-input" type="checkbox" name="soon" v-model="page.soon">
            <label class="form-check-label">Да</label>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
            <h6>{{'SEO' | localize}}</h6>
          </div>
          <div class="form-group row col-sm-10">

            <label for="inputURL" class="col-sm-2 col-form-label"
              >{{'SeoURL' | localize}}</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputURL"
                placeholder="URL"
                v-model="page.SEO.SEOurl"
              />
            </div>

            <label for="inpuTitle" class="col-sm-2 col-form-label"
              >{{'SeoTitle' | localize}}</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputTitle"
                placeholder="Title"
                v-model="page.SEO.SEOtitle"
              />
            </div>

            <label for="inpuKeywords" class="col-sm-2 col-form-label"
              >{{'SeoKeywords' | localize}}</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputKeywords"
                placeholder="Word"
                v-model="page.SEO.SEOkeywords"
              />
            </div>

            <label for="inpuDescription" class="col-sm-2 col-form-label"
              >{{'SeoDescription' | localize}}</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                id="inputDescription"
                placeholder="Description"
                v-model="page.SEO.SEOdescription"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addFilm">{{'Save' | localize}}</button>
        <button type="submit" class="btn btn-default col-sm-6" @click.prevent="deleteAll">
          {{'DeleteForm' | localize}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase/app'
import CardShowImg from '@/components/CardShowImg'
import Loader from '@/components/Loader'

export default {
  components: {
    CardShowImg, Loader
  },
  data () {
    return {
      page: {
        locale: true,
        active: true,
        date: '',
        name: '',
        description: '',
        mainImg: '',
        localImgArr: [],
        URLyoutube: '',
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        },
        type: {
          d3: false,
          d2: false,
          imax: false
        },
        soon: false
      },
      ru: {
        locale: false,
        active: true,
        date: '',
        name: '',
        description: '',
        mainImg: '',
        localImgArr: [],
        URLyoutube: '',
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        },
        type: {
          d3: false,
          d2: false,
          imax: false
        },
        soon: false
      },
      ua: {
        locale: true,
        active: true,
        date: '',
        name: '',
        description: '',
        mainImg: '',
        localImgArr: [],
        URLyoutube: '',
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        },
        type: {
          d3: false,
          d2: false,
          imax: false
        },
        soon: false
      },

      lang: 'UA',
      loading: true,
      id: 0,
      locale: true,

      mainImageData: null,
      localMainImg: '',
      localImg: [
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 0},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 1},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 2},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 3},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 4}
      ]
    }
  },
  methods: {
    // зміна мови
    changeLang (key) {
      this.locale = key
      this.$store.dispatch('changeLocale', this.locale ? 'ukr-UKR' : 'rus-RUS')
      if (key) {
        this.page = this.ua
        this.lang = 'UA'
        this.localMainImg = this.ua.mainImg
        if (this.ua.localImgArr !== undefined && this.ua.localImgArr.length !== 0) {
          this.clearLocalImg()
          for (let i = 0; i < this.ua.localImgArr.length; i++) {
            this.localImg[i].img = this.ua.localImgArr[i]
          }
        } else {
          this.clearLocalImg()
        }
      } else {
        this.page = this.ru
        this.lang = 'RU'
        this.localMainImg = this.ru.mainImg
        if (this.ru.localImgArr !== undefined && this.ru.localImgArr.length !== 0) {
          this.clearLocalImg()
          for (let i = 0; i < this.ru.localImgArr.length; i++) {
            this.localImg[i].img = this.ru.localImgArr[i]
          }
        } else {
          this.clearLocalImg()
        }
      }
    },
    // основне фото
    selectLocalImg() {
      this.$refs.input1.click()
    },
    saveLocalImg(event) {
      this.mainImg=null;
      this.mainImageData = event.target.files[0];
      this.localMainImg = window.URL.createObjectURL(event.target.files[0]);
    },
    deleteLocalImg() {
      this.mainImageData = null,
      this.localMainImg = ''
      this.page.mainImg = ''
    },

    // додаткові фото
    changeLocalImg(card) {
      this.localImg[card.id] = card
    },
    clearLocalImg() {
      for (let i=0; i<this.localImg.length; i++){
        this.localImg[i].img = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
      }
    },

    async addInfoFilm (item, lang, id) {
      try {
        await firebase.database().ref(`/Films/${id}/${lang}`).set(item)
        await firebase.database().ref(`/Films/${id}/lang`).set(lang)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async addImg (title, lang, img, id, name) {
      try {
        return await firebase.storage().ref(`${title}/${id}/${lang}/${name}`).put(img).then(
          async (snapshot) => {
            return await snapshot.ref.getDownloadURL();
          }
        )
      } catch (e) {
        commit('setError', e)
        throw e
      }
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

    async check (id, counter) {
      if (id != counter) {
        const loadFilms = await this.$store.dispatch('fetchInfoById', {
          title: 'Films',
          id: this.id
        })

        if (loadFilms.lang === 'UA') {
          this.$store.dispatch('changeLocale', 'ukr-UKR')
          this.page = loadFilms.UA
          this.ua = loadFilms.UA
          this.localMainImg = loadFilms.UA.mainImg
          if ( loadFilms.UA.localImgArr !== undefined ) {
            for (let i = 0; i < loadFilms.UA.localImgArr.length; i++) {
              this.localImg[i].img = loadFilms.UA.localImgArr[i]
            }
          }
          if ( loadFilms.RU ) {
            this.ru = loadFilms.RU
          }
        }

        if (loadFilms.lang === 'RU') {
          this.$store.dispatch('changeLocale', 'rus-RUS')
          this.lang = 'RU'
          this.page = loadFilms.RU
          this.ru = loadFilms.RU
          this.localMainImg = loadFilms.RU.mainImg
          if ( loadFilms.RU.localImgArr !== undefined ) {
            for (let i = 0; i < loadFilms.RU.localImgArr.length; i++) {
              this.localImg[i].img = loadFilms.RU.localImgArr[i]
            }
          }
          if ( loadFilms.UA ) {
            this.ua = loadFilms.UA
          }
        }
      }
    },

    async addFilm () {
      try {
        this.loading = true

        if (this.mainImageData) {
          this.page.mainImg = await this.addImg( 'Films', this.lang, this.mainImageData, this.id, 'main')
        }

        this.page.localImgArr = await this.addOtherImg( 'Films', this.lang, this.localImg, this.id )

        await this.addInfoFilm (this.page, this.lang, this.id)

        await this.$store.dispatch('addCounter')

        this.loading = false

        this.$router.push({path: '/admin/films'})
      } catch (e) {}
    }, 
  },
  async mounted () {
    this.id  = this.$route.params.id
    const counter = await this.$store.dispatch('getCounter')

    await this.check(this.id, counter)

    this.loading = false
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
  }
	.btn-select {
		border: 0;
		padding: 0;
    margin-right: 50px;
	}
  .item {
    width: 150px;
  }

  .btn-lang {
    margin-right: 10px;
    margin-left: 50px;
  }
</style>
