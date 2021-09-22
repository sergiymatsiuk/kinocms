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
          <h3 class="text-center" v-if="showNews.length === 0">{{ 'NoNews' | localize }}</h3>
          <div class="d-flex row justify-content-center flex-wrap">
            <user-card-news
              v-for="(item, idx) in showNews"
              :key="idx"
              :item="item"
              class="d-flex flex-wrap"
            />
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
import UserCardNews from '@/components/UserCardNews.vue'

export default {
  components: {
    Loader, UserCardNews
  },
  data () {
    return {
      loading: true,
      banners: [],
      news: []
    }
  },
  computed: {
    showBanner () {
      if (this.banners.length === 0) return
      return this.banners[0].img
    },
    showNews () {
      return this.news.filter(el => {
        if (el.RU.active === true || el.UA.active === true) return el
      })
    }
  },
  async mounted () {
    this.banners = await Module.fetchInfoBanner('Banner', 'bannerNews')
    this.news = await Module.fetchInfo('News')
    this.loading = false
  }
}
</script>
