<template>
  <div class="wrapper">
    <NavbarUser />
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
  }
}
</script>
