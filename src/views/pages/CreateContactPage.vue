<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <form class="form-horizontal"  v-else>
      <div class="card-body">
        <CinemasPage
          v-for="cinema in cinemas"
          :key="cinema.id"
          :item="cinema"
          @changeCinemas="changeCinemas"
        />
        <div class="form-group column">
          <div class="d-flex justify-content-center mb-4">
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
                v-model="SEO.SEOurl"
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
                v-model="SEO.SEOtitle"
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
                v-model="SEO.SEOkeywords"
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
                v-model="SEO.SEOdescription"
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
import CinemasPage from '@/views/pages/CinemasPage'

export default {
  components: {
    Loader, CinemasPage
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
      id: 0,
      title: 'Pages',
      lang: 'RU'
    }
  },
  methods: {
    addPages () {
      this.cinemas.push({
        imgData: null,
        address: '',
        id: Math.floor(Math.random()*10000),
        logo: '',
        map: '',
        name: ''
      })
    },
    changeCinemas (item) {
      this.newCinemas.push(item)
      console.log(this.newCinemas)
    },
    async addCinemaToData () {
      this.loading = true

      await Module.addPageById(this.title, this.SEO, this.lang, this.id)

      await Module.addPageCinemaById(this.title, this.newCinemas, this.lang, this.id)

      this.loading = false
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    this.$store.dispatch('changeLocale', 'rus-RUS')
    const contactPage = await Module.fetchInfoById('Pages', this.id)
    this.cinemas = Object.keys(contactPage.RU.Cinemas).map(key => ({ ...contactPage.RU.Cinemas[key], id: key }))
    this.SEO = contactPage.RU.SEO
    this.loading = false
  }
}
</script>
