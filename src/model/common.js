import request from '@/widget/request'

export const getFastClick = (data) => request('/static/fastclick/index.js',data)

export const getIconFont = (data) => request('/static/fonts/iconfont.js',data)

export const areaCity = (data) => request('/static/data/areaCity.js',data)

export const getPayInfo = (data) => request('/order_api/order/go_pay',data)

export const checkPayInfo = (data) => request('/order_api/order/query_order_pay_status',data)
