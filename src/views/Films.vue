<template>
  <div class="card card-info">
    <div class="d-flex justify-content-between flex-column">
      <div class="align-self-center mb-3 mt-3">
        <h2>Список фильмов текущих</h2>
      </div>
      <Loader v-if="loader" class="mb-5"/>
      <p class="mt-5 mb-5 align-self-center" v-else-if="films.length === 0">Фильмов пока нет!</p>
      <div class="d-flex flex-wrap justify-content-center" v-else>
        <CardFilms
          v-for="film in films"
          :key="film.id"
          :card="film"
          @changeFilms="loadNewFilms"
        />
      </div>
      <div class="align-self-center mb-3 mt-3">
        <button type="submit" class="btn btn-info col" style="width: 300px" @click="addNewFilm">Добавить фильм</button>
      </div>
    </div>
    <div class="d-flex justify-content-between flex-column">
      <div class="align-self-center mb-3 mt-3">
        <h2>Список фильмов которые покажут скоро</h2>
      </div>
      <Loader v-if="loader" class="mb-5"/>
      <p class="mt-5 mb-5 align-self-center" v-else-if="soonFilms.length === 0">Фильмов пока нет!</p>
      <div class="d-flex flex-wrap justify-content-center" v-else>
        <CardFilms
          v-for="film in soonFilms"
          :key="film.id"
          :card="film"
          @changeFilms="loadNewFilms"
        />
      </div>
      <div class="align-self-center mb-3 mt-3">
        <button type="submit" class="btn btn-info col" style="width: 300px" @click="addNewFilm">Добавить фильм</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CardFilms from '@/components/CardFilms'
import Loader from '@/components/Loader'


export default {
  components: {
    CardFilms, Loader
  },

  data () {
    return {
      title: 'Films',
      films: [],
      soonFilms: [],
      loader: true,
      id: 0
    }
  },

  methods: {
    addNewFilm () {
      this.$router.push({ path: '/admin/films-pages/' + this.id})
    },

    async loadNewFilms () {
      this.loader = true
      this.films = []
      this.soonFilms = []
      const newFilms = await this.$store.dispatch('fetchInfo', this.title)
      newFilms.forEach(el => {
        el.lang === 'UA' ?
          el.UA.soon ? this.soonFilms.push(el.UA) : this.films.push(el.UA) :
          el.RU.soon ? this.soonFilms.push(el.RU) : this.films.push(el.RU)
      })
      this.loader = false
    }
  },

  async mounted () {
    this.id = await this.$store.dispatch('getCounter')
    const filmsFromDatabase = await this.$store.dispatch('fetchInfo', this.title)
    filmsFromDatabase.forEach(el => {
      el.lang === 'UA' ?
        el.UA.soon ? this.soonFilms.push({ ...el.UA, id: el.id }) : this.films.push({ ...el.UA, id: el.id }) :
        el.RU.soon ? this.soonFilms.push({ ...el.RU, id: el.id }) : this.films.push({ ...el.RU, id: el.id })
    })
    this.loader = false
  }
};
</script>
