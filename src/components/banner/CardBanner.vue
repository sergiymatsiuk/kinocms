<template>
  <div>
    <form class="card mr-3 p-2 mt-2" style="width: 200px">
      <i class="position-absolute fa fa-window-close" @click="$emit('delete-card', card)"></i>
      <div class="d-flex mt-1">
        <label class="">
          <img
            v-if="card.img"
            class="card-img-top"
            :src="card.img"
            alt="Card image"
            style="width: 100%; height: 150px"
          />
          <img
            v-else
            class="card-img-top"
            src='https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'
            alt="Card image"
            style="width: 100%; height: 150px"
          />
          <input
            type="file"
            class="custom-file-input"
            accept="image/*"
            hidden
            @change="uploadImage"
          />
        </label>
      </div>
      <div class="d-flex mt-1">
        <label class="col-form-label">URL:</label>
        <input
          @input="$emit('change-films', card)"
          class="form-control"
          type="text"
          v-model="card.url"
        />
      </div>
      <div class="d-flex mt-1">
        <label for="inputText1" class="col-form-label">Текст:</label>
        <input
          @input="$emit('change-films', card)"
          type="text"
          class="form-control"
          v-model="card.title"
        />
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'CardBanner',
  props: {
    film: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      card: this.film
    }
  },
  methods: {
    uploadImage (event) {
      if(!this.card.imageData) {
        this.card.imageData = event.target.files[0]
        this.card.img = window.URL.createObjectURL(event.target.files[0])
      }
      this.$emit('change-films', this.card)
    }
  } 
}
</script>

<style scoped>
  i {
    top: -3%;
    left: 95%;
  }
</style>