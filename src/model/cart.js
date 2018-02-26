
import request from '@/widget/request'

export const addShopCart = (data) => request('/order_api/order/add_shop_cart',data)

export const updateShopCart = (data) => request('/order_api/order/update_user_shop_cart',data)

export const getCartList = (data) => request('/order_api/order/get_user_shop_cart_list',data)

export const delCartShop = (data) =>  request('/order_api/order/delete_user_shop_cart',data)