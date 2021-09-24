<template>
  <div class="card">
    <loader v-if="loading"/>
    <div class="" v-else>
      <div class="d-flex flex-row-reverse">
        <lang-toggle class="mt-5 mr-5"/>
      </div>
      <admin-create
        :cinemas="cinemas"
        :films="films"
        :halls="halls"
        @add-new-session="addSession"/>
      <admin-show
        :sessions="sessions"
        @delete-session="deleteSession"/>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Module from '@/module/module'
import AdminCreate from '@/components/timetable/AdminCreate'
import AdminShow from '@/components/timetable/AdminShow'
import LangToggle from '@/components/LangToggle'

export default {
  components: {
    Loader,
    AdminCreate,
    LangToggle,
    AdminShow
  },
  data () {
    return {
      loading: true,
      cinemas: [],
      films: [],
      halls: [],
      sessions: []
    }
  },
  methods: {
    async addSession (item) {
      const cinema = await Module.fetchInfoById('Cinemas', item.selectCinema.id)
      const film = await Module.fetchInfoById('Films', item.selectFilm.id)
      const newSession = {
        film,
        cinema,
        date: item.date,
        time: item.time,
        price: item.price,
        places: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      }
      await Module.addNewSession(newSession)
      this.sessions = await Module.fetchInfo('Timetable')
    },
    async deleteSession (id) {
      await Module.deleteSession(id)
      this.sessions = await Module.fetchInfo('Timetable')
    }
  },
  async mounted () {
    this.cinemas = await Module.fetchInfo('Cinemas')
    this.films = await Module.fetchInfo('Films')
    this.halls = await Module.fetchInfo('Halls')
    this.sessions = await Module.fetchInfo('Timetable')
    console.log(this.sessions)
    this.loading = false
  }
}
</script>
