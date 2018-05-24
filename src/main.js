// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/vuex.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import {Rate, Icon,Badge, Button} from 'iview'
Vue.component('Rate',Rate)
Vue.component('Icon',Icon)
Vue.component('Badge',Badge)
Vue.component('Button',Button)
Vue.config.productionTip = false

import moment from 'moment'
Vue.filter('dateFormat',(date,pattern="YYYY-MM-DD HH:mm:ss")=>{
	return moment(date).format(pattern)
})
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
