<template>
  <div class="card col-2.5 mr-2 ml-2 p-2 mt-2">
    <i
      class="position-absolute fa fa-window-close"
      @click="deleteCardCinemas"
    ></i>
    <div class="d-flex mt-1">
      <img
        @click="showCinemaInfo"
        :src="cinema.mainImg"
        :alt="cinema.name"
        style="width: 300px; height: 200px">
    </div>
    <div class="d-flex mt-1 justify-content-center mt-2">
      <h6>{{cinema.name}}</h6>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Module from '@/module/module'

export default {
  name: 'CardCinemas',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cinema: this.card,
      title: 'Cinemas'
    }
  },
  methods: {
    async deleteCardCinemas () {
      await Module.deleteItem(this.title, this.cinema.id)
      this.$emit('changeCinemas')
    },

    async showCinemaInfo () {
      this.$router.push({ path: '/cinemas-page/' + this.cinema.id })
    }
  }
}
</script>

<style scoped>
  i {
    top: -3%;
    left: 98%;
  }
</style>
