<template>
  <div class="card-film">
    <img
      class="card-film-img"
      :src="showFilm.mainImg"
      :alt="showFilm.name"
      @click.prevent="toFilmDetaile">
    <h5 class="card-film-header">{{showFilm.name}}</h5>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  computed: {
    showFilm () {
      const lang = this.$store.getters.info.locale
      if (lang === 'ukr-UKR') {
        return this.film.UA
      } else {
        return this.film.RU
      }
    }
  },
  methods: {
    toFilmDetaile () {
      this.$router.push({ path: '/film-detaile/' + this.film.id })
    }
  }
}
</script>

<style scoped>
  .card-film {
    width: 48%;
  }
  .card-film-img {
    width: 100%;
  }
  .card-film-header {
    margin: 15px 0;
    text-align: center;
  }
</style>
