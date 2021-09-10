<template>
  <div class="m-2 text-center" style="width: 18rem; background-color: transparent">
    <img class="card-img-top" :src="showFilm.mainImg">
    <div class="card-body">
      <a class="card-title mb-3" style="width: 100%; font-size:30px; color: black; font-weight:700">{{ showFilm.name }}</a>
      <a href="#" class="btn btn-warning" style="min-width: 16rem">{{'Buy'| localize}}</a>
    </div>
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
      if (lang === 'rus-RUS') {
        return this.film.RU
      } else {
        return this.film.UA
      }
    }
  },
  mounted () {
  }
}
</script>
