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
          <user-list
            :items="actions"/>
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
import UserList from '@/components/UserList'

export default {
  components: {
    Loader, UserList
  },
  data () {
    return {
      loading: true,
      banners: [],
      actions: []
    }
  },
  computed: {
    showBanner () {
      if (this.banners.length === 0) return
      return this.banners[0].img
    }
  },
  async mounted () {
    this.banners = await Module.fetchInfoBanner('Banner', 'bannerNews')
    this.actions = await Module.fetchInfo('Actions')
    console.log(this.actions)
    this.loading = false
  }
}
</script>
