
import Vue from 'vue'

import App from './App'

import router from './router'

import FastClick from 'fastclick'

import store from './store'

import Toast from '@/components/toast'

import pageLoading from '@/components/loading'

import filter from '@/filters'

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

import '@/fonts/iconfont'

Vue.use(Toast,{    //支持全局配置
	duration: "3000"
})

Vue.use(pageLoading)

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

Vue.config.productionTip = true


router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
		if (true) {// 判断当前的是否登录

			next()


		} else {
			next({
				path: '/user/login',
				query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}
	else {
		next()
	}
})

new Vue({
  el: '#app',
  router,
	store,
  template: '<App/>',
  components: { App }
})
