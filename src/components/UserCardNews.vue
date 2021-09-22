<template>
  <div
    class="m-3 text-center d-flex flex-wrap"
    style="width: 45%">
    <img class="card-img-top" :src="showItem.mainImg" style="height: 300px">
    <h2 class="my-3">{{showItem.name}}</h2>
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
  },
  mounted () {
  }
}
</script>
