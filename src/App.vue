<template>
  <div id="app" class="wrapper">

    <Navbar />

    <Sidebar />

    <router-view class="content-wrapper"/>

  </div>
</template>

<script>
/* eslint-disable */
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Loader from '@/components/Loader'

export default {
  data () {
    return {
    }
  },
  components: {
    Sidebar, Navbar, Loader
  }
}
</script>

<style lang="scss" scoped>
  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
