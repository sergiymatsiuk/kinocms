<template>
  <div class="card-body p-0 mr-5 ml-5">
    <table class="table">
      <thead>
        <tr>
          <th>{{ 'DateTimetable' | localize }}</th>
          <th>{{ 'Time' | localize }}</th>
          <th>{{ 'Film' | localize }}</th>
          <th>{{ 'Cinema' | localize }}</th>
          <th>{{ 'Price' | localize }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in showSessions" :key="session.id">
          <td>{{session.date}}</td>
          <td>{{session.time}}</td>
          <td>{{session.film.name}}</td>
          <td>{{session.cinema.name}}</td>
          <td>{{session.price}}</td>
        </tr>
      </tbody>
    </table>
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
  computed: {
    langSortSessions () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.sessions.map(el => {
          return {
            id: el.id,
            cinema: el.cinema.RU,
            film: el.film.RU,
            date: el.date,
            time: el.time,
            price: el.price
          }
        })
      } else {
        return this.sessions.map(el => {
          return {
            id: el.id,
            cinema: el.cinema.UA,
            film: el.film.UA,
            date: el.date,
            time: el.time,
            price: el.price
          }
        })
      }
    },
    dateSortSessions () {
      return this.langSortSessions
    },
    showSessions () {
      return this.dateSortSessions
    }
  }
}
</script>
