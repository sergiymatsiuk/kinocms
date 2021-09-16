<template>
  <splide :options="options">
    <splide-slide
      v-for="(img, idx) in imgsToShow"
      :key="idx">
      <img :src="img">
    </splide-slide>
  </splide>
</template>

<script>
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

export default {
  props: {
    imgsToShow: {
      type: Array,
      required: true
    }
  },
  components: {
    Splide,
    SplideSlide
  },
  data () {
    return {
      options: {
        width: 'auto',
        rewind: true,
        autoWidth: true,
        type: 'loop',
        trimSpace: false,
        gap: '20px'
      }
    }
  }
}
</script>
