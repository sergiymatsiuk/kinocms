<template>
  <div>
    <div class="m-3 row justify-content-between">
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
        <div v-else>
          <div
            v-if="poster"
            class="rounded d-flex row justify-content-start p-5"
            style="background-color: #777A78">
            <UserFilmCard
              v-for="(film, idx) in films"
              :key="idx"
              :film="film"/>
          </div>
          <div
            v-else
            class="rounded d-flex row justify-content-start p-5"
            style="background-color: #777A78">
            <UserFilmCard
              v-for="(film, idx) in soonFilms"
              :key="idx"
              :film="film"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserFilmCard from '@/components/UserFilmCard'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    UserFilmCard, Loader
  },
  data () {
    return {
      loading: true,
      title: 'Films',
      poster: true,

      films: [],
      soonFilms: []
    }
  },
  computed: {
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
