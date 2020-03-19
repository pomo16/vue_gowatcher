import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import font and icon
import './assets/fonts/iconfont.css'
// import global css
import './assets/css/global.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888'
axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    } else {
      config.headers.Authorization = ''
    }
    return config
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.localStorage.clear()
          router.replace({
            path: '/login'
          })
          location.reload()
      }
    }
  }
)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
