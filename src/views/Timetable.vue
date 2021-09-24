<template>
  <div class="custom-container">
    <loader v-if="loading"/>
    <div class="" v-else>
      <user-show
        :sessions="sessions"
        @delete-session="deleteSession"/>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Module from '@/module/module'
import UserShow from '@/components/timetable/UserShow'

export default {
  components: {
    Loader,
    UserShow
  },
  data () {
    return {
      loading: true,
      sessions: []
    }
  },
  methods: {
  },
  async mounted () {
    this.sessions = await Module.fetchInfo('Timetable')
    this.loading = false
  }
}
</script>

<style scoped>
  .custom-container {
    margin: 0 auto;
    max-width: 1000px;
    background-color: #fff;
  }
</style>
