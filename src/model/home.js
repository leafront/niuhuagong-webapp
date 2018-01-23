import request from '@/widget/request'

export const getBannerList = (data) => request('/api/home/get_slider',data)

export const getProductList = (data) => request('/api/home/get_act_item',data)