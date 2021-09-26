<template>
  <div class="row m-3">
    <div class="col-6 map-container">
      <h2 class="text-center">{{showInfo.name}}</h2>
      <img :src="showInfo.logo" :alt="showInfo.name" style="width: 100%; height: 100%">
    </div>
    <div class="col-6">
      <p class="text-center m-3">{{showInfo.address}}</p>
      <google-map
        :contacts="mapInfo"/>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue'
export default {
  components: {
    GoogleMap
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    showInfo () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.item.RU
      } else {
        return this.item.UA
      }
    },
    mapInfo () {
      const mapArr = this.showInfo.map.split(', ')
      console.log(mapArr)
      return { lat: Number(mapArr[0]), lng: Number(mapArr[1]) }
    }
  },
  mounted () {
    console.log(this.item)
  }
}
</script>

<style scoped>
  .map {
    margin: 0 auto;
  }
  .map-container {
    height: 300px;
  }
</style>
