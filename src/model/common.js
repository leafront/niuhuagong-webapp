import request from '@/widget/request'

export const getFastClick = (data) => request('/static/fastclick/index.js',data)

export const areaCity = (data) => request('/static/data/areaCity.js',data)