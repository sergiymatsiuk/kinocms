<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <form class="form-horizontal"  v-else>
      <div class="d-flex flex-row-reverse">
        <lang-toggle class="mt-5 mr-5"/>
      </div>
      <div class="card-body">
        <CinemasPage
          v-for="cinema in cinemas"
          :key="cinema.id"
          :item="cinema"
          @changeCinemas="changeCinemas"
        />
        <div class="form-group column">
          <div class="d-flex justify-content-center my-4">
            <button type="submit" class="btn btn-info col-sm-4" @click.prevent="addPages">{{'AddCinema' | localize}}</button>
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
                v-model="showSEO.SEOurl"
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
                v-model="showSEO.SEOtitle"
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
                v-model="showSEO.SEOkeywords"
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
                v-model="showSEO.SEOdescription"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-5">
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addCinemaToData">{{'Save' | localize}}</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */

import Loader from '@/components/Loader'
import Module from '@/module/module'
import CinemasPage from '@/views/admin/pages/CinemasPage'
import LangToggle from '@/components/LangToggle'

export default {
  components: {
    Loader, CinemasPage, LangToggle
  },
  data () {
    return {
      cinemas: [],
      newCinemas: [],
      SEO: {
        SEOurl: '',
        SEOtitle: '',
        SEOkeywords: '',
        SEOdescription: ''
      },

      loading: true,
      title: 'Pages',
      lang: 'RU'
    }
  },
  methods: {
    addPages () {
      this.cinemas.push({
        id: Math.floor(Math.random()*10000),
        RU: {
          address: '',
          logo: '',
          map: '',
          name: ''
        },
        UA: {
          address: '',
          logo: '',
          map: '',
          name: ''
        }
      })
    },
    changeCinemas (item) {
      this.cinemas = this.cinemas.map(el => {
        if (el.id !== item.id) {
          return el
        } else {
          return item
        }
      })
      console.log(this.cinemas)
    },
    async addCinemaToData () {
      this.loading = true

      await Module.addPageById(this.title, this.SEO, this.id)

      await Module.addPageCinemaById(this.title, this.cinemas, this.id)

      this.loading = false
    }
  },
  computed: {
    showSEO () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.SEO.RU
      } else {
        return this.SEO.UA
      }
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    const contactPage = await Module.fetchInfoById('Pages', this.id)
    this.cinemas = Object.keys(contactPage.Cinemas).map(key => ({ ...contactPage.Cinemas[key], id: key }))
    this.SEO = contactPage.SEO
    this.loading = false
  }
}
</script>
