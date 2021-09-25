<template>
  <div class="place-container">
    <div
      class="hall"
      v-for="(row, idx) in hallPlaces"
      :key="idx">
        <div
          class="row"
          v-for="(place, num) in row"
          :key="num"
          >
            <p class="place" :class="{busy: hallPlaces[idx][num]}" @click.prevent="showPlace(idx, num)">{{num+1}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    places: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      hallPlaces: this.places
    }
  },
  computed: {
    showPlaces () {
      console.log(this.hallPlaces)
      return this.hallPlaces
    }
  },
  methods: {
    showPlace (idx, num) {
      if (this.hallPlaces[idx][num] === 1) {
        this.hallPlaces[idx][num] = 0
      } else {
        this.hallPlaces[idx][num] = 1
      }
      const newArr = [...this.hallPlaces]
      this.hallPlaces = newArr
      this.$emit('change-places', newArr)
    }
  }
}
</script>

<style scoped>
  .place-container {
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .hall {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .place {
    text-align: center;
    font-weight: 500;
    padding-top: 5px;
    width: 40px;
    height: 40px;
    margin: 10px;
    background-color: orange;
  }
  .busy {
    background-color: grey;
  }
</style>
