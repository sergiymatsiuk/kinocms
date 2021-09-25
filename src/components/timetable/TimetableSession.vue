<template>
  <div class="card-body p-0 ml-2">
    <table class="table">
      <thead>
        <tr>
          <th>{{ 'DateTimetable' | localize }}</th>
          <th>{{ 'Time' | localize }}</th>
          <th>{{ 'Film' | localize }}</th>
          <th>{{ 'Cinema' | localize }}</th>
          <th>{{ 'Hall' | localize }}</th>
          <th>{{ 'Price' | localize }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="session in langSortSessions" :key="session.id">
          <td>{{session.date}}</td>
          <td>{{session.time}}</td>
          <td>{{session.film.name}}</td>
          <td>{{session.cinema.name}}</td>
          <td>{{session.hall.name}}</td>
          <td>{{session.price}}</td>
          <td>
            <button class="btn btn-info" @click.prevent="toBook(session.id)">{{ 'Book' | localize }}</button>
          </td>
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
            hall: el.hall.RU,
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
            hall: el.hall.UA,
            film: el.film.UA,
            date: el.date,
            time: el.time,
            price: el.price
          }
        })
      }
    }
  },
  methods: {
    toBook (id) {
      this.$router.push({ path: '/session/' + id })
    }
  },
  mounted () {
    console.log(this.sessions)
  }
}
</script>
