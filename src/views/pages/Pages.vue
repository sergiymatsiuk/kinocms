<template>
  <div class="card card-info">
    <div class="align-self-center mb-3 mt-3">
      <h2>Список Страниц</h2>
      <button
        type="submit"
        class="btn btn-info col position-absolute"
        style="width: 200px"
        @click.prevent="createNews">Создать Новую</button>
    </div>
    <Loader
      v-if="loading"/>
    <h5 v-else-if="pages.length ===0" class="align-self-center">Страниц нет</h5>
    <TableInfoPages
      :pages="pages"
      @changePages="loadNewPages"
      v-else/>
  </div>
</template>

<script>
/* eslint-disable */
import TableInfoPages from '@/components/TableInfoPages'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  data () {
    return {
      loading: true,
      pages: [],
      name: 'Pages',
      id: 0 
    }
  },
  methods: {
    createNews () {
      this.$router.push({path: '/create-pages/' + this.id})
    },
    loadNewPages (newPages) {
      this.pages = newPages
    }
  },
  async mounted () {
    this.id = await Module.getCounter()
    await this.$store.dispatch('changeLocale', 'ukr-UKR')
    const pagesFromDatabase = await Module.fetchInfo(this.name)
    pagesFromDatabase.forEach(el => {
      el.lang === 'UA' ? 
        this.pages.push({ ...el.UA, id: el.id, block: el.block, link: el.link }) : 
        this.pages.push({ ...el.RU, id: el.id, block: el.block, link: el.link })
    })
    this.loading = false
    console.log(this.pages)
  },
  components: {
    TableInfoPages, Loader
  }
}
</script>

<style lang="css" scoped>
  .position-absolute {
    top: 20px;
    right: 5%;
  }
</style>
