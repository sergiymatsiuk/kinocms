<template>
      <nav class="main-header navbar navbar-expand navbar-dark navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/user-page" class="nav-link" role="button">
          <i class="nav-icon fas fa-user"></i>
          {{ nickname }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    nickname () {
      return this.$store.getters.userInfo.nickname
    }
  }
}
</script>
