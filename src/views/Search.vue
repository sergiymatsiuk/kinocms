<template>
  <div class="custom-container">
    <loader v-if="loading"/>
    <div class="search-container" v-else>
      <h2 v-if="films.length === 0">{{ 'NoFilms' | localize }}</h2>
      <search-card-film
        v-else
        v-for="(film, idx) in searchSort"
        :key="idx"
        :film="film"/>
    </div>
  </div>
</template>

<script>
import Module from '@/module/module'
import Loader from '@/components/Loader'
import SearchCardFilm from '@/components/search/SearchCardFilm'

export default {
  components: {
    Loader,
    SearchCardFilm
  },
  data () {
    return {
      loading: true,
      films: [],
      search: ''
    }
  },
  computed: {
    langSort () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.films.reduce((acc, el) => {
          acc.push({ ...el.RU, id: el.id })
          return acc
        }, [])
      } else {
        return this.films.reduce((acc, el) => {
          acc.push({ ...el.UA, id: el.id })
          return acc
        }, [])
      }
    },
    searchSort () {
      return this.langSort.filter(el => {
        return el.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
  },
  async mounted () {
    this.search = this.$route.params.id
    this.films = await Module.fetchInfo('Films')
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    max-width: 1000px;
    margin: 0 auto;
  }
  .search-container {
    display: flex;
    justify-content: center;
    margin: 50px;
    min-height: 600px;
  }
</style>
