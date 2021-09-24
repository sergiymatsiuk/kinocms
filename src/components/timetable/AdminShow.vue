<template>
  <div class="session-show">
    <h2 class="session-show-header">{{ 'TimeTable' | localize }}</h2>
    <admin-timetable-session
      :sessions="sessions"
      @delete-session="deleteSession"/>
  </div>
</template>

<script>
import AdminTimetableSession from '@/components/timetable/AdminTimetableSession'

export default {
  props: {
    sessions: {
      type: Array,
      required: true
    }
  },
  components: {
    AdminTimetableSession
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
    margin: 50px;
  }
  .session-show-header {
    width: 100%;
    text-align: center;
  }
</style>
