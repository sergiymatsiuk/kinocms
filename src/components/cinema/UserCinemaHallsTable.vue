<template>
  <div class="">
    <h6>{{ 'NumberHalls' | localize }}{{halls.length}}</h6>
    <div
      class="btn border border-dark my-1"
      style="width: 100%"
      v-for="(hall, idx) in halls"
      :key="idx"
      @click.prevent="clickToHall(hall.id)">
      <span class="m-2">
        {{ hall.name }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    halls: {
      type: Array,
      required: true
    }
  },
  methods: {
    clickToHall (id) {
      this.$emit('select-hall', id)
    }
  },
  mounted () {
    console.log(this.halls)
  }
}
</script>
