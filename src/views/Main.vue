<template>
  <div class="">
    <loader
      v-if="loading"/>
    <div class="custom-container" v-else>
      <user-slider
        :imgsToShow="showBannerUp"/>
      <main-films
        :films="films"/>
      <main-soon-films
        :soonFilms="soonFilms"/>
      <main-banner-news
        :banners="bannerToShow"/>
      <div class="rounded d-flex align-items-center justify-content-center advertising">
        <h3>Реклама</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Module from '@/module/module'
import Loader from '@/components/Loader'
import UserSlider from '@/components/poster/UserSlider'
import MainBannerNews from '@/components/main/MainBannerNews'
import MainSoonFilms from '@/components/main/MainSoonFilms'
import MainFilms from '@/components/main/MainFilms'

export default {
  components: {
    UserSlider,
    MainFilms,
    MainSoonFilms,
    MainBannerNews,
    Loader
  },
  data () {
    return {
      loading: true,
      soonFilms: [],
      films: [],
      banners: [],
      bannersUp: []
    }
  },
  computed: {
    bannerToShow () {
      return this.banners.map(el => {
        return el.img
      })
    },
    showBannerUp () {
      return this.bannersUp.map(el => {
        return el.img
      })
    }
  },
  async mounted () {
    this.bannersUp = await Module.fetchInfoBanner('Banner', 'bannerUp')
    this.banners = await Module.fetchInfoBanner('Banner', 'bannerNews')
    const filmsFromDatabase = await Module.fetchInfo('Films')
    filmsFromDatabase.forEach(el => {
      if (el.RU.soon || el.UA.soon) {
        this.soonFilms.push(el)
      } else {
        this.films.push(el)
      }
    })
    console.log(this.soonFilms)
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    max-width: 1000px;
    margin: 50px auto;
  }
  .advertising {
    height: 150px;
    background-color: #D3D3D3
  }
  .custom-img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
