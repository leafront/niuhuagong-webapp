import Vue from 'vue'

import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/pages/home')), 'Home')

const Detail = r => require.ensure([], () => r(require('@/pages/detail')), 'Detail')

const Login = r => require.ensure([], () => r(require('@/pages/user/login')), 'Login')

const PassLogin = r => require.ensure([], () => r(require('@/pages/user/pass')), 'PassLogin')

const UserCenter = r => require.ensure([], () => r(require('@/pages/user/center')), 'UserCenter')

const Cart = r => require.ensure([], () => r(require('@/pages/cart')), 'Cart')

const UserRegister = r => require.ensure([], () => r(require('@/pages/user/register')), 'UserRegister')

const UserInfo = r => require.ensure([], () => r(require('@/pages/user/info')), 'UserInfo')

const UserPersonal = r => require.ensure([], () => r(require('@/pages/user/personal')), 'UserPersonal')

const UserCompany = r => require.ensure([], () => r(require('@/pages/user/company')), 'UserCompany')

const AuthPersonal = r => require.ensure([], () => r(require('@/pages/auth/personal')), 'AuthPersonal')

const AuthCompany = r => require.ensure([], () => r(require('@/pages/auth/company')), 'AuthCompany')

const Order = r => require.ensure([], () => r(require('@/pages/order')), 'Order')

const Search = r => require.ensure([], () => r(require('@/pages/search')), 'Search')

Vue.use(Router)

export default new Router({
	mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
		  path: '/detail',
			name: 'Detail',
			component: Detail
		},{
			path: '/user/login',
			name: 'Login',
			component: Login
		},{
			path: '/user/pass',
			name: 'PassLogin',
			component: PassLogin
		},{
			path: '/user/center',
			name: 'UserCenter',
			meta: {
				requireAuth: true,
			},
			component: UserCenter
		},{
			path: '/cart',
			name: 'Cart',
			meta: {
				requireAuth: true,
			},
			component: Cart
		},{
			path: '/user/register',
			name: 'UserRegister',
			component: UserRegister
		},{
			path: '/user/info',
			name: 'UserInfo',
			meta: {
				requireAuth: true,
			},
			component: UserInfo
		},{
			path: '/user/personal',
			name: 'UserPersonal',
			meta: {
				requireAuth: true,
			},
			component: UserPersonal
		},{
			path: '/user/company',
			name: 'UserCompany',
			meta: {
				requireAuth: true,
			},
			component: UserCompany
		},{
			path: '/auth/personal',
			name: 'AuthPersonal',
			meta: {
				requireAuth: true,
			},
			component: AuthPersonal
		},{
			path: '/auth/company',
			name: 'AuthCompany',
			meta: {
				requireAuth: true,
			},
			component: AuthCompany
		},{
			path: '/order',
			name: 'Order',
			meta: {
				requireAuth: true,
			},
			component: Order
		},{
			path: '/search',
			name: 'Search',
			component: Search
		}
  ]
})
