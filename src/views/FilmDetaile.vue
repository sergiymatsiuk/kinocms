<template>
  <div class="">
    <loader v-if="loading"/>
    <div class="" v-else>
      <iframe
        width="100%"
        height="700px"
        :src="showFilmDetaile.URLyoutube"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
      <div class="row justify-content-between">
        <div class="col-6 d-flex align-items-center">
          <img :src="showFilmDetaile.mainImg" :alt="showFilmDetaile.name" width="100%">
        </div>
        <div class="col-5 d-flex flex-column align-items-center justify-content-center">
          <div class="mb-4">
            <a href="#" class="btn btn-warning" style="min-width: 15rem">{{'Buy'| localize}}</a>
          </div>
          <div class="mb-4">
            <h3>{{showFilmDetaile.name}}</h3>
          </div>
          <div class="">
            <p>{{showFilmDetaile.description}}</p>
          </div>
        </div>
      </div>
      <UserSlider
        class="mx-auto mt-5"
        :imgsToShow="imgsToShow"/>
      <div class="my-5 custom-container">
        <div class="rounded d-flex align-items-center justify-content-center" style="height: 200px; background-color: #D3D3D3">
          <h2>Реклама</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSlider from '@/components/poster/UserSlider'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    UserSlider,
    Loader
  },
  data () {
    return {
      loading: true,
      film: {},
      id: 0
    }
  },
  computed: {
    showFilmDetaile () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.film.RU
      } else {
        return this.film.UA
      }
    },
    imgsToShow () {
      return this.showFilmDetaile.localImgArr
    }
  },
  methods: {
  },
  async mounted () {
    this.id = this.$route.params.id
    this.film = await Module.fetchInfoById('Films', this.id)
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    max-width: 1000px;
    margin: 0 auto
  }
</style>
