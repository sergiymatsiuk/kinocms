<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <router-view class="content-wrapper"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Sidebar, Navbar
  }
}
</script>
