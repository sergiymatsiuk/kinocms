<template>
  <div class="mt-2">
    <h6>{{ 'SoonSessions' | localize }}</h6>
    <div
      class="btn border border-dark my-1"
      style="width: 100%"
      v-for="(session, idx) in langFilterSessions"
      :key="idx"
      @click.prevent="showSession(session.id)">
      <span class="m-1">
        {{ session.film.name }}
      </span>
      <hr>
      <span class="m-1">
        {{ session.date }}
      </span>
      <hr>
      <span class="m-1">
        {{ session.time }}
      </span>
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
  methods: {
    showSession (id) {
      this.$router.push({ path: '/session/' + id })
    }
  },
  computed: {
    dateSort () {
      const res = [...this.sessions]
      return res.sort((a, b) => {
        return Number.parseInt(a.date.split('-').join('')) - Number.parseInt(b.date.split('-').join(''))
      })
    },
    langFilterSessions () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.dateSort.map(el => {
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
        return this.dateSort.map(el => {
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
  mounted () {
  }
}
</script>
