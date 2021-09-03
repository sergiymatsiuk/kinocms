<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
/* eslint-disable */

import EmptyLayout from '@/layouts/EmptyLayout'
import AdminLayout from '@/layouts/AdminLayout'

export default {
  data () {
    return {
    }
  },
  components: {
    EmptyLayout, AdminLayout
  },
  computed: {
    layout  () {
      console.log(this.$route.meta)
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
