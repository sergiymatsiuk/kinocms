import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'

import '@/../public/dist/css/adminlte.min.css'
import '@/../public/plugins/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: 'AIzaSyBG5rjKmsjS0f0Yzv_Xt9fA-HHZ15L7I4s',
  authDomain: 'kinocms-matsiuk.firebaseapp.com',
  projectId: 'kinocms-matsiuk',
  storageBucket: 'kinocms-matsiuk.appspot.com',
  messagingSenderId: '937392409413',
  appId: '1:937392409413:web:cf8d328358e3272eb58c2c',
  measurementId: 'G-K5TQX151FK'
})

export const rtdb = firebase.database()
export const db = firebase.firestore()
export const fs = firebase.storage()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
