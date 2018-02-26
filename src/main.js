
import Vue from 'vue'

import App from './App'

import router from './router'

import storage from '@/widget/store'

import store from './store'

import Toast from '@/components/toast'

import pageLoading from '@/components/loading'

import { loading } from '@/mixins/loading'

import { userLoginState } from '@/widget/common'

Vue.mixin(loading)

import filter from '@/filters'

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

Vue.use(Toast,{    //支持全局配置
	duration: "2000"
})

Vue.use(pageLoading)

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限

		userLoginState().then((res) => { // 判断当前的是否登录
			if (res.status == 1) {
			  storage.set('NHG_USER',res.data)
				next()
			} else {
					next({
						path: '/user/login',
						query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
					})
				}
		})
	} else {
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
