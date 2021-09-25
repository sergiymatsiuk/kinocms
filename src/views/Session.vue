<template>
  <div class="custom-container">
    <loader v-if="loading"/>
    <div class="session-container" v-else>
      <div class="col-2">
        <img
          class="session-img"
          :src="langFilterSession.film.mainImg"
          :alt="langFilterSession.film.name">
        <div class="rounded d-flex align-items-center justify-content-center" style="height: 350px; background-color: #D3D3D3">
          <h3>Реклама</h3>
        </div>
      </div>
      <div class="col-10">
        <div class="m-3">
          <h2 class="session-title">{{langFilterSession.film.name}}</h2>
          <p class="session-time">{{langFilterSession.date}}, {{langFilterSession.time}}, {{langFilterSession.hall.name}}</p>
          <p class="session-price">{{ 'Price' | localize }}:
            <span class="session-price-span">{{langFilterSession.price}} грн.</span>
          </p>
        </div>
        <session-show-place
          :session="langFilterSession"
          @change-session="saveNewSession"/>
      </div>
    </div>
  </div>
</template>

<script>
import Module from '@/module/module'
import Loader from '@/components/Loader'
import SessionShowPlace from '@/components/session/SessionShowPlace'

export default {
  components: {
    Loader,
    SessionShowPlace
  },
  data () {
    return {
      loading: true,
      session: {}
    }
  },
  computed: {
    langFilterSession () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return {
          id: this.session.id,
          cinema: this.session.cinema.RU,
          hall: this.session.hall.RU,
          film: this.session.film.RU,
          date: this.session.date,
          time: this.session.time,
          price: this.session.price,
          places: this.session.places
        }
      } else {
        return {
          id: this.session.id,
          cinema: this.session.cinema.UA,
          hall: this.session.hall.UA,
          film: this.session.film.UA,
          date: this.session.date,
          time: this.session.time,
          price: this.session.price,
          places: this.session.places
        }
      }
    }
  },
  methods: {
    async saveNewSession (session) {
      this.loading = true
      this.session.places = session.places
      await Module.updateSession(session.id, this.session)
      this.session = await Module.fetchInfoById('Timetable', this.id)
      this.loading = false
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    this.session = await Module.fetchInfoById('Timetable', this.id)
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    margin: 50px;
    padding: 10px;
    background-color: #fff;
  }
  .session-container {
    display: flex;
    flex-direction: row;
  }
  .session-img {
    width: 100%;
    padding-bottom: 20px;
  }
  .session-title {
    text-transform: uppercase;
  }
  .session-price {
    font-weight: 700;
  }
  .session-price-span {
    padding: 5px;
    width: 20px;
    height: 20px;
    background-color: gold;
    color: #fff;
  }
</style>
