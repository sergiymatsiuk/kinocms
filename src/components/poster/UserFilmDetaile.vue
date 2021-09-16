<template>
  <div class="">
    <div class="">
      <button type="button" class="btn btn-info position-fixed fixed-btn" @click="toMain">{{ 'OnMain' | localize }}</button>
    </div>
    <iframe
      width="100%"
      height="700px"
      :src="showFilmDetaile.URLyoutube"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <div class="m-5">
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
      <div class="mt-5 custom-container">
        <div class="rounded d-flex align-items-center justify-content-center" style="height: 200px; background-color: #D3D3D3">
          <h2>Реклама</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSlider from '@/components/poster/UserSlider'

export default {
  components: {
    UserSlider
  },
  props: {
    showFilm: {
      type: Object,
      required: true
    }
  },
  computed: {
    showFilmDetaile () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.showFilm.RU
      } else {
        return this.showFilm.UA
      }
    },
    imgsToShow () {
      return this.showFilmDetaile.localImgArr
    }
  },
  methods: {
    toMain () {
      this.$emit('on-main')
    }
  }
}
</script>

<style scoped>
  .custom-container {
    max-width: 1000px;
    margin: 0 auto
  }
  .fixed-btn {
    top: 20px;
    left: 50px;
    width: 200px;
    z-index: 9;
  }
</style>
