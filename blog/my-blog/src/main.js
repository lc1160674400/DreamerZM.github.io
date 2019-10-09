// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/style/theme/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store/index.js'

import Vuex from 'vuex'

Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.prototype.baseURL = process.env.API_ROOT
Vue.prototype.transformDateToString = function (date) {
  console.log(date, typeof date)
  if (typeof date === 'string') {
    return date.split('T')[0]
  }
  var year = date.getFullYear()
  var month = (date.getMonth() + 1).toString()
  var day = (date.getDate()).toString()
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  var dateTime = year + '-' + month + '-' + day
  return dateTime
}
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
