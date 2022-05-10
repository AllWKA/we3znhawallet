import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const axiosConfig = {
  baseURL: 'http://localhost:8090'
}

Vue.config.productionTip = false
Vue.prototype.$axios = axios.create(axiosConfig)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
