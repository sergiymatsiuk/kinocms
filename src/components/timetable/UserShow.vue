<template>
  <div class="session-show rounded">
    <h2 class="session-show-header">{{ 'TimeTable' | localize }}</h2>
    <timetable-session
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
</style>
