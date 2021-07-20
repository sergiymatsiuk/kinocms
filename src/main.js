import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/../public/dist/css/adminlte.min.css'
import '@/../public/plugins/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
