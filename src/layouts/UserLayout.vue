<template>
  <div class="wrapper">
    <NavbarUser
      :nickname="nickname"/>
    <router-view />
    <FooterUser />
  </div>
</template>

<script>
import NavbarUser from '@/components/NavbarUser'
import FooterUser from '@/components/FooterUser'

export default {
  components: {
    NavbarUser, FooterUser
  },
  data () {
    return {
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
    await this.$store.dispatch('fetchInfo')
  }
}
</script>
