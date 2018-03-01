import request from '@/widget/request'

export const userLogin = (data) => request('/user_api/login/login',data)

export const userLogout = (data) => request('/user_api/login/logout',data)

export const userRegister = (data) => request('/user_api/login/register',data)

export const userForget = (data) => request('/user_api/login/retrieve_pwd_verify',data)

export const userResetPass = (data) => request('/user_api/login/retrieve_pwd',data)

export const getUserVerify = (data) => request('/user_api/login/send_login_pwd_sms',data)

export const wxOauthLogin = (data) => request('/user_api/access/wxAuth',data)

export const supplyUserInfo = (data) => request('/user_api/user/supply_user_info',data)

export const getIndustryList = (data) => request('/user_api/user/get_select_info',data)

export const getUserInfo = (data) => request('/api/shop/user/userinfo',data)

export const userLoginState = (data) => request('/user_api/login/state',data)