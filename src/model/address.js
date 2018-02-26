import request from '@/widget/request'

export const getUserAddressList = (data) => request('/user_api/user/get_user_address_list',data)

export const editUserAddress = (data) => request('/user_api/user/update_user_address',data)

export const addUserAddress = (data) => request('/user_api/user/add_new_user_address',data)

export const getUserAddress = (data) => request('/user_api/user/get_user_address_info',data)

export const deleteUserAddress = (data) => request('/user_api/user/delete_user_address',data)