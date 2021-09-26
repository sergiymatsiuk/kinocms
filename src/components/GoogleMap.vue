<template>
  <div>
    <GmapMap
      :center='contacts'
      :zoom='15'
      style='width:100%;  height: 280px;'
      />
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: {
    contacts: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>
