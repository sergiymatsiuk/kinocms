<template>
  <div class="card-body p-0 m-5">
    <table class="table">
      <thead>
        <tr>
          <th @click="$emit('sort-by-id')">ID</th>
          <th>Дата регистрации</th>
          <th @click="$emit('sort-by-BD')">День рождения</th>
          <th>Email</th>
          <th>Телефон</th>
          <th @click="$emit('sort-by-name')">ФИО</th>
          <th>Псевдоним</th>
          <th @click="$emit('sort-by-city')">Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in arrUsers" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.dateReg}}</td>
          <td>{{user.dateBD}}</td>
          <td>{{user.mail}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.name +' '+ user.lastName}}</td>
          <td>{{user.nickname}}</td>
          <td>{{user.city}}</td>
          <td class="text-right py-0 align-middle">
            <div class="btn-group btn-group-sm">
              <a href="#" class="btn btn-info mr-1"><i class="fas fa-eye" @click.prevent="editUsers(user.id)"></i></a>
              <a href="#" class="btn btn-danger"><i class="fas fa-trash" @click.prevent="deleteUser(user.id)"></i></a>
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
    arrUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    editUsers (id) {
      this.$router.push({ path: '/create-users/' + id })
    },
    deleteUser (id) {
      this.$emit('delete-user-by-id', id)
    }
  },
  mounted () {
  }
}
</script>

<style>
  .active {
    background-color: #BCC5D0;
  }
</style>
