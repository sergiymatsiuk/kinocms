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
      filterDate: ''
    }
  },
  watch: {
    filterPrice () {
      this.$emit('change-price', this.filterPrice)
    },
    filterCinema () {
      this.$emit('change-cinema', this.filterCinema)
    },
    filterFilm () {
      this.$emit('change-film', this.filterFilm)
    },
    filterDate () {
      this.$emit('change-date', this.filterDate)
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
  }
}
</script>
