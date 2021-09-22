<template>
  <div class="main-banner">
    <h2 class="main-banner-haeder">{{ 'NewsAnd' | localize }}</h2>
    <user-slider
      :imgsToShow="banners"/>
  </div>
</template>

<script>
import UserSlider from '@/components/poster/UserSlider'

export default {
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  components: {
    UserSlider
  }
}
</script>

<style scoped>
  .main-banner {
    min-height: 150px;
    margin: 50px 0;
  }
  .main-banner-haeder {
    margin-bottom: 20px;
    text-align: center;
  }
</style>
