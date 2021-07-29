<template>
  <div>
    <h2>Statistics</h2>
    <br>
    <input type="text" v-model="name">
    <input type="text" v-model="userId">
    <button @click="writeUserData(name, userId)">Load TO Realtime</button>
    <button @click="lisentDB(userId)">Lisent</button>
  </div>
</template>

<script>
import { rtdb } from '../main'

export default {
  data () {
    return {
      name: '',
      userId: ''
    }
  },
  methods: {
    // Створює в RealtimeDatabe обєкт з даними
    writeUserData (userId, name) {
      rtdb.ref('users/' + userId).set({
        username: name
      })
      this.name = ''
      this.userId = ''
      console.log('Поїхало на базу!')
    },
    // Шукає обєкт по ID запиту
    lisentDB (userId) {
      const dbRef = rtdb.ref()
      dbRef.child('users').child(userId).get().then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
        } else {
          console.log('No data available')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
