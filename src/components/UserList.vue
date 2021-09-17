<template>
  <div class="d-flex row justify-content-center">
    <user-card-show
      v-for="(item, idx) in items"
      :key="idx"
      :item="item"
      @to-detaile="toDetaile"/>
  </div>
</template>

<script>
import UserCardShow from './UserCardShow.vue'

export default {
  components: {
    UserCardShow
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    toDetaile (item) {
      this.$router.push({ path: `/action-page/${item.id}` })
    }
  }
}
</script>
