<template>
  <div class="card card-info">
    <div class="align-self-center mb-3 mt-3">
      <h2>Пользователи</h2>
      <div
        class="position-absolute"
        style="width: 200px">
        <input type="text" placeholder="поиск" v-model="search">
      </div>
    </div>
    <Loader v-if="loading"/>
    <div v-else>
      <TableUsers
        :arrUsers="userBySearch"
        @delete-user-by-id="deleteUser"
        @sort-by-id="selectFilter='id'"
        @sort-by-city="selectFilter='city'"
        @sort-by-BD="selectFilter='dateBD'"
        @sort-by-name="selectFilter='name'"
      />
      <Paginate
        v-model="userPage"
        :page-count="Math.ceil(userByFilter.length/userInPage)"
        :click-handler="pageChangeHandler"
        :prev-text="''"
        :next-text="''"
        :container-class="'pagination ml-5'"
        :page-class="'page-item page-link'"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Loader from '@/components/Loader'
import Module from '@/module/module'
import TableUsers from '@/views/users/TableUsers'

export default {
  components: {
    Loader, TableUsers
  },
  data () {
    return {
      name: 'Users',
      id: 0,
      loading: true,

      users: [],
      search: '',
      selectFilter: 'id',
      userInPage: 5,
      userPage: 1,


    }
  },
  methods: {
    async deleteUser (id) {
      this.loading = true
      await Module.deleteItem(this.name, id)
      this.users = await Module.fetchInfo(this.name)
      this.loading = false
    },

    pageChangeHandler (page) {
      this.userPage = page || 1
      console.log(this.userPage)
    },
  },
  computed: {
    userByFilter () {
      const changeUsers = this.users

      if (this.selectFilter === 'id') changeUsers.sort((a, b) => {return a.id - b.id})

      if (this.selectFilter === 'dateBD') changeUsers.sort((a, b) => { return new Date(b.dateBD) - new Date(a.dateBD) })
      
      if (this.selectFilter === 'city') changeUsers.sort((a, b) => { return a.city.toLowerCase() <= b.city.toLowerCase() ? -1 : 1 })

      if (this.selectFilter === 'name') changeUsers.sort((a, b) => { return a.lastName.toLowerCase() <= b.lastName.toLowerCase() ? -1 : 1 })
      console.log(changeUsers)
      return changeUsers
        .filter( user => {
        let fullName = user.name +''+user.lastName
        return fullName.includes(this.search)
        })
    },
    userBySearch () {
      return this.userByFilter.slice((this.userPage*this.userInPage-this.userInPage), (this.userPage*this.userInPage))
    },
  },
  async mounted () {
    this.id = await Module.getCounter()
    this.users = await Module.fetchInfo(this.name)
    this.loading = false
  }
}
</script>

<style scoped>
  .position-absolute {
    top: 25px;
    right: 5%;
  }
</style>
