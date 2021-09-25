<template>
  <div class="d-flex flex-row">
    <div class="form-group col-1 text-center">
      <label class="">{{ 'Price' | localize}}</label>
      <select
        class="form-control"
        v-model="filterPrice">
        <option :value=0></option>
        <option
          v-for="(item, idx) in sortByPrice"
          :key="idx"
          :value="item"
          >{{item}}</option>
      </select>
    </div>
    <div class="form-group col-2 text-center">
      <label class="">{{ 'Date' | localize}}</label>
      <select
        class="form-control"
        v-model="filterDate">
        <option value=''></option>
        <option
          v-for="(item, idx) in dateSort"
          :key="idx"
          :value="item"
          >{{item}}</option>
      </select>
    </div>
    <div class="form-group col-3 text-center">
      <label class="">{{ 'Film' | localize}}</label>
      <select
        class="form-control"
        v-model="filterFilm">
        <option value=''></option>
        <option
          v-for="(item, idx) in filmWithoutDuplicates"
          :key="idx"
          :value="item"
          >{{item}}</option>
      </select>
    </div>
    <div class="form-group col-3 text-center">
      <label class="">{{ 'Cinema' | localize}}</label>
      <select
        class="form-control"
        v-model="filterCinema">
        <option value=''></option>
        <option
          v-for="(item, idx) in cinemaWithoutDuplicates"
          :key="idx"
          :value="item"
          >{{item}}</option>
      </select>
    </div>
    <div class="form-group col-3 text-center">
      <label class="">{{ 'Hall' | localize}}</label>
      <select
        class="form-control"
        :disabled="!filterCinema"
        v-model="filterHall">
        <option value=''></option>
        <option
          v-for="(item, idx) in selectHallsWithoutDuplicanes"
          :key="idx"
          :value="item"
          >{{item}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filterPrice: 0,
      filterCinema: '',
      filterFilm: '',
      filterDate: '',
      filterHall: ''
    }
  },
  watch: {
    filterPrice () {
      this.$emit('change-price', this.filterPrice)
    },
    filterCinema () {
      this.$emit('change-cinema', this.filterCinema)
      this.filterHall = ''
    },
    filterFilm () {
      this.$emit('change-film', this.filterFilm)
    },
    filterDate () {
      this.$emit('change-date', this.filterDate)
    },
    filterHall () {
      this.$emit('change-hall', this.filterHall)
    }
  },
  computed: {
    // PRICE
    price () {
      return this.sessions.map(el => {
        return el.price
      })
    },
    selectByPrice () {
      return this.price.filter((el, pos) => {
        return this.price.indexOf(el) === pos
      })
    },
    sortByPrice () {
      const res = [...this.selectByPrice]
      return res.sort((a, b) => {
        return a - b
      })
    },
    // CINEMA
    cinemaLangSelect () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.sessions.map(el => {
          return el.cinema.RU.name
        })
      } else {
        return this.sessions.map(el => {
          return el.cinema.UA.name
        })
      }
    },
    cinemaWithoutDuplicates () {
      return this.cinemaLangSelect.filter((el, pos) => {
        return this.cinemaLangSelect.indexOf(el) === pos
      })
    },
    // HALL
    selectHallsByCinema () {
      return this.sessions.filter(el => {
        return el.cinema.RU.name.includes(this.filterCinema) || el.cinema.UA.name.includes(this.filterCinema)
      })
    },
    selectHallsByLang () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.selectHallsByCinema.map(el => {
          return el.hall.RU.name
        })
      } else {
        return this.selectHallsByCinema.map(el => {
          return el.hall.UA.name
        })
      }
    },
    selectHallsWithoutDuplicanes () {
      return this.selectHallsByLang.filter((el, pos) => {
        return this.selectHallsByLang.indexOf(el) === pos
      })
    },
    // FILM
    filmLangSelect () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.sessions.map(el => {
          return el.film.RU.name
        })
      } else {
        return this.sessions.map(el => {
          return el.film.UA.name
        })
      }
    },
    filmWithoutDuplicates () {
      return this.filmLangSelect.filter((el, pos) => {
        return this.filmLangSelect.indexOf(el) === pos
      })
    },
    // DATE
    dateSelect () {
      return this.sessions.map(el => {
        return el.date
      })
    },
    dateWithoutDuplicates () {
      return this.dateSelect.filter((el, pos) => {
        return this.dateSelect.indexOf(el) === pos
      })
    },
    dateSort () {
      const res = [...this.dateWithoutDuplicates]
      return res.sort((a, b) => {
        return Number.parseInt(a.split('-').join('')) - Number.parseInt(b.split('-').join(''))
      })
    }
  },
  methods: {
    show () {
      console.log(this.selectHallsWithoutDuplicanes)
    }
  }
}
</script>
