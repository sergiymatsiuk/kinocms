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
        <div class="form-group column">
          <div class="col-6 row">
            <label for="inputEmail3" class="col-4 col-form-label"><h6>{{ 'Phone' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="Название"
                v-model="page.phone1"
              />
            </div>
          </div>
          <div class="col-6 row">
            <label for="inputEmail3" class="col-4 col-form-label"><h6></h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                id="inputEmail3"
                placeholder="Название"
                v-model="page.phone2"
              />
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label"><h6>{{ 'SeoText' | localize}}</h6></label>
          <div class="col-sm-10">
            <textarea
              type="text"
              class="form-control"
              id="inputPassword3"
              placeholder="Текст"
              v-model="page.SEOdescription"
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
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    Loader
  },
  data () {
    return {
      page: {
        locale: true,
        active: true,
        phone1: '',
        phone2: '',
        SEOdescription: '',
        SEO: {
          SEOurl: '',
          SEOtitle: '',
          SEOkeywords: '',
          SEOdescription: ''
        }
      },
      ru: {
        locale: true,
        active: true,
        phone1: '',
        phone2: '',
        SEOdescription: '',
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
        phone1: '',
        phone2: '',
        SEOdescription: '',
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
    }
  },

  methods: {
    changeLang (key) {
      this.locale = key
      this.$store.dispatch('changeLocale', this.locale ? 'ukr-UKR' : 'rus-RUS')
      if (key) {
        this.page = this.ua
        this.lang = 'UA'
        this.localMainImg = this.ua.mainImg
      } else {
        this.page = this.ru
        this.lang = 'RU'
        this.localMainImg = this.ru.mainImg
      }
    },

    async addPages () {
      try {
        this.loading = true

        await Module.addInfoById('Pages', this.page, this.lang, this.id)

        this.loading = false

        this.$router.push({path: '/admin/pages'})
      } catch (e) {}
    }, 
  },

  async mounted () {
    this.id  = this.$route.params.id
    const loadMainPage = await Module.fetchInfoById('Pages', this.id)

      if (loadMainPage.lang === 'UA') {
        this.$store.dispatch('changeLocale', 'ukr-UKR')
        this.page = loadMainPage.UA
        this.ua = loadMainPage.UA
        if ( loadMainPage.RU ) {
          this.ru = loadMainPage.RU
        }
      }

      if (loadMainPage.lang === 'RU') {
        this.$store.dispatch('changeLocale', 'rus-RUS')
        this.lang = 'RU'
        this.page = loadMainPage.RU
        this.ru = loadMainPage.RU
        if ( loadMainPage.UA ) {
          this.ua = loadMainPage.UA
        }
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