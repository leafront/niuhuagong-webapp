
import request from '@/widget/request'

export const getCreateOrderInfo = (data) => request('/order_api/order/get_create_order_info',data)

export const createOrder = (data) => request('/order_api/order/create_order',data)

export const getOrderList = (data) => request('/order_api/order/get_order_list',data)

export const orderReceipt = (data) => request('/order_api/order/confirm_deliver',data)

export const getOrderDetail = (data) => request('/order_api/order/get_order_info',data)

export const cancelOrder = (data) => request('/order_api/order/cancel_order',data)

export const getLogisticsInfo = (data) => request('/order_api/order/get_deliver_info',data)

export const remindDeliver = (data) => request('/order_api/order/remind_deliver',data)
