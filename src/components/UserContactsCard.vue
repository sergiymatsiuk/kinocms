<template>
  <div class="row m-3">
    <div class="col-6">
      <h2 class="text-center">{{showInfo.name}}</h2>
      <img :src="showInfo.logo" :alt="showInfo.name" style="width: 100%">
    </div>
    <div class="col-6">
      <p class="text-center m-3">{{showInfo.address}}</p>
      <iframe
      class="map"
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d547.7481523010212!2d26.25160755445103!3d50.62025916897263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1632329488485!5m2!1suk!2sua"
      style="border:0; width: 100%; height: 80%"
      allowfullscreen=""
      loading="lazy"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
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
    }
  }
}
</script>

<style scoped>
  .map {
    margin: 0 auto;
  }
</style>
