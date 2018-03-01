import request from '@/widget/request'

export const getBannerList = (data) => request('/item_api/home/get_home_slide_img_list',data)

export const getBrandList = (data) => request('/item_api/home/get_brand_list',data)

export const getProductList = (data) => request('/item_api/home/get_hot_item_list',data)
