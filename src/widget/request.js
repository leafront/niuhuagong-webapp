import ajax from './ajax'

import store from './store'

import utils from './utils'

import { wxOauthLogin, clearStorage } from '@/widget/common'

export default function request (url,options){

		var defaultOpt = {
			isHeader:true,
			type: options.type,
			data: options.data,
			async: true,
			url:url,
			timeout: 6000,
			dataType: options.dataType || 'json',
			headers: {
				"Content-type":"application/x-www-form-urlencoded",
				"Accept": 'application/json'
			}
		}

		clearStorage()
		
		const cache = options.cache || false
		
		const expires = options.expires || 30 * 60 * 1000

		let data = options.data;

	  defaultOpt.data = utils.queryStringify(data);

		if (options.type == "GET") {

			defaultOpt.url =  defaultOpt.data ?  defaultOpt.url + '?' + defaultOpt.data: defaultOpt.url;

		}

		var resAjax = new Promise((resolve, reject) => {

			let currentTime = new Date().getTime()

			if (cache && store.get(defaultOpt.url)) {

				const getCacheTime = store.get(defaultOpt.url).times

				if (currentTime < getCacheTime) {

					resolve(store.get(defaultOpt.url).results)

				} else {

					store.remove(defaultOpt.url)

					ajax(defaultOpt).then((results) => {

						let res = {
							times: new Date().getTime() + expires,
							results
						}

						if (results.status == 1)  {
							store.set(defaultOpt.url, res)
						}
						if (results.status == -3000) {

							console.info(results)
							if (utils.timer) {
								console.info('clearTimer')
								utils.clearTimeout()

							}

							wxOauthLogin()

							reject(results)

						}
						resolve(results)

					})
				}

			} else {

				ajax(defaultOpt).then((results) => {

					let res = {
						times: new Date().getTime() + expires,
						results
					}

					if (cache && results.status == 1)  {
						store.set(defaultOpt.url, res)
					}

					if (results.status == -3000) {

						console.info(results)
						if (utils.timer) {
							console.info('clearTimer')
							utils.clearTimeout()

						}

						wxOauthLogin()

					  reject(results)

					}

					resolve(results)

				})

			}
		})

		return resAjax

}