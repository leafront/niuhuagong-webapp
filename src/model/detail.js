import request from '@/widget/request'

export const getProductDetail = (data) => request('/item_api/item/get_item_info',data)

export const addShopCart = (data) => request('/order_api/order/add_shop_cart',data)
