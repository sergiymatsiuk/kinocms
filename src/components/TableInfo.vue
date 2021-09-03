<template>
  <div class="card-body p-0 mr-5 ml-5">
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Дата создания</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in actions" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.date}}</td>
          <td>{{item.active ? 'ВКЛ' : 'ВИКЛ'}}</td>
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
import Module from '@/module/module'

export default {
  props: {
    actions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      newActions: [],
      title: 'Actions'
    }
  },
  methods: {
    async deleteItem (id) {
      await Module.deleteItem(this.title, id)
      const newsFromDatabase = await Module.fetchInfo(this.title)
      newsFromDatabase.forEach(el => {
        el.lang === 'UA' ? this.newActions.push({ ...el.UA, id: el.id }) : this.newActions.push({ ...el.RU, id: el.id })
      })
      this.addToParent()
    },
    async showItemDetail (id) {
      this.$router.push('/admin/action-pages/' + id)
    },
    addToParent () {
      this.$emit('changeActions', this.newActions)
    }
  }
}
</script>
