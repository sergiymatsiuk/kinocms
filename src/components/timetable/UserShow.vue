<template>
  <div class="session-show rounded">
    <h2 class="session-show-header">{{ 'TimeTable' | localize }}</h2>
    <h4 class="session-show-no-films" v-if="sessions.length === 0">{{ 'NoFilms' | localize}}</h4>
    <timetable-session
      v-else
      :sessions="sessions"/>
  </div>
</template>

<script>
import TimetableSession from '@/components/timetable/TimetableSession'

export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  components: {
    TimetableSession
  },
  methods: {
  }
}
</script>

<style scoped>
  .session-show {
    margin: 50px 0;
  }
  .session-show-header {
    width: 100%;
    text-align: center;
  }
  .session-show-no-films {
    margin-top: 50px;
    padding-bottom: 50px;
    text-align: center;
  }
</style>
