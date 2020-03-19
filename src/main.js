import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import font and icon
import './assets/fonts/iconfont.css'
// import global css
import './assets/css/global.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
