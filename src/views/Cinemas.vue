<template>
  <div>
    <div>
      <img src="https://img.the-village.com.ua/the-village.com.ua/post_image-image/hh0SjPSCNRaXSiIqm1k6bw.jpg"
      alt="egesg"
      style="width: 100%; height: 250px; object-fit: cover; object-position: center 70%">
    </div>
    <div class="m-5 row">
      <div class="col-10">
        <Loader v-if="loading"/>
        <UserCinemaList
          :cinemas="cinemas"
          v-else/>
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
</template>

<script>
import UserCinemaList from '@/components/cinema/UserCinemaList'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    UserCinemaList, Loader
  },
  data () {
    return {
      name: 'Cinemas',
      loading: true,
      cinemas: []
    }
  },
  async mounted () {
    this.cinemas = await Module.fetchInfo(this.name)
    this.loading = false
  }
}
</script>
