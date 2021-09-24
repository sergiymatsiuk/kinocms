<template>
  <div class="custom-container">
    <loader v-if="loading"/>
    <div class="mt-5 pt-5" v-else>
      <user-select
        :sessions="sessions"
        @change-price="changePrice"
        @change-cinema="changeCinema"
        @change-film="changeFilm"
        @change-date="changeDate"/>
      <user-show
        :sessions="filterByDate"/>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Module from '@/module/module'
import UserShow from '@/components/timetable/UserShow'
import UserSelect from '@/components/timetable/UserSelect'

export default {
  components: {
    Loader,
    UserShow,
    UserSelect
  },
  data () {
    return {
      loading: true,
      sessions: [],
      filterPrice: 0,
      filterCinema: '',
      filterFilm: '',
      filterDate: ''
    }
  },
  computed: {
    filterByPrice () {
      return this.sessions.filter(el => {
        if (this.filterPrice === 0) {
          return el
        } else {
          return el.price === this.filterPrice
        }
      })
    },
    filterByCinema () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.filterByPrice.filter(el => {
          if (el.cinema.RU.name.includes(this.filterCinema)) {
            return el
          }
        })
      } else {
        return this.filterByPrice.filter(el => {
          if (el.cinema.UA.name.includes(this.filterCinema)) {
            return el
          }
        })
      }
    },
    filterByFilm () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.filterByCinema.filter(el => {
          if (el.film.RU.name.includes(this.filterFilm)) {
            return el
          }
        })
      } else {
        return this.filterByCinema.filter(el => {
          if (el.film.UA.name.includes(this.filterFilm)) {
            return el
          }
        })
      }
    },
    filterByDate () {
      return this.filterByFilm.filter(el => {
        return el.date.includes(this.filterDate)
      })
    }
  },
  methods: {
    changePrice (price) {
      this.filterPrice = price
    },
    changeCinema (cinema) {
      this.filterCinema = cinema
    },
    changeFilm (film) {
      this.filterFilm = film
    },
    changeDate (date) {
      this.filterDate = date
    }
  },
  async mounted () {
    this.sessions = await Module.fetchInfo('Timetable')
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    margin: 0 auto;
    max-width: 1000px;
    background-color: #fff;
  }
</style>
