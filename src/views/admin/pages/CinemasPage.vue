<template>
  <form class="form-horizontal" >
    <div class="card-body border border-secondary m-2">
      <div class="form-group row">
        <div class="col-8 row">
          <label for="inputEmail3" class="col-3 col-form-label"><h6>{{ 'NameCinemas' | localize }}</h6></label>
          <div class="col-9">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="название"
              v-model="showItem.name"
              @input="addCinemas"
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
              v-model="showItem.address"
              @input="addCinemas"
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
              v-model="showItem.map"
              @input="addCinemas"
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
              <div v-if="showItem.logo.length > 1">
                <img class="preview" height="100" width=200 :src="showItem.logo" />
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
import Module from '@/module/module'
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
      localMainImg: this.item.logo,
      mainImageData: null,
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
    selectLocalImg () {
      this.$refs.input1.click ()
    },
    async saveLocalImg (event) {
      this.mainImageData = event.target.files[0]
      this.showItem.logo = await Module.addCinemaLogo(this.item.id, this.mainImageData)
      console.log(this.showItem.logo)
      this.addCinemas()
    },
    deleteLocalImg () {
      this.mainImageData = null
      this.showItem.logo = ''
      this.addCinemas()
    },
    addCinemas() {
      this.$emit('changeCinemas', this.item)
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
