<template>
  <div class="m-3 row justify-content-between">
    <div class="col-2 column">
      <div class="d-flex flex-column">
        <div class="">
          <button type="button" class="btn btn-info btn-block mb-2">{{ 'Poster' | localize }}</button>
        </div>
        <div class="">
          <button type="button" class="btn btn-info btn-block mb-2">{{ 'Soon' | localize }}</button>
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
          class="rounded row justify-content-start p-5"
          style="background-color: #777A78">
          <UserFilmCard />
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

      films: [],
      soonFilms: []
    }
  },
  async mounted () {
    const filmsFromDatabase = await Module.fetchInfo(this.title)
    console.log(filmsFromDatabase)
    this.loading = false
    filmsFromDatabase.forEach(el => {
      if (el.RU.soon || el.UA.soon) {
        this.soonFilms.push(el)
      } else {
        this.films.push(el)
      }
    })
    console.log(this.soonFilms)
    console.log(this.films)
  }
}
</script>
