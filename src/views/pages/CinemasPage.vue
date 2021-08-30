<template>
  <form class="form-horizontal" >
    <div class="card-body border border-secondary m-4">
      <div class="form-group row">
        <div class="col-8 row">
          <label for="inputEmail3" class="col-3 col-form-label"><h6>{{ 'NameCinemas' | localize }}</h6></label>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="название"
              v-model="cinema.name"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-12 row">
          <label for="inputEmail3" class="col-2 col-form-label"><h6>{{ 'Address' | localize }}</h6></label>
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="адресс"
              v-model="cinema.address"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-8 row">
          <label for="inputEmail3" class="col-3 col-form-label"><h6>{{ 'Map' | localize }}</h6></label>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="Координаты для карты"
              v-model="cinema.map"
            />
          </div>
        </div>
      </div>
      <div class="form-group row">
          <div class="col-3">
              <h6>{{'MainImg' | localize}}</h6>
          </div>
          <div class="col-6 row">
            <div class=" d-flex ">
              <button class="btn-select" @click.prevent="selectLocalImg">
              <div v-if="localMainImg.length > 1">
                <img class="preview" height="100" width=200 :src="localMainImg" />
              </div>
              <div v-else style="height: 100px; width: 200px">
                <img src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
                  style="height: 100px; width: 200px">
              </div>
              </button>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change="saveLocalImg"
                accept="image/*"
                required
              />
              <button class="btn-lg btn-info align-self-center" @click.prevent="deleteLocalImg">{{'Delete' | localize}}</button>
            </div>
          </div>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cinema: this.item,

      localMainImg: this.item.logo,
      mainImg: null,
      mainImageData: null,

    }
  },
  methods: {
    selectLocalImg () {
      this.$refs.input1.click ()
    },
    saveLocalImg ( event ) {
      this.mainImg = null
      this.mainImageData = event.target.files[0]
      this.cinema.imgData = event.target.files[0]
      this.localMainImg = window.URL.createObjectURL (event.target.files[0])
      this.addCinemas()
    },
    deleteLocalImg () {
      this.mainImageData = null
      this.localMainImg = ''
      this.mainImg = ''
    },
    addCinemas() {
      console.log(this.cinema)
      this.$emit('changeCinemas', this.cinema)
    }
  }
}
</script>

<style scoped>
.btn-select {
  border: 0;
  padding: 0;
  margin-right: 50px;
}

.btn-lang {
  margin-right: 10px;
  margin-left: 50px;
}
</style>
