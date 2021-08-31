<template>
  <div class="card card-info">
    <div class="d-flex justify-content-between flex-column">
      <div class="align-self-center mb-3 mt-3">
        <h2>Список кинотеатров</h2>
      </div>
      <Loader v-if="loader" class="mb-5"/>
      <p class="mt-5 mb-5 align-self-center" v-else-if="cinemas.length === 0">Кинотеaтров пока нет!</p>
      <div class="d-flex flex-wrap justify-content-center" v-else>
        <CardCinemas
          v-for="cinema in cinemasList"
          :key="cinema.id"
          :card="cinema"
          @changeCinemas="loadNewCinemas"
        />
      </div>
      <div class="align-self-center mb-3 mt-3">
        <button type="submit" class="btn btn-info col" style="width: 300px" @click.prevent="addNewCinema">Добавить кинотеатр</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Module from '@/module/module'
import Loader from '@/components/Loader'
import CardCinemas from '@/components/CardCinemas'

export default {
  data () {
    return {
      loader: true,
      id: 0,
      name: 'Cinemas',

      cinemas: []
    }
  },
  computed: {
    cinemasList () {
      return this.cinemas
    }
  },
  methods: {
    addNewCinema () {
      this.$router.push({ path: '/cinemas-page/' + this.id})
    },
    async loadNewCinemas () {
      try {
        this.loader = true
        this.cinemas = []
        const cinemasFromDatabase = await Module.fetchInfo(this.name)
        cinemasFromDatabase.forEach(el => {
          el.lang === 'UA' ? this.cinemas.push({ ...el.UA, id: el.id }) : this.cinemas.push({ ...el.RU, id: el.id })
        })
        this.loader = false
      } catch (e) {}
    }
  },
  async mounted () {
    try {
      this.id = await this.$store.dispatch('getCounter')
      const cinemasFromDatabase = await Module.fetchInfo(this.name)
      cinemasFromDatabase.forEach(el => {
        el.lang === 'UA' ? this.cinemas.push({ ...el.UA, id: el.id }) : this.cinemas.push({ ...el.RU, id: el.id })
      })
      this.loader = false
    } catch (e) {}
  },
  components: {
    Loader, CardCinemas
  }
  
}
</script>
