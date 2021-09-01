<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <form class="form-horizontal border border-secondary m-3" v-else>
      <div class="card-body">
        <div class="form-group d-flex flex-row-reverse">
          <button
            type="submit"
            name="ukr"
            class="btn btn-lang"
            @click.prevent="changeLang(true)"
            :class="{ 'btn-info' : lang==='UA' }"
          >Українська</button>
          <button type="submit" name="ru" class="btn" @click.prevent="changeLang(false)" :class="{ 'btn-info' : lang==='RU' }">Русский</button>
        </div>
        <div class="form-group row">
            <label for="inputEmail3" class="col-2 col-form-label"><h6>{{ 'NameAction' | localize }}</h6></label>
            <div class="col-10">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="Название акции"
                v-model="page.name"
              />
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
                <h6>{{'LogoImg' | localize}}</h6>
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
        <div class="form-group row">
          <div class="col-3">
              <h6>{{'BannerImg' | localize}}</h6>
          </div>
          <div class="col-6 row">
            <div class=" d-flex ">
              <button class="btn-select" @click.prevent="selectBannerImg">
              <div v-if="localBannerImg.length > 1">
                <img class="preview" height="100" width=200 :src="localBannerImg" />
              </div>
              <div v-else style="height: 100px; width: 200px">
                <img src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
                  style="height: 100px; width: 200px">
              </div>
              </button>
              <input
                type="file"
                ref="input2"
                style="display: none"
                @change="saveBannerImg"
                accept="image/*"
                required
              />
              <button class="btn-lg btn-info align-self-center" @click.prevent="deleteBannerImg">{{'Delete' | localize}}</button>
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
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addHall">{{'Save' | localize}}</button>
        <button type="submit" class="btn btn-default col-sm-6">
          {{'DeleteForm' | localize}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import Module from '@/module/module'
import Loader from '@/components/Loader'
import CardShowImg from '@/components/CardShowImg'

export default {
  data () {
    return {
      title: 'Halls',
      lang: 'UA',
      id: 0,
      cinemaId: 0,
      locale: false,
      loading: false,

      page: {
        locale: true,
        name: '',
        description: '',
        mainImg: '',
        bannerImg: '',
        localImgArr: [],
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },
      ru: {
        locale: true,
        name: '',
        description: '',
        mainImg: '',
        bannerImg: '',
        localImgArr: [],
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },
      ua: {
        locale: true,
        name: '',
        description: '',
        mainImg: '',
        bannerImg: '',
        localImgArr: [],
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },

      mainImageData: null,
      localMainImg: '',
      bannerImageData: null,
      localBannerImg: '',
      localImg: [
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 0},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 1},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 2},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 3},
        {img: 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg', id: 4}
      ]
    }
  },
  components: {
    Loader, CardShowImg
  },
  methods: {
    changeLang(key) {
      this.locale = key
      this.$store.dispatch('changeLocale', this.locale ? 'ukr-UKR' : 'rus-RUS')
      if (key) {
        this.page = this.ua
        this.lang = 'UA'
        this.localMainImg = this.ua.mainImg
        this.localBannerImg = this.ua.bannerImg
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
        this.localBannerImg = this.ru.bannerImg
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
    
    clearLocalImg() {
      for (let i=0; i<this.localImg.length; i++){
        this.localImg[i].img = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
      }
    },
    changeLocalImg(card) {
      this.localImg[card.id] = card
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
      this.mainImg = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
    },
    // баннер фото
    selectBannerImg() {
      this.$refs.input2.click()
    },
    saveBannerImg(event) {
      this.bannerImg=null;
      this.bannerImageData = event.target.files[0];
      this.localBannerImg = window.URL.createObjectURL(event.target.files[0]);
    },
    deleteBannerImg() {
      this.bannerImageData = null,
      this.localBannerImg = ''
      this.bannerImg = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
    },

    async addHall () {
      this.loading = true
      try {
        if (this.mainImageData) {
          this.page.mainImg = await Module.addImg (this.title, this.lang, this.mainImageData, this.id, 'main')
        }

        if (this.bannerImageData) {
          this.page.bannerImg = await Module.addImg (this.title, this.lang, this.bannerImageData, this.id, 'banner')
        }
        this.page.localImgArr = await Module.addOtherImg(this.title, this.lang, this.localImg, this.id)

        await Module.addHallById(this.title, this.page, this.lang, this.id, this.cinemaId)

      } catch (e) {
        console.log(e)
      }
      this.loading = false
      this.$router.push({ path: '/cinemas-page/' + this.cinemaId})
    },
    async fetchHallInfo (cinemaId, id) {
      const loadHall = await Module.fetchCinemaHallById (this.title, cinemaId, id)
        if (loadHall.lang === 'UA') {
          this.$store.dispatch('changeLocale', 'ukr-UKR')
          this.page = loadHall.UA
          this.ua = loadHall.UA
          this.localMainImg = loadHall.UA.mainImg
          this.localBannerImg = loadHall.UA.bannerImg
          if ( loadHall.UA.localImgArr !== undefined ) {
            for (let i = 0; i < loadHall.UA.localImgArr.length; i++) {
              this.localImg[i].img = loadHall.UA.localImgArr[i]
            }
          }
          if ( loadHall.RU ) {
            this.ru = loadHall.RU
          }
        }

        if (loadHall.lang === 'RU') {
          this.$store.dispatch('changeLocale', 'rus-RUS')
          this.lang = 'RU'
          this.page = loadHall.RU
          this.ru = loadHall.RU
          this.localMainImg = loadHall.RU.mainImg
          this.localBannerImg = loadHall.RU.bannerImg
          if ( loadHall.RU.localImgArr !== undefined ) {
            for (let i = 0; i < loadHall.RU.localImgArr.length; i++) {
              this.localImg[i].img = loadHall.RU.localImgArr[i]
            }
          }
          if ( loadHall.UA ) {
            this.ua = loadHall.UA
          }
        }
    }
  },
  async mounted () {
    this.loading = true
    const idxArr = this.$route.params.id.split('-')
    if ( idxArr.length === 2) {
      this.cinemaId = idxArr[0]
      this.id = idxArr[1]
      await this.fetchHallInfo(this.cinemaId, this.id)
    } else {
      this.cinemaId  = this.$route.params.id
      this.id = Math.floor(Math.random()*10000)
      console.log(this.cinemaId, this.id)
    }
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