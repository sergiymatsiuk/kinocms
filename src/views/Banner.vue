<template>
  <div class="content">

    <MainBanner class="ml-4"/>

    <BackgroundBanner class="ml-4"/>

    <NewsActionBanner class="ml-4"/>

  </div>
</template>

<script>
/* eslint-disable */
import NewsActionBanner from '@/components/banner/NewsActionBanner'
import MainBanner from '@/components/banner/MainBanner'
import BackgroundBanner from '@/components/banner/BackgroundBanner'

export default {
  components: {
    MainBanner, BackgroundBanner, NewsActionBanner
  },
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

      let newCard = JSON.parse(JSON.stringify(this.cards[0]))
      this.cards.push(newCard)
      console.log(this.cards)
    },
    deleteCard (idx) {
      if(this.cards.length === 1) return
      console.log(this.cards[idx])
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
      storageRef.on('state_changed',
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
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
