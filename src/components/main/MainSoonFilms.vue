<template>
  <div class="main-soon">
    <h2 class="main-soon-header">{{ 'WatchSoon' | localize }}</h2>
    <div class="main-soon-container">
      <main-card-film
        v-for="(film, idx) in soonFilms"
        :key="idx"
        :film="film">
          <h5 class="soon-card-header">{{ 'SoonFilmDate' | localize }}</h5>
        </main-card-film>
    </div>
  </div>
</template>

<script>
import MainCardFilm from '@/components/main/MainCardFilm'

export default {
  props: {
    soonFilms: {
      type: Array,
      required: true
    }
  },
  components: {
    MainCardFilm
  }
}
</script>

<style scoped>
  .main-soon {
    margin: 50px 0;
  }
  .main-soon-header {
    text-align: center;
    margin-bottom: 30px;
  }
  .main-soon-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .soon-card-header {
    padding-bottom: 25px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    color: rgb(10, 163, 10)
  }
</style>
