<template>
  <div class="card col-2.5 mr-2 ml-2 p-2 mt-2"
  >
    <i
      class="position-absolute fa fa-window-close"
      @click="deleteCardFilms"
    ></i>
    <div class="d-flex mt-1">
      <img
        @click="showFilmInfo"
        :src="film.mainImg"
        :alt="film.name"
        style="width: 300px; height: 200px">
    </div>
    <div class="d-flex mt-1 justify-content-center mt-2">
      <h6>{{film.name}}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFilms',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      film: this.card,
      title: 'Films'
    }
  },
  methods: {
    async deleteCardFilms () {
      await this.$store.dispatch('deleteItem', {
        title: this.title,
        id: this.film.id
      })
      this.$emit('changeFilms')
    },

    async showFilmInfo () {
      this.$router.push({ path: '/films-pages/' + this.film.id })
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  i {
    top: -3%;
    left: 98%;
  }
</style>
