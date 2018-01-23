
import * as Model from '@/model/user'

import store from '@/widget/store'

import utils from './utils'

/**
 *
 * 用户认证
 */

export const wxOauthLogin = () =>{

	const isAuthLogin = store.get('LEIDI_IS_AUTH_LOGIN')

	if (isAuthLogin) {
		return
	}

	store.set('LEIDI_IS_AUTH_LOGIN',true)

	console.info('LEIDI_IS_AUTH_LOGIN')

	const pathname = location.pathname + location.search

	Model.wxOauthLogin({
		type: 'GET',
		data: {
			refer_url: pathname
		}
	}).then((res) => {

		store.remove('LEIDI_IS_AUTH_LOGIN')

		const data = res.data

		if (data && res.status >=1) {

			console.info(data.url)

			window.location.href = data.url

		}
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



