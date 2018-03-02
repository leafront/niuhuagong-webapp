
import Vue from 'vue'

import App from './App'

import router from './router'

import storage from '@/widget/store'

import store from './store'

import Toast from '@/components/toast'

import pageLoading from '@/components/loading'

import { loading } from '@/mixins/loading'

import { userLoginState, wxOauthLogin } from '@/widget/common'

Vue.mixin(loading)

import filter from '@/filters'

Object.keys(filter).forEach(key => {
	Vue.filter(key, filter[key])
})

Vue.use(Toast,{    //支持全局配置
	duration: "1500"
})

Vue.use(pageLoading)

router.beforeEach((to, from, next) => {
	userLoginState().then((res) => { // 判断当前的是否登录
		if (res.status == 1) {
			const data = res.data
			if (!data.head_img) {
				data.head_img = '/static/images/default_img.png'
			}
			storage.set('NHG_USER',data)
			next()
		} else if (res.status == -3000 || res.status == -3001) {
			wxOauthLogin()
		} else if (to.matched.some(record => record.meta.requireLogin)) { // 判断该路由是否需要登录权限
			next({
				path: '/user/login',
				query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		} else {
			next ()
		}
	})
})

new Vue({
  el: '#app',
  router,
	store,
  template: '<App/>',
  components: { App }
})
