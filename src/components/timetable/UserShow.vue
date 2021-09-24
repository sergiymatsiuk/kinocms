<template>
  <div class="session-show">
    <h2 class="session-show-header">{{ 'TimeTable' | localize }}</h2>
    <timetable-session
      :sessions="sessions"
      @delete-session="deleteSession"/>
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
    deleteSession (id) {
      this.$emit('delete-session', id)
    }
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
