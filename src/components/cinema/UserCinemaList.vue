<template>
  <div class="d-flex row justify-content-center">
    <UserCinemaCard
      v-for="(cinema, idx) in cinemas"
      :key="idx"
      :cinema="cinema"
      @to-cinema-detaile="toCinemaDetaile"/>
  </div>
</template>

<script>
import UserCinemaCard from '@/components/cinema/UserCinemaCard'

export default {
  components: {
    UserCinemaCard
  },
  props: {
    cinemas: {
      type: Array,
      required: true
    }
  },
  methods: {
    toCinemaDetaile (cinema) {
      this.$store.dispatch('addCinemaInfo', cinema)
      this.$router.push({ path: `/cinema/${cinema.id}` })
    }
  }
}
</script>
