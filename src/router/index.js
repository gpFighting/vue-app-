import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import goods from '../components/goods.vue'
import comment from '../components/comment.vue'
import seller from '../components/seller.vue'
export default new Router({
  routes: [
  	{path: '/', redirect: '/goods'},
	{path: '/goods', component: goods},
	{path: '/comment', component: comment},
	{path: '/seller', component: seller},
  ]
})
