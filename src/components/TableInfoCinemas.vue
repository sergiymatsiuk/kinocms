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
        <tr v-for="item in news" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.date}}</td>
          <td class="text-right py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <a href="#" class="btn btn-info mr-4"><i class="fas fa-eye" @click.prevent="showItemDetail(item.id)"></i></a>
              <a href="#" class="btn btn-danger" @click.prevent="deleteItem(item.id)"><i class="fas fa-trash"></i></a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    halls: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      newNews: [],
      title: 'News'
    }
  },
  methods: {
    async deleteItem (id) {
      console.log(1)
      await this.$store.dispatch('deleteItem', {
        title: this.title,
        id
      })
      this.newNews = await this.$store.dispatch('fetchInfo', this.title)
      this.addToParent()
    },
    addToParent () {
      this.$emit('changeActions', this.newNews)
    },
    async showItemDetail (id) {
      console.log(1)
      this.$router.push('/news-pages/' + id)
    }
  }
}
</script>
