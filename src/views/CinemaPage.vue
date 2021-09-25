<template>
  <div class="">
    <Loader v-if="loading" />
    <div v-else>
      <div style="height: 300px">
        <img :src="showCinema.bannerImg"
        alt="egesg"
        style="width: 100%; height: 100%; object-fit: cover; object-position: center">
      </div>
      <div class="row m-5">
        <div class="col-2">
          <div class="rounded d-flex align-items-center justify-content-center mb-4" style="height: 350px; background-color: #D3D3D3">
            <h3>Реклама</h3>
          </div>
          <UserCinemaHallsTable
            :halls="showHalls"
            @select-hall="selectHall"/>
          <user-cinema-sessions-table
            :sessions="showSessions"/>
        </div>
        <div class="col-10">
          <div class="mt-4 row justify-content-start">
            <div class="d-flex align-items-center justify-content-center mx-5">
              <h2>{{showCinema.name}}</h2>
            </div>
            <div class="mx-5">
              <img class="rounded-circle" :src="showCinema.mainImg" :alt="showCinema.name" style="height: 100px">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <router-link to="/timetable" type="button" class="btn btn-info px-5">{{ 'SessionSchedule' | localize}}</router-link>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mx-auto mb-2 text-center">{{ 'Description' | localize }}</h3>
            <p class="text-center">{{ showCinema.description }}</p>
          </div>
          <div class="mt-4">
            <h3 class="mx-auto mb-2 text-center">{{ 'Conditions' | localize }}</h3>
            <p class="text-center">{{ showCinema.conditions }}</p>
          </div>
          <div class="mt-4">
            <h3 class="mx-auto mb-2 text-center">ФОТОГАЛЕРЕЯ</h3>
            <UserSlider
              class="mx-auto"
              :imgsToShow="imgsToShow"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import UserSlider from '@/components/poster/UserSlider'
import UserCinemaHallsTable from '@/components/cinema/UserCinemaHallsTable'
import UserCinemaSessionsTable from '@/components/cinema/UserCinemaSessionsTable'
import Module from '@/module/module'

export default {
  components: {
    Loader,
    UserSlider,
    UserCinemaHallsTable,
    UserCinemaSessionsTable
  },
  data () {
    return {
      loading: true,
      cinema: {},
      halls: {},
      sessions: []
    }
  },
  computed: {
    showCinema () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.cinema.RU
      } else {
        return this.cinema.UA
      }
    },
    imgsToShow () {
      return this.showCinema.localImgArr
    },
    showHalls () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.halls.reduce((acc, el) => {
          const res = { ...el.RU, id: el.id }
          acc.push(res)
          return acc
        }, [])
      } else {
        return this.halls.reduce((acc, el) => {
          const res = { ...el.UA, id: el.id }
          acc.push(res)
          return acc
        }, [])
      }
    },
    showSessions () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.sessions.filter(el => {
          return el.cinema.RU.name === this.showCinema.name
        })
      } else {
        return this.sessions.filter(el => {
          return el.cinema.UA.name === this.showCinema.name
        })
      }
    }
  },
  methods: {
    async selectHall (hallId) {
      console.log(this.cinema)
      const selectHall = await Module.fetchInfoHallsById('Halls', hallId, this.cinema.id)
      this.$store.dispatch('addHallInfo', selectHall)
      this.$router.push({ path: `/cinema/hall/${hallId}` })
    }
  },
  async mounted () {
    if (Object.keys(this.$store.getters.cinemaInfo).length === 0) {
      const cinema = JSON.parse(localStorage.getItem('lastCinema'))
      this.$store.dispatch('addCinemaInfo', cinema)
      this.cinema = this.$store.getters.cinemaInfo
    } else {
      this.cinema = this.$store.getters.cinemaInfo
    }
    this.halls = await Module.fetchHallsById('Halls', this.cinema.id)
    this.sessions = await Module.fetchInfo('Timetable')
    this.loading = false
  }
}
</script>
