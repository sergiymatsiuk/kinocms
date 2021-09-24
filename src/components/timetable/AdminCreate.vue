<template>
  <div class="timetable-create">
    <div class="form-group">
      <label>{{ 'Film' | localize}}</label>
      <select
        class="form-control"
        v-model="selectFilm">
        <option
          v-for="(film, idx) in showFilms"
          :key="idx"
          :value="film"
          >{{film.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label>{{ 'Cinema' | localize}}</label>
      <select
        class="form-control"
        v-model="selectCinema">
        <option
          v-for="(cinema, idx) in showCinemas"
          :key="idx"
          :value="cinema"
          >{{cinema.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label>{{ 'Hall' | localize}}</label>
      <select
        class="form-control"
        :disabled="!selectCinema"
        v-model="selectHall">
        <option
          v-for="(hall, idx) in showHalls"
          :key="idx"
          :value="hall"
          >{{hall.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="">{{'DateTimetable' | localize}}</label>
      <div class="date">
          <input type="date" class="form-control datetimepicker-input" v-model="date"/>
      </div>
    </div>
    <div class="form-group">
      <label>{{ 'Time' | localize }}</label>
      <div class="input-group date" id="timepicker" data-target-input="nearest">
        <input type="time" class="form-control datetimepicker-input" data-target="#timepicker" v-model="time"/>
      </div>
    </div>
    <div class="form-group">
      <label for="inputEmail3" class="">{{ 'Price' | localize }}</label>
      <div class="">
        <input
          type="text"
          class="form-control"
          id="inputEmail3"
          placeholder="price"
          v-model.number="price"
        />
      </div>
    </div>
    <div class="footer-btn">
      <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addNewSession">{{'Save' | localize}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cinemas: {
      type: Array,
      required: true
    },
    films: {
      type: Array,
      required: true
    },
    halls: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectFilm: '',
      selectCinema: '',
      selectHall: '',
      time: '',
      date: '',
      price: ''
    }
  },
  computed: {
    showFilms () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.films.map(el => {
          return { ...el.RU, id: el.id }
        })
      } else {
        return this.films.map(el => {
          return { ...el.UA, id: el.id }
        })
      }
    },
    showCinemas () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.cinemas.map(el => {
          return { ...el.RU, id: el.id }
        })
      } else {
        return this.cinemas.map(el => {
          return { ...el.UA, id: el.id }
        })
      }
    },
    //
    selectHalls () {
      if (this.selectCinema) {
        return this.halls.filter(el => {
          return el.id === this.selectCinema.id
        })
      } else {
        return []
      }
    },
    changeHalls () {
      const arr = this.selectHalls[0]
      if (!arr) {
        return []
      } else {
        return Object.keys(arr).map(el => {
          if (el === 'id') {
            return {}
          } else {
            return { ...arr[el], id: el }
          }
        })
      }
    },
    filterHalls () {
      return this.changeHalls.filter(el => {
        return Object.keys(el).length !== 0
      })
    },
    showHalls () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.filterHalls.map(el => {
          return { ...el.RU, id: el.id }
        })
      } else {
        return this.filterHalls.map(el => {
          return { ...el.UA, id: el.id }
        })
      }
    }
  },
  methods: {
    addNewSession () {
      const newSession = {
        selectFilm: this.selectFilm,
        selectCinema: this.selectCinema,
        selectHall: this.selectHall,
        time: this.time,
        date: this.date,
        price: this.price
      }
      this.$emit('add-new-session', newSession)
      this.selectFilm = ''
      this.selectCinema = ''
      this.selectHall = ''
      this.time = ''
      this.date = ''
      this.price = ''
    }
  },
  watch: {
    showCinemas () {
      this.selectCinema = ''
    }
  },
  mounted () {
    this.lang = this.$store.getters.info.locale
  }
}
</script>

<style scoped>
  .timetable-create {
    margin: 50px;
    margin-top: 0;
  }
  .footer-btn {
    display: flex;
    justify-content: center;
  }
</style>
