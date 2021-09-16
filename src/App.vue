<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>

<script>
/* eslint-disable */

import EmptyLayout from '@/layouts/EmptyLayout'
import AdminLayout from '@/layouts/AdminLayout'
import UserLayout from '@/layouts/UserLayout'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    EmptyLayout, AdminLayout, UserLayout
  },
  computed: {
    layout () {
      console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    ...mapGetters({
      cinemaInfo: 'cinemaInfo',
      hallInfo: 'hallInfo',
      })
  },
  watch: {
    cinemaInfo () {
      const lastCinema = JSON.stringify(this.cinemaInfo)
      localStorage.setItem('lastCinema', lastCinema)
    },
    hallInfo () {
      const lastHall = JSON.stringify(this.hallInfo)
      localStorage.setItem('lastHall', lastHall)
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
