<template>
  <div>
    <Loader v-if="loading"/>
    <div class="wrapper" v-else>
      <NavbarUser
        :nickname="nickname"/>
      <router-view />
      <FooterUser />
      <div
        class="custom"
        :style="{ 'background-image': 'url(' + image + ')'}">
      </div>
    </div>
  </div>
</template>

<script>
import NavbarUser from '@/components/NavbarUser'
import FooterUser from '@/components/FooterUser'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    NavbarUser, FooterUser, Loader
  },
  data () {
    return {
      loading: true,
      image: ''
    }
  },
  computed: {
    nickname () {
      if (Object.keys(this.$store.getters.userInfo).length !== 0) {
        return this.$store.getters.userInfo.nickname
      } else {
        return ''
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('fetchUserInfo')
    this.image = await Module.fetchBackImage()
    this.loading = false
  }
}
</script>

<style scoped>
  .custom {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    opacity: 0.4;
    width: 100%;
    height: 100vh;
  }
</style>
