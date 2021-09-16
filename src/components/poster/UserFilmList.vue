<template>
  <div>
    <div
      v-if="poster"
      class="d-flex row justify-content-start p-5">
      <UserFilmCard
        v-for="(film, idx) in films"
        :key="idx"
        :film="film"
        @show-film-detail="showFilmsDetail"/>
    </div>
    <div
      v-else
      class="d-flex row justify-content-start p-5">
      <UserFilmCard
        v-for="(film, idx) in soonFilms"
        :key="idx"
        :film="film"
        @show-film-detail="showFilmsDetail"/>
    </div>
  </div>
</template>

<script>
import UserFilmCard from '@/components/poster/UserFilmCard'

export default {
  props: {
    films: {
      type: Array,
      required: true
    },
    soonFilms: {
      type: Array,
      required: true
    },
    poster: {
      type: Boolean
    }
  },
  components: {
    UserFilmCard
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    showFilmsDetail (film) {
      this.$emit('show-films-detaile', film)
    }
  }
}
</script>
