<template>
  <div>
    <Loader v-if="loading" class="mb-5"/>
    <div v-else>
      <div>
        <img :src="showBanner"
        alt="bannerAction"
        style="width: 100%; height: 350px">
      </div>
      <div class="m-5 row">
        <div class="col-10">
          <h2 class="mb-2">{{showAction.name}}</h2>
          <p class="item-desc">{{showAction.description}}</p>
          <div class="mb-2">
            <img class="card-img-top" :src="showAction.mainImg" style="height: 100%">
          </div>
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

export default {
  components: {
    Loader
  },
  data () {
    return {
      loading: true,
      banners: [],
      action: {}
    }
  },
  computed: {
    showBanner () {
      if (this.banners.length === 0) return
      return this.banners[0].img
    },
    showAction () {
      const lang = this.$store.getters.info.locale
      if (lang === 'rus-RUS') {
        return this.action.RU
      } else {
        return this.action.UA
      }
    }
  },
  async mounted () {
    this.banners = await Module.fetchInfoBanner('Banner', 'bannerNews')
    const id = this.$route.params.id
    this.action = await Module.fetchInfoById('Actions', id)
    console.log(this.action)
    this.loading = false
  }
}
</script>

<style scoped>
  .item-desc {
    margin: 20px auto 0;
    width: 80%;
    font-size: 20px;
  }
</style>
