<template>
  <div>
    <Loader v-if="loading" class="mb-5"/>
    <div v-else>
      <div>
        <img :src="showInfo.mainImg"
        alt="bannerAction"
        style="width: 100%; height: 350px">
      </div>
      <div class="m-5 row">
        <div class="col-10">
          <h2 class="text-center">{{showInfo.name}}</h2>
          <p class="my-5">{{showInfo.description}}</p>
          <user-slider
            :imgsToShow="showImgs"/>
        </div>
        <div class="col-2">
          <div class="rounded d-flex align-items-center justify-content-center mb-4" style="height: 350px; background-color: #D3D3D3">
            <h3>Реклама</h3>
          </div>
          <div class="rounded d-flex align-items-center justify-content-center" style="height: 350px; background-color: #D3D3D3">
            <h3>Social</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Module from '@/module/module'
import Loader from '@/components/Loader'
import UserSlider from '@/components/poster/UserSlider'

export default {
  components: {
    Loader, UserSlider
  },
  data () {
    return {
      name: 'Pages',
      id: '524',

      loading: true,
      info: {}
    }
  },
  computed: {
    showInfo () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.info.RU
      } else {
        return this.info.UA
      }
    },
    showImgs () {
      return this.showInfo.localImgArr
    }
  },
  async mounted () {
    this.info = await Module.fetchInfoById(this.name, this.id)
    console.log(this.info)
    this.loading = false
  }
}
</script>
