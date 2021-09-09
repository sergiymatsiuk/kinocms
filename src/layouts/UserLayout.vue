<template>
  <div>
    <Loader v-if="loading"/>
    <div class="wrapper" v-else>
      <NavbarUser
        :nickname="nickname"/>
      <router-view />
      <FooterUser />
    </div>
  </div>
</template>

<script>
import NavbarUser from '@/components/NavbarUser'
import FooterUser from '@/components/FooterUser'
import Loader from '@/components/Loader'

export default {
  components: {
    NavbarUser, FooterUser, Loader
  },
  data () {
    return {
      loading: true
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
    this.loading = false
  }
}
</script>
