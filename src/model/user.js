import request from '@/widget/request'

export const getUserAssets = (data) => request('/api/shop/bonus/getSumBonus',data)

export const getIncomeList = (data) => request('/api/shop/bonus/getWithDrawDetails',data)

export const wxOauthLogin = (data) => request('/api/shop/access/wxAuth',data)

export const getUserInfo = (data) => request('/api/shop/user/userinfo',data)

