<template>
  <div id="app" class="wrapper">

    <Navbar />

    <Sidebar />

    <router-view class="content-wrapper"/>

  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default {
  data () {
    return {
    }
  },
  components: {
    Sidebar, Navbar
  }
}
</script>

<style lang="scss">
  .content-wrapper {
    background-color: white;
  }

  @import '~admin-lte/dist/css/adminlte.min.css';
</style>
