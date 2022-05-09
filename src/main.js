import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8090'
})

Vue.config.productionTip = false
Vue.prototype.$axios = axiosInstance

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
