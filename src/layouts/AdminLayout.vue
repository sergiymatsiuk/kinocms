<template>
  <div>
    <Loader v-if="loading" />
    <div class="wrapper" v-else>
      <Navbar />
      <Sidebar />
      <router-view class="content-wrapper"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Loader from '../components/Loader.vue'

export default {
  components: {
    Sidebar, Navbar, Loader
  },
  data () {
    return {
      loading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchUserInfo')
    this.loading = false
  }
}
</script>
