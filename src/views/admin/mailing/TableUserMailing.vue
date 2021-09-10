<template>
  <div class="card-body p-0 m-5">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th @click="$emit('sort-by-id')">ID</th>
          <th>Дата регистрации</th>
          <th @click="$emit('sort-by-BD')">День рождения</th>
          <th>Email</th>
          <th>Телефон</th>
          <th @click="$emit('sort-by-name')">ФИО</th>
          <th>Псевдоним</th>
          <th @click="$emit('sort-by-city')">Город</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in arrUsers" :key="user.id">
          <td><input type="checkbox" name="select" v-model="user.select" @change="$emit('changeList', user.id)"></td>
          <td>{{user.id}}</td>
          <td>{{user.dateReg}}</td>
          <td>{{user.dateBD}}</td>
          <td>{{user.mail}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.name +' '+ user.lastName}}</td>
          <td>{{user.nickname}}</td>
          <td>{{user.city}}</td>
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
  },
  computed: {
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
