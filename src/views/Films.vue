<template>
  <div>
    <div>
      <h1>Upload a photo</h1>
    </div>
    <div>
      <div>
        <button @click="click1">choose photo</button>
        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
      </div>
      <div v-if="imageData != null">
        <img class="preview" height="250" width=auto :src="img1" />
        <br />
      </div>
    </div>
    <div>
        <textarea v-model="caption" label="Caption goes here"> </textarea>
    </div>
    <div>
      <button color="pink" @click="create">upload</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fs, rtdb } from '../main'

export default {

  data () {
    return {
      caption : '',
      img1: '',
      imageData: null
    }
  },
  methods: {
    create () {
      const post = {
        photo: this.img1,
        caption: this.caption        
      }
      rtdb.ref('PhotoGallery').push(post)
      .then((response) => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
    },

    click1() {
      this.$refs.input1.click()   
    },

    previewImage(event) {
      this.uploadValue=0;
      this.img1=null;
      this.imageData = event.target.files[0];
      this.onUpload()
    },

    onUpload(){
      this.img1=null;
      const storageRef=fs.ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
      this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.img1 =url;
            console.log(this.img1)
          });
        }
      );
    },
  }
};
</script>
