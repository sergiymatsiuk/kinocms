<template>
  <div
    class="m-3 text-center"
    style="width: 45%; height: 300px"
    @click.prevent="clickToItem">
    <img class="card-img-top" :src="showItem.mainImg" style="height: 100%">
    <h2 class="mx-2">{{showItem.name}}</h2>
    <p>{{showItem.description}}</p>
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
    showItem () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.item.RU
      } else {
        return this.item.UA
      }
    }
  },
  methods: {
    clickToItem () {
      this.$emit('to-detaile', this.item)
    }
  },
  mounted () {
  }
}
</script>
