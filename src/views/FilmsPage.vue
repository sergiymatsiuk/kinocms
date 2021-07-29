<template>
  <div class="card card-info">
    <!-- form start -->
    <form class="form-horizontal">
      <div class="card-body">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Название фильма </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputEmail3"
              placeholder="Название фильма"
              v-model="name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label"
            >Описание</label
          >
          <div class="col-sm-10">
            <textarea
              type="text"
              class="form-control"
              id="inputPassword3"
              placeholder="Текст"
              v-model="description"
            />
          </div>
        </div>
        <div class="form-group row">
            <div class="col-3">
                <h6>Главная картинка</h6>
            </div>
            <div class="col-3 row">
              <div class="col-10 d-flex ">
                <div v-if="imageData != null">
                  <img class="preview" height="100" width=200 :src="img" />
                </div>
                <div v-else style="height: 100px; width: 200px">
                  <img src="https://cdn.tribuna.com.ua/uploads/1398/1398-zhk_televizor_zvuk_est_izobrazheniya_net_prichina_1-300x169.jpg"
                    style="height: 100px; width: 200px">
                </div>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div class="col-2 d-flex">
              <button class="btn-lg btn-info align-self-center" @click.prevent="click1">Загрузить</button>
            </div>
            <div class="col-2 d-flex">
              <button class="btn-lg btn-info align-self-center" @click.prevent="deleteMainImg">Удалить</button>
            </div>
        </div>
        <div class="form-group column">
          <div class="">
              <h6>Галерея картинок</h6>
          </div>
          <div class="row">
            <div class="col-2 pt-1">
              <h6>Размер:  1000х190</h6>
            </div>
            <ul class="col-10 row">
            </ul>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputURLyoutube" class="col-sm-2 col-form-label">Ссылка на трейлер</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputURLyoutube"
              placeholder="Ссылка на видео в youtube"
              v-model="URLyoutube"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="offset-sm-2 col-sm-10">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck2"
              />
              <label class="form-check-label" for="exampleCheck2"
                >Remember me</label
              >
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-2">
            <h6>SEO блок:</h6>
          </div>
          <div class="form-group row col-sm-10">

          <label for="inputURL" class="col-sm-2 col-form-label"
            >URL:</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputURL"
              placeholder="URL"
              v-model="SEOurl"
            />
          </div>

          <label for="inpuTitle" class="col-sm-2 col-form-label"
            >Title:</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Title"
              v-model="SEOtitle"
            />
          </div>

          <label for="inpuKeywords" class="col-sm-2 col-form-label"
            >Keywords:</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="inputKeywords"
              placeholder="Word"
              v-model="SEOkeywords"
            />
          </div>

          <label for="inpuDescription" class="col-sm-2 col-form-label"
            >Description:</label>
          <div class="col-sm-10">
            <textarea
              type="text"
              class="form-control"
              id="inputDescription"
              placeholder="Description"
              v-model="SEOdescription"
            />
          </div>
          </div>
        </div>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="create">Сохранить</button>
        <button type="submit" class="btn btn-default col-sm-6" @click.prevent="deleteAll">
          Вернуть базовую версию
        </button>
      </div>
      <!-- /.card-footer -->
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { fs, rtdb } from '../main'

export default {

  data () {
    return {
      name: '',
      description: '',
      URLyoutube: '',
      SEOurl: '',
      SEOtitle: '',
      SEOkeywords: '',
      SEOdescription: '',
      img: '',
      imageData: null
    }
  },
  methods: {
    create () {
      console.log('Create')
      const post = {
        photo: this.img,
        name: this.name,
        description: this.description,
        URLyoutube: this.URLyoutube,
        SEOurl: this.SEOurl,
        SEOtitle: this.SEOtitle,
        SEOkeywords: this.SEOkeywords,
        SEOdescription: this.SEOdescription
      }
      rtdb.ref(`Films/`+this.name).set(post)
      this.deleteAll()
    },
    deleteAll() {
      this.img = '',
      this.name = '',
      this.description = '',
      this.URLyoutube = '',
      this.SEOurl = '',
      this.SEOtitle = '',
      this.SEOkeywords = '',
      this.SEOdescription = ''
      this.imageData = null
    },
    deleteMainImg() {
      this.img = '',
      this.imageData = null
    },

    click1() {
      this.$refs.input1.click()
    },

    previewImage(event) {
      this.img=null;
      this.imageData = event.target.files[0];
      this.onUpload()
    },

    onUpload(){
      this.img=null;
      const storageRef=fs.ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(
        error=>{console.log(error.message)},
        ()=>{storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.img = url;
            console.log(this.img)
          });
        }      
      );
    },
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
