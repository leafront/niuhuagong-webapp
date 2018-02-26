
import * as Model from '@/model/user'

import store from '@/widget/store'

import utils from './utils'

/**
 *
 * 用户认证
 */

export const wxOauthLogin = () =>{

	const isAuthLogin = store.get('NHG_IS_AUTH_LOGIN')

	if (isAuthLogin) {
		return
	}

	store.set('NHG_IS_AUTH_LOGIN',true)

	const pathname = location.pathname + location.search

	Model.wxOauthLogin({
		type: 'GET',
		data: {
			refer_url: pathname
		}
	}).then((res) => {

		store.remove('NHG_IS_AUTH_LOGIN')

		const data = res.data

		if (data && res.status == 1) {

			window.location.href = data.url

		}
	})
}

export const userLoginState = function () {

	return Model.userLoginState({
		type: 'POST'
	}).then((res) => {

		return res
	})
}


/***
 *获取localStorage 过期缓存
 *
 */

export const clearStorage =  () =>{

	var currentTime = new Date().getTime()

	if (utils.isLocalStorageSupported()) {

		for (var i = 0; i < localStorage.length; i++) {

			var key = localStorage.key(i);

			var cacheData = store.get(key)


			if (cacheData && cacheData.times) {

				if (currentTime > cacheData.times) {

					store.remove(key)

				}

			}

		}
	} else {

		if (window.name) {

			var storage = utils.deserialize(window.name)

			for (var attr in storage) {

				var cacheData = store.get(attr)

				if (cacheData && cacheData.times) {

					if (currentTime > cacheData.times) {

						store.remove(attr)

					}

				}
			}
		}
	}
}



