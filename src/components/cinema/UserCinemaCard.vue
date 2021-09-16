<template>
  <div
    class="m-3 text-center"
    style="width: 45%; height: 300px"
    @click.prevent="clickToCinema">
    <img class="card-img-top" :src="showCinema.mainImg" style="height: 100%">
    <h2 class="mt-2">{{showCinema.name}}</h2>
  </div>
</template>

<script>
export default {
  props: {
    cinema: {
      type: Object,
      required: true
    }
  },
  computed: {
    showCinema () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.cinema.RU
      } else {
        return this.cinema.UA
      }
    }
  },
  methods: {
    clickToCinema () {
      this.$emit('to-cinema-detaile', this.cinema)
    }
  },
  mounted () {
  }
}
</script>
