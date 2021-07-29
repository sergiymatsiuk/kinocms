<template>
  <div class="content">
    <div class="d-flex justify-content-between p-3 flex-column">
      <div class="align-self-center mb-3">
        <h2>На главной верх</h2>
      </div>
      <div class="d-flex justify-content-between">
        <ul class="d-flex flex-row flex-wrap">
          <li
            v-for="(card, idx) in cards"
            :key="idx"
            class="card mr-1"
            style="width: 200px;">
            <img
              v-if="imageData != null"
              class="card-img-top"
              src="https://blog.allo.ua/wp-content/uploads/2019/08/Matritsa-4-1.jpg"
              alt="Card image cap"
              style="width: 200px; height: 100px">
            <img
              v-else
              class="card-img-top"
              src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
              alt="Card image cap"
              style="width: 200px; height: 100px">
          <div class="card-body d-flex flex-column position-relative">
            <i class="nav-icon fas fa-cog position-absolute top-50 start-50" @click="deleteCard(idx)"></i>
            <button class="btn btn-info" @click="clickOnCard(idx)">Добавить</button>
            <input
              type="file"
              ref="input11"
              style="display: none"
              @click="previewImage"
              accept="image/*"
            />
            <div class="d-flex mt-1">
              <label for="inputURL" class="col-form-label">URL:</label>
              <input
                type="text"
                class="form-control"
                id="inputURL"
                placeholder="URL"
              />
            </div>
            <div class="d-flex mt-1">
              <label for="inputText" class="col-form-label">Текст:</label>
              <input
                type="text"
                class="form-control"
                id="inpuText"
                placeholder="текст"
              />
            </div>
          </div>
          </li>
        </ul>
        <div class="d-flex ">
          <button class="btn-lg btn-info align-self-center"  @click="addCard">Добавить фото</button>
        </div>
      </div>
      <div class="d-flex align-self-center mt-3">
        <button class="btn-lg btn-info">Сохранить</button>
      </div>
    </div>
    <div class="d-flex justify-content-between p-3 flex-column">
      <div class="align-self-center">
        <h2> Сквозной банер на заднем фоне</h2>
      </div>
      <div class="d-flex justify-content-between">
        <div class="">
          <div
            class="card mr-1"
            style="width: 200px;">
              <div v-if="banner.imageData != null" style="width: 200px; height: 100px; background-color">
                <img
                  class="card-img-top"
                  :src="this.banner.img"
                  alt="Card image cap"
                  style="width: 200px; height: 100px">
              </div>
              <div v-else >
                <img
                  class="card-img-top"
                  src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
                  alt="Card image cap"
                  style="width: 200px; height: 100px">
              </div>
            <div class="card-body d-flex flex-column">
              <button class="btn btn-info" @click.prevent="clickChooseBanner">Добавить</button>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change.prevent="previewImageBanner"
                accept="image/*"
              />
              <button class="btn btn-info mt-1" @click="deleteBanner">Удалить</button>
              <button class="btn btn-info mt-1" @click="addBannerToDatabase">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex">

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fs, rtdb } from '../main'

export default {
  data () {
    return {
      cards: [
        {
          img: '',
          imageData: null,
          url: '',
          title: ''
        }
      ],
      caption : '',
      img1: '',
      imageData: null,
      banner: {
        name: 'main banner',
        img: '',
        imageData: null
      }
    }
  },
  methods: {
    addCard () {
      if(this.cards.length === 4) return
      this.cards.push(this.cards[0])
      console.log(this.cards[0])
    },
    deleteCard (idx) {
      if(this.cards.length === 1) return
      this.cards.splice(idx, 1)
      console.log(idx)
    },

    clickOnCard (idx) {
      console.log(idx)
      this.$refs.input11.click() 
    },

    previewImage(event) {
      console.log(9)
      let imageData = event.target.files[0];
    },

    clickChooseBanner() {
      this.$refs.input1.click()
    },
    previewImageBanner(event) {
      this.banner.img=null;
      this.banner.imageData = event.target.files[0];
      this.loadBanner()
    },
    loadBanner(){
      this.img1=null;
      const storageRef=fs.ref(`${this.banner.imageData.name}`).put(this.banner.imageData);
      storageRef.on(
        error=>{console.log(error.message)},
        ()=>{storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.banner.img = url;
          });
        }      
      );
    },
    deleteBanner () {
      this.banner.imageData = null
    },
    addBannerToDatabase () {
      const urlBanner = {
        url: this.banner.img
      }
      rtdb.ref('Banner/'+this.banner.name).set(urlBanner)
      this.banner.imageData = null
      console.log('Banner save!')
    }
  }
}
</script>

<style lang="css" scoped>
  ul {
    padding-inline-start: 0;
    margin-bottom:0;
  }
  ul .card {
    margin-bottom: 0;
  }
  i {
    top: -67%;
    right: -2%;
  }
</style>
