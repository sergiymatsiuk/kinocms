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
            <label for="inputEmail3" class="col-4 col-form-label"><h6>{{ 'Name' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="Название"
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
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addPages">{{'Save' | localize}}</button>
        <button type="submit" class="btn btn-default col-sm-6" @click.prevent="deleteAll">
          {{'DeleteForm' | localize}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import CardShowImg from '@/components/CardShowImg'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    CardShowImg, Loader
  },
  data () {
    return {
      page: {
        locale: true,
        active: true,
        name: '',
        date: '',
        description: '',
        mainImg: '',
        localImgArr: [],
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },
      ru: {
        locale: false,
        active: true,
        name: '',
        date: '',
        description: '',
        mainImg: '',
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
        active: true,
        name: '',
        date: '',
        description: '',
        mainImg: '',
        localImgArr: [],
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },

      loading: true,
      id: 0,
      lang: 'UA',
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
    clearLocalImg() {
      for (let i=0; i<this.localImg.length; i++){
        this.localImg[i].img = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
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

    // Додаткові фото
    changeLocalImg(card) {
      this.localImg[card.id] = card
    },

    async addPages () {
      try {
        this.loading = true

        if (this.mainImageData) {
          this.page.mainImg = await Module.addImg( 'Pages', this.lang, this.mainImageData, this.id, 'main')
        }

        this.page.localImgArr = await Module.addOtherImg( 'Pages', this.lang, this.localImg, this.id )

        await Module.addInfoById('Pages', this.page, this.lang, this.id)

        await Module.addCounter()

        this.loading = false

        this.$router.push({path: '/pages'})
      } catch (e) {}
    }, 

    async check (id, counter) {
      if (id != counter) {
        const loadNews = await Module.fetchInfoById('Pages', this.id)
        console.log(loadNews)
        if (loadNews.lang === 'UA') {
          this.$store.dispatch('changeLocale', 'ukr-UKR')
          this.page = loadNews.UA
          this.ua = loadNews.UA
          this.localMainImg = loadNews.UA.mainImg
          if ( loadNews.UA.localImgArr !== undefined ) {
            for (let i = 0; i < loadNews.UA.localImgArr.length; i++) {
              this.localImg[i].img = loadNews.UA.localImgArr[i]
            }
          }
          if ( loadNews.RU ) {
            this.ru = loadNews.RU
          }
        }

        if (loadNews.lang === 'RU') {
          this.$store.dispatch('changeLocale', 'rus-RUS')
          this.lang = 'RU'
          this.page = loadNews.RU
          this.ru = loadNews.RU
          this.localMainImg = loadNews.RU.mainImg
          if ( loadNews.RU.localImgArr !== undefined ) {
            for (let i = 0; i < loadNews.RU.localImgArr.length; i++) {
              this.localImg[i].img = loadNews.RU.localImgArr[i]
            }
          }
          if ( loadNews.UA ) {
            this.ua = loadNews.UA
          }
        }
      }
    },
  },

  async mounted () {
    this.id  = this.$route.params.id
    const counter = await Module.getCounter()

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