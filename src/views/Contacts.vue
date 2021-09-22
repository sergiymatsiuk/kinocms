<template>
  <div>
    <Loader v-if="loading" class="mb-5"/>
    <div v-else>
      <div>
        <img
        :src="banners[0].img"
        alt="bannerAction"
        style="width: 100%; height: 350px">
      </div>
      <div class="m-5 row">
        <div class="col-10 column">
          <h2 class="text-center">{{ 'Contacts' | localize}}</h2>
          <div
            v-for="item in info"
            :key="item.id">
            <user-contacts-card
              :item="item"/>
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
import UserContactsCard from '@/components/UserContactsCard'

export default {
  components: {
    Loader, UserContactsCard
  },
  data () {
    return {
      title: 'Pages',
      name: 'Cinemas',
      id: '528',

      loading: true,
      info: {},
      banners: []
    }
  },
  computed: {
  },
  async mounted () {
    this.banners = await Module.fetchInfoBanner('Banner', 'bannerNews')
    this.info = await Module.fetchInfoByIdCinemas(this.title, this.id, this.name)
    console.log(this.info)
    this.loading = false
  }
}
</script>

<style scoped>
  .slider {
    width: 50%;
    margin: 0 auto;
  }
</style>
