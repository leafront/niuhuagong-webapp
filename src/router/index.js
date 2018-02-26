import Vue from 'vue'

import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('@/pages/home')), 'Home')

const Detail = r => require.ensure([], () => r(require('@/pages/detail')), 'Detail')

const Login = r => require.ensure([], () => r(require('@/pages/user/login')), 'Login')

const UserResetForget = r => require.ensure([], () => r(require('@/pages/user/reset/forget')), 'UserResetForget')

const UserResetPass = r => require.ensure([], () => r(require('@/pages/user/reset/pass')), 'UserResetPass')

const PassLogin = r => require.ensure([], () => r(require('@/pages/user/pass')), 'PassLogin')

const UserCenter = r => require.ensure([], () => r(require('@/pages/user/center')), 'UserCenter')

const Cart = r => require.ensure([], () => r(require('@/pages/cart')), 'Cart')

const UserAddress = r => require.ensure([], () => r(require('@/pages/user/address')),'UserAddress')

const UserAddressAdd  = r => require.ensure([], () => r(require('@/pages/user/address/add')),'UserAddressAdd')

const UserAddressEdit = r => require.ensure([], () => r(require('@/pages/user/address/edit')),'UserAddressEdit')

const UserRegister = r => require.ensure([], () => r(require('@/pages/user/register')), 'UserRegister')

const UserInfo = r => require.ensure([], () => r(require('@/pages/user/info')), 'UserInfo')

const UserPersonal = r => require.ensure([], () => r(require('@/pages/user/personal')), 'UserPersonal')

const UserCompany = r => require.ensure([], () => r(require('@/pages/user/company')), 'UserCompany')

const AuthPersonal = r => require.ensure([], () => r(require('@/pages/auth/personal')), 'AuthPersonal')

const AuthCompany = r => require.ensure([], () => r(require('@/pages/auth/company')), 'AuthCompany')

const UserOrder = r => require.ensure([], () => r(require('@/pages/user/order')), 'UserOrder')

const OrderSubmit = r => require.ensure([], () => r(require('@/pages/order/submit')), 'OrderSubmit')

const OrderDetail = r => require.ensure([], () => r(require('@/pages/order/detail')), 'OrderDetail')

const OrderLogistics = r => require.ensure([], () => r(require('@/pages/order/logistics')), 'OrderLogistics')

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
			path: '/user/address',
			name: 'UserAddress',
			component: UserAddress,
		},{
			path: '/user/address/add',
			name: 'UserAddressAdd',
			component: UserAddressAdd,
			meta: {
				requireAuth: true,
			},
		},{
			path: '/user/address/edit',
			name: 'UserAddressEdit',
			component: UserAddressEdit,
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
			component: UserCenter,
			meta: {
				requireAuth: true,
			}
		},{
			path: '/cart',
			name: 'Cart',
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
			path: '/user/reset/forget',
			name: 'UserResetForget',
			component: UserResetForget
		},{
			path: '/user/reset/pass',
			name: 'UserResetPass',
			component: UserResetPass
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
			path: '/user/order',
			name: 'UserOrder',
			component: UserOrder
		},{
			path: '/order/submit',
			name: 'OrderSubmit',
			component: OrderSubmit
		},{
			path: '/order/detail',
			name: 'OrderDetail',
			component: OrderDetail
		},{
			path: '/order/logistics',
			name: 'OrderLogistics',
			component: OrderLogistics
		},{
			path: '/search',
			name: 'Search',
			component: Search
		}
	]
})
