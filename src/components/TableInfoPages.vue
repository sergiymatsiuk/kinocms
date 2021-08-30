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
        <tr v-for="item in pages" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.date}}</td>
          <td>{{item.active ? 'ВКЛ' : 'ВИКЛ'}}</td>
          <td class="text-right py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <a href="#" class="btn btn-info mr-4"><i class="fas fa-eye" @click.prevent="showItemDetail(item.id, item.link)"></i></a>
              <a href="#" class="btn btn-danger" @click.prevent="deleteItem(item.id)" v-if="!item.block"><i class="fas fa-trash"></i></a>
              <div style="width: 30px" v-else></div>
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
    pages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      newPages: [],
      title: 'Pages'
    }
  },
  methods: {
    async deleteItem (id) {
      await Module.deleteItem(this.title, id)
      const pagesFromDatabase = await Module.fetchInfo(this.title)
      pagesFromDatabase.forEach(el => {
        el.lang === 'UA' ? 
          this.newPages.push({ ...el.UA, id: el.id, block: el.block, link: el.link }) : 
          this.newPages.push({ ...el.RU, id: el.id, block: el.block, link: el.link })
      })
      console.log(pagesFromDatabase)
      console.log(this.newPages)
      this.addToParent()
    },
    async showItemDetail (id, link) {
      if (link === 'main' ) {
        this.$router.push('/create-main-page/' + id)
      } else if (link === 'contact' ) {
         this.$router.push('/create-contact-page/' + id)
      } else {
        this.$router.push('/create-pages/' + id)
      }
    },
    addToParent () {
      this.$emit('changePages', this.newPages)
      this.newPages = []
    }
  }
}
</script>
