<template>
  <div class="d-flex justify-content-between p-3 flex-column">
    <div class="align-self-center">
      <h2>Сквозной банер на заднем фоне</h2>
    </div>
    <div class="d-flex justify-content-between">
      <div class="">
        <div class="card mr-1" style="width: 200px">
          <button class="img-btn" @click.prevent="clickChooseBanner">
            <div
              v-if="localImg.length>1"
              style="width: 200px; height: 150px;"
            >
              <img
                class="card-img-top"
                :src="this.localImg"
                alt="Card image cap"
                style="width: 200px; height: 150px"
              />
            </div>
            <div v-else>
              <img
                class="card-img-top"
                :src="mainImg"
                alt="Card image cap"
                style="width: 200px; height: 150px"
              />
            </div>
          </button>
          <div class="card-body d-flex flex-column">
            <input
              type="file"
              ref="input1"
              style="display: none"
              @change="localChooseImg"
              accept="image/*"
            />
            <button class="btn btn-info mt-1" @click.prevent="deleteBanner">
              Удалить
            </button>
            <button class="btn btn-info mt-1" @click="loadBanner">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fs, rtdb } from '@/main'

export default {
  data () {
    return {
      banner: {
        name: 'main banner',
        imageData: null,
        img: '',
        storageName: ''
      },
      localImg: '',
      mainImg: ''
    }
  },
  methods: {
    clickChooseBanner() {
      this.$refs.input1.click()
    },

    // Загружаємо в Storage та передаємо БД
    loadBanner(){
      // Видаляємо попередній банер з Storage
      if (this.banner.storageName !== '') {
        const deleteRef = fs.ref('BannerBack/').child(this.banner.storageName);
        deleteRef.delete().then(() => {
          console.log(this.banner.storageName)
        }).catch((err)=>{
          console.log(err)})
      }

      const storageRef=fs.ref(`BannerBack/${this.banner.imageData.name}`).put(this.banner.imageData);
      storageRef.on('state_changed',
        (snapshot) => {
        }, 
        error=>{console.log(error.message)},
        ()=>{storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.banner.img = url;
            this.banner.storageName = this.banner.imageData.name;
            this.addBannerToDatabase ()
          });
        }      
      )
    },

    // Додаємо в БД
    addBannerToDatabase () {
      const urlBanner = {
        url: this.banner.img,
        storageName: this.banner.storageName
      }
      rtdb.ref('Banner/'+this.banner.name).set(urlBanner)
      this.banner.imageData = null

      alert('Main banner save!')
    },

    // Видаляємо з Storage та БД
    deleteBanner () {
      this.localImg = 'https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg'

      const deleteRef = fs.ref('BannerBack/').child(this.banner.storageName);

      deleteRef.delete().then(() => {
        rtdb.ref('Banner/'+this.banner.name+'/url').set('https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg')
        rtdb.ref('Banner/'+this.banner.name+'/storageName').set('')
      }).catch((err)=>{
        console.log(err)})

      this.banner.storageName = ''
    },

    // Якщо є вибране зображення локально, показуємо
    localChooseImg(event) {
      this.banner.img=null;
      this.banner.imageData = event.target.files[0];
      this.localImg = window.URL.createObjectURL(event.target.files[0])
    },

    // Отримуємо інформацію з БД
    readFromDatabase () {
      const databaseRef = rtdb.ref('Banner/main banner')
      databaseRef.on('value', (snapshot) => {
        this.mainImg = snapshot.val().url,
        this.banner.storageName = snapshot.val().storageName
      })
    }
  },

  mounted () {
    this.readFromDatabase()
  }
}
</script>

<style scoped>
  .img-btn {
    padding: 0;
    border: 0;
  }
</style>