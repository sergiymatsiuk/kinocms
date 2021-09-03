<template>
  <div class="card-body p-0 mr-5 ml-5">
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Дата создания</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hall in halls" :key="hall.id">
          <td>{{hall.name}}</td>
          <td>{{hall.name}}</td>
          <td class="text-right py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <a href="#" class="btn btn-info mr-4"><i class="fas fa-eye" @click.prevent="showItemDetail(hall.id)"></i></a>
              <a href="#" class="btn btn-danger" @click.prevent="deleteItem(hall.id)"><i class="fas fa-trash"></i></a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable */
import Module from '@/module/module'

export default {
  props: {
    halls: {
      type: Array,
      required: true
    },
    cinemaId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      newNews: [],
      title: 'Halls'
    }
  },
  methods: {
    async deleteItem (id) {
      await Module.deleteHall(this.title, this.cinemaId, id)
      this.$emit('changeHalls')
    },
    async showItemDetail (id) {
      this.$router.push({ path : '/admin/cinemas-hall/'+this.cinemaId+'-'+id})
    }
  }
}
</script>
