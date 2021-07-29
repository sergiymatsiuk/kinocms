<template>
  <div class="banner">
    <ul v-for="(location, idx) in locations" :key="idx">
      <li>
        <img :src="location.url">
        <h1>{{ location.name }}</h1>
        <button @click="deleteLocation(location.id)">Delete</button>
      </li>
    </ul>
    <form @submit.prevent="addLocation(name, url)">
      <input v-model="name" placeholder="nameCity">
      <input v-model="url" placeholder="URLCity">
      <button type="submit">Add New City</button>
    </form>
  </div>
</template>

<script>
import { db } from '../main'

export default {
  data () {
    return {
      locations: [],
      name: '',
      url: ''
    }
  },
  firestore () {
    return {
      locations: db.collection('citys').orderBy('createdAt')
    }
  },
  methods: {
    addLocation (name, url) {
      const createdAt = new Date()
      db.collection('citys').add({ name, url, createdAt })
      this.name = ''
      this.url = ''
    },
    deleteLocation (id) {
      db.collection('citys').doc(id).delete()
    }
  }
}
</script>

<style lang="css" scoped>
  .banner {
    padding-top: 10px;
  }
  li {
    list-style: none;
  }
  img {
    width: 150px;
    height: auto;
  }
</style>
