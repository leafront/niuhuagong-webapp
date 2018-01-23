import utils from './utils'

/**
 *
 * @param {Object} optionsAjax
 * arguments
 * type:'GET',
 * timeout: 3000,
 * headers:{
	 *  Content-Type:'application/json'
	 * },
 * data:{
	 *  name:'leafront'
	 * }
 *
 * @returns {Promise}
 */

export default function ajax (optionsAjax){


	var options = Object.assign({},optionsAjax)

	var ajax = new Promise((resolve, reject) => {

		var xhr = new XMLHttpRequest()

		xhr.open(options.type, options.url, options.async)

		xhr.timeout = options.timeout

		//设置请求头
		for (var k in options.headers) {

			xhr.setRequestHeader(k, options.headers[k])
		}

		xhr.setRequestHeader("If-Modified-Since","0")

		xhr.setRequestHeader("Cache-Control","no-cache")

		xhr.responseType = options.dataType

		xhr.onreadystatechange = () => {

			if(xhr.readyState == 4){

				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

					resolve(xhr.response)

				} else {
					console.error(xhr.statusText)
					resolve({
						data:[],
						status: -500,
						msg: '网络服务错误'
					})

				}
			}

		}

		options.type == "GET" ? xhr.send(null) : 	xhr.send(options.data)

	})

	return ajax

}