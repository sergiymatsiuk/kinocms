<template>
  <div>
    <div class="m-3 row justify-content-between" v-if="!filmDetaile">
      <div class="col-2 column">
        <div class="d-flex flex-column">
          <div class="">
            <button type="button" class="btn btn-info btn-block mb-2" @click="poster = true">{{ 'Poster' | localize }}</button>
          </div>
          <div class="">
            <button type="button" class="btn btn-info btn-block mb-2" @click="poster = false">{{ 'Soon' | localize }}</button>
          </div>
        </div>
        <div class="mt-2">
          <div class="rounded d-flex align-items-center justify-content-center" style="height: 350px; background-color: #D3D3D3">
            <h3>Реклама</h3>
          </div>
        </div>
      </div>
      <div class="col-10">
        <Loader v-if="loading"/>
        <UserFilmList
          v-else
          :films="films"
          :soonFilms="soonFilms"
          :poster="poster"
          @show-films-detaile="showFilmsDetaile"/>
      </div>
    </div>
    <UserFilmDetaile
      v-else
      :showFilm="showFilm"
      @on-main="closeFilmDetaile"/>
  </div>
</template>

<script>
import UserFilmList from '@/components/poster/UserFilmList'
import UserFilmDetaile from '@/components/poster/UserFilmDetaile'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    Loader, UserFilmList, UserFilmDetaile
  },
  data () {
    return {
      loading: true,
      title: 'Films',
      poster: false,
      filmDetaile: false,

      films: [],
      soonFilms: [],
      showFilm: null
    }
  },
  computed: {
  },
  methods: {
    showFilmsDetaile (film) {
      this.showFilm = film
      this.filmDetaile = true
    },
    closeFilmDetaile () {
      this.filmDetaile = false
      this.showFilm = null
    }
  },
  async mounted () {
    const filmsFromDatabase = await Module.fetchInfo(this.title)
    filmsFromDatabase.forEach(el => {
      if (el.RU.soon || el.UA.soon) {
        this.soonFilms.push(el)
      } else {
        this.films.push(el)
      }
    })
    this.loading = false
  }
}
</script>
