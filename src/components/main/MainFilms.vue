<template>
  <div class="main-soon">
    <h2 class="main-soon-header">{{ 'WatchNow' | localize }}</h2>
    <div class="main-soon-container">
      <main-card-film
        v-for="(film, idx) in films"
        :key="idx"
        :film="film">
          <div class="btn-custom-box">
            <button class="btn btn-info btn-lg">{{ 'ByTicket' | localize }}</button>
          </div>
        </main-card-film>
    </div>
  </div>
</template>

<script>
import MainCardFilm from '@/components/main/MainCardFilm'

export default {
  props: {
    films: {
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
  .btn-custom-box {
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
</style>
