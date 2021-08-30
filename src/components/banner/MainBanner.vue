<template>
  <div class="d-flex justify-content-between p-3 flex-column">
    <div class="align-self-center mb-3">
      <h2>На главной верх</h2>
    </div>
    <div class="custom-control custom-switch d-flex align-items-center mb-3">
      <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="active">
      <label class="custom-control-label" for="customSwitch1">ВКЛ</label>
    </div>
    <div v-if="active">
      <Loader v-if="loading" class="mb-5"/>
      <div class="d-flex flex-row justify-content-between" v-else>
        <div class="d-flex flex-wrap">
          <CardBanner
            class="d-flex flex-row"
            v-for="film in films"
            :key="film.id"
            :film="film"
            @delete-card="deleteCard"
            @change-films="changeFilms"
          />
        </div>
        <div class="d-flex col-2">
          <button class="btn-lg btn-info align-self-center" @click="addCard">
            Добавить фото
          </button>
        </div>
      </div>
      <div class="form-group col-2">
        <label>Скорость вращения</label>
        <select class="form-control" v-model="speed">
          <option :value=1>1c</option>
          <option :value=2>2c</option>
          <option :value=5>5c</option>
          <option :value=10>10c</option>
          <option :value=15>15c</option>
        </select>
      </div>
    </div>
    <div class="d-flex align-self-center mt-3">

      <button class="btn-lg btn-info" @click="saveBannerToDB">Сохранить</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CardBanner from '@/components/banner/CardBanner'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    CardBanner, Loader
  },
  data () {
    return {
      title: 'Banner',
      banner: 'bannerUp',
      speed: 1,

      loading: true,
      active: true,
      counter: 0,

      films: []
    }
  },

  methods: {
    addCard () {
      let randomId = Math.floor(Math.random()*10000)
      this.films.push(
        { 
          img: '',
          title: '',
          url: '',
          id: randomId,
          imageData: null
        }
      )
    },

    async deleteCard (target) {
      this.loading = true
      await Module.deleteItemBanner(this.title, this.banner, target.id)
      this.films = await Module.fetchInfoBanner(this.title, this.banner)
      this.loading = false
    },

    changeFilms (film) {
      this.films = this.films.map(el => {
        if (el.id === film.id) {
          return film
        } 
        return el
      })
    },

    async saveBannerToDB () {
      this.loading = true

      for (let i = 0; i < this.films.length; i++) {
        if (this.films[i].imageData) {
          this.films[i].id = await Module.getCounter()
          this.films[i].img = await Module.addBannerImg (this.title, this.banner, this.films[i].imageData, this.films[i].id, 'banner')
          this.films[i].imageData = null
          await Module.addBanner (this.title, this.banner, this.films[i].id, this.films[i])
          await Module.addCounter()
        } else if (!this.films[i].imageData && this.films[i].img) {
          await Module.addBanner (this.title, this.banner, this.films[i].id, this.films[i])
        }
      }

      this.films = await Module.fetchInfoBanner(this.title, this.banner)
      await Module.addBannerSpeed(this.title, 'bannerUpSpeed', this.speed)
      this.loading = false
    }
  },

  async mounted () {
    this.films = await Module.fetchInfoBanner(this.title, this.banner)
    this.speed = await Module.fetchInfoBannerSpeed(this.title, 'bannerUpSpeed')
    this.loading = false
  }
}
</script>

<style lang="css" scoped>
  ul {
    padding-inline-start: 0;
    margin-bottom:0;
  }
  ul .card {
    margin-bottom: 0;
  }
  i {
    top: -67%;
    right: -2%;
  }
  .no-show {
    display: none;
  }
</style>
