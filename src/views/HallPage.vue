<template>
  <div class="">
    <Loader v-if="loading" />
    <div v-else>
      <div style="height: 300px">
        <img :src="showHall.bannerImg"
        alt="egesg"
        style="width: 100%; height: 100%; object-fit: cover; object-position: center">
      </div>
      <div class="row m-5">
        <div class="col-2">
          <div class="rounded d-flex align-items-center justify-content-center mb-4" style="height: 350px; background-color: #D3D3D3">
            <h3>Реклама</h3>
          </div>
          <user-cinema-sessions-table
            :sessions="showSessions"/>
        </div>
        <div class="col-10">
          <div class="mt-4 row justify-content-center">
            <div class="d-flex align-items-center justify-content-center mx-5">
              <h2>{{showHall.name}}</h2>
            </div>
          </div>
          <div class="mt-4">
            <h3 class="mx-auto mb-2 text-center">{{ 'Description' | localize }}</h3>
            <p class="text-center">{{ showHall.description }}</p>
          </div>
          <div class="mt-4">
            <h3 class="mx-auto mb-2 text-center">{{ 'MapHall' | localize }}</h3>
            <div>
              <img :src="showHall.mainImg"
              :alt="showHall.name"
              style="width: 100%; height: 100%; object-fit: cover; object-position: center">
            </div>
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
import Module from '@/module/module'
import UserCinemaSessionsTable from '@/components/cinema/UserCinemaSessionsTable'

export default {
  components: {
    Loader,
    UserSlider,
    UserCinemaSessionsTable
  },
  data () {
    return {
      loading: true,
      hall: {},
      sessions: []
    }
  },
  computed: {
    showHall () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.hall.RU
      } else {
        return this.hall.UA
      }
    },
    showSessions () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.sessions.filter(el => {
          return el.hall.RU.name === this.showHall.name
        })
      } else {
        return this.sessions.filter(el => {
          return el.hall.UA.name === this.showHall.name
        })
      }
    },
    imgsToShow () {
      return this.showHall.localImgArr
    },
    halls () {
      return this.showHall.halls
    }
  },
  methods: {
    async selectHall (hallId) {
      const selectHall = await Module.fetchInfoHallsById('Halls', hallId, this.cinema.id)
      this.$store.dispatch('addHallInfo', selectHall)
      console.log(selectHall)
    }
  },
  async mounted () {
    if (Object.keys(this.$store.getters.hallInfo).length === 0) {
      const hall = JSON.parse(localStorage.getItem('lastHall'))
      this.$store.dispatch('addHallInfo', hall)
      this.hall = this.$store.getters.hallInfo
    } else {
      this.hall = this.$store.getters.hallInfo
    }
    this.sessions = await Module.fetchInfo('Timetable')
    this.loading = false
  }
}
</script>
