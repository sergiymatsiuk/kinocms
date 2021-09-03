<template>
  <div class="card card-info">
    <div class="align-self-center mb-3 mt-3">
      <h2>Список Новостей</h2>
      <button
        type="submit"
        class="btn btn-info col position-absolute"
        style="width: 200px"
        @click.prevent="createNews">Создать Новость</button>
    </div>
    <Loader
      v-if="loading"/>
    <h5 v-else-if="news.length ===0" class="align-self-center">Новостей нет</h5>
    <TableInfo
      :news="news"
      @changeActions="loadNewActions"
      v-else/>
  </div>
</template>

<script>
/* eslint-disable */
import TableInfo from '@/components/TableInfoNews'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  data () {
    return {
      loading: true,
      news: [],
      name: 'News',
      id: 0 
    }
  },
  methods: {
    createNews () {
      this.$router.push({path: '/admin/news-pages/' + this.id})
    },
    loadNewActions (newActions) {
      this.news = newActions
    }
  },
  async mounted () {
    this.id = await Module.getCounter()
    await this.$store.dispatch('changeLocale', 'ukr-UKR')
    const newsFromDatabase = await Module.fetchInfo(this.name)
    console.log(newsFromDatabase)
    newsFromDatabase.forEach(el => {
      el.lang === 'UA' ? this.news.push({ ...el.UA, id: el.id }) : this.news.push({ ...el.RU, id: el.id })
    })
    this.loading = false
  },
  components: {
    TableInfo, Loader
  }
}
</script>

<style scoped>
  .position-absolute {
    top: 20px;
    right: 5%;
  }
</style>