<template>
  <div class="m-2 text-center" style="width: 18rem; background-color: transparent">
    <img class="card-img-top" :src="film.mainImg">
    <div class="card-body">
      <a class="card-title mb-3 btn" style="width: 100%; font-size:30px; color: black; font-weight:700">{{ film.name }}</a>
      <a href="#" class="btn btn-warning" style="min-width: 15rem" @click.prevent="toFilmDetaile">{{'WatchDetaile'| localize}}</a>
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
  },
  methods: {
    toFilmDetaile () {
      this.$router.push({ path: '/film-detaile/' + this.film.id })
    }
  },
  mounted () {
  }
}
</script>
