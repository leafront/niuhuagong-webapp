import request from '@/widget/request'

export const getBannerList = (data) => request('/api/home/get_slider',data)

export const getBrandList = (data) => request('/item_api/home/get_brand_list',data)

export const getProductList = (data) => request('/item_api/home/get_hot_item_list',data)