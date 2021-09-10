<template>
  <div class="card card-info">
    <div class="align-self-center mb-3 mt-3">
      <h2>Список Акций</h2>
      <button
        type="submit"
        class="btn btn-info col position-absolute"
        style="width: 200px"
        @click.prevent="createAction">Создать Акцию</button>
    </div>
    <Loader
      v-if="loading"/>
    <h5 v-else-if="actions.length ===0" class="align-self-center">Акций нет</h5>
    <TableInfo
      :actions="actions"
      @changeActions="loadNewActions"
      v-else/>
  </div>
</template>

<script>
/* eslint-disable */
import TableInfo from '@/components/TableInfo'
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  data () {
    return {
      loading: true,
      actions: [],
      name: 'Actions',
      id: 0 
    }
  },
  methods: {
    createAction () {
      this.$router.push({path: '/admin/action-pages/' + this.id})
    },
    loadNewActions (newActions) {
      this.actions = newActions
    }
  },
  async mounted () {
    this.id = await Module.getCounter()
    await this.$store.dispatch('changeLocale', 'ukr-UKR')
    const actionsFromDatabase = await Module.fetchInfo(this.name)
    console.log(actionsFromDatabase)
    actionsFromDatabase.forEach(el => {
      el.lang === 'UA' ? this.actions.push({ ...el.UA, id: el.id }) : this.actions.push({ ...el.RU, id: el.id })
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
