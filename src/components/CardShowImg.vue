<template>
  <div class="d-flex flex-column item">
    <label>
      <img
        class="preview"
        height="75"
        width="150"
        :src="localImgCard.img"/>
      <input
        type="file"
        ref="idx"
        style="display: none"
        accept="image/*"
        @change.prevent="addLocalImg"
      />
    </label>
    <button class="btn btn-info btn-delete" @click.prevent="deleteImgCard">{{'Delete' | localize}}</button>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  
  data () {
    return {
      localImgCard: this.card
    }
  },

  methods: {
    deleteImgCard () {
      this.localImgCard.imgData = null
      this.localImgCard.img = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
      this.$emit('delete-local-img-card', this.localImgCard)
    },

    addLocalImg (event) {
      if (!event) return
      this.localImgCard.imgData = event.target.files[0]
      this.localImgCard.img = window.URL.createObjectURL(event.target.files[0])
      this.$emit('change-local-img-card', this.localImgCard)
    }
  }
}
</script>
