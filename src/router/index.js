import Vue from 'vue'

import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/pages/home')), 'home')

const Login = r => require.ensure([], () => r(require('@/pages/user/login')), 'login')

const passLogin = r => require.ensure([], () => r(require('@/pages/user/pass')), 'passLogin')

const userCenter = r => require.ensure([], () => r(require('@/pages/user/center')), 'userCenter')

const userCart = r => require.ensure([], () => r(require('@/pages/user/cart')), 'userCart')

const userRegister = r => require.ensure([], () => r(require('@/pages/user/register')), 'userRegister')

const userInfo = r => require.ensure([], () => r(require('@/pages/user/info')), 'userInfo')

const userPersonal = r => require.ensure([], () => r(require('@/pages/user/personal')), 'userPersonal')

const userCompany = r => require.ensure([], () => r(require('@/pages/user/company')), 'userCompany')

const authPersonal = r => require.ensure([], () => r(require('@/pages/auth/personal')), 'authPersonal')

const authCompany = r => require.ensure([], () => r(require('@/pages/auth/company')), 'authCompany')

const order = r => require.ensure([], () => r(require('@/pages/order')), 'order')

const search = r => require.ensure([], () => r(require('@/pages/search')), 'search')

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
			path: '/user/login',
			name: 'login',
			component: Login
		},{
			path: '/user/pass',
			name: 'passLogin',
			component: passLogin
		},{
			path: '/user/center',
			name: 'userCenter',
			meta: {
				requireAuth: true,
			},
			component: userCenter
		},{
			path: '/user/cart',
			name: 'userCart',
			meta: {
				requireAuth: true,
			},
			component: userCart
		},{
			path: '/user/register',
			name: 'userRegister',
			component: userRegister
		},{
			path: '/user/info',
			name: 'userInfo',
			meta: {
				requireAuth: true,
			},
			component: userInfo
		},{
			path: '/user/personal',
			name: 'userPersonal',
			meta: {
				requireAuth: true,
			},
			component: userPersonal
		},{
			path: '/user/company',
			name: 'userCompany',
			meta: {
				requireAuth: true,
			},
			component: userCompany
		},{
			path: '/auth/personal',
			name: 'authPersonal',
			meta: {
				requireAuth: true,
			},
			component: authPersonal
		},{
			path: '/auth/company',
			name: 'authCompany',
			meta: {
				requireAuth: true,
			},
			component: authCompany
		},{
			path: '/order',
			name: 'order',
			meta: {
				requireAuth: true,
			},
			component: order
		},{
			path: '/search',
			name: 'search',
			component: search
		}
  ]
})
