
import * as Model from '@/model/common'

const wx_pay = {

	/**
	 * 获取微信支付配置参数去支付
	 * @param {String} orderId
	 *
	 */
	payInfo ({order_code,channel}) {

		this.showLoading()
		Model.getPayInfo({
			type: 'POST',
			data: {
				order_code,
				channel
			}
		}).then((data) => {

			this.$hideLoading()

			return data

		}).then((res) => {

			const data = res.data

			if (data && res.status ==1 ) {

				wx_pay.wxBridgePay.call(this,JSON.parse(data.jsApiParameters),order_code)

			} else {

			 this.$toast(res.msg)

			}
		}).catch(() => {

			this.$hideLoading()

			this.$toast('网络服务器错误')

		})

	},

	/**
	 * 检查支付API是否成功支付
	 *  @param {String} order_id
	 */

	checkPayInfo (order_code) {
		Model.checkPayInfo({
			type: 'POST',
			data: {
				order_id: order_code,
			}
		}).then(() => {

			window.location.href = `/order/detail?order_code=${order_code}`

		})

		setTimeout(() => {
			window.location.href = `/order/detail?order_code=${order_code}`
		},3000)
	},

	/**
	 * 调起微信支付
	 * @param {Object} jsApiParameters
	 * @param {String} order_id
	 * @param {String} order_code
	 */
	wxBridgePay (jsApiParameters,order_code) {

		const onBridgeReady = () =>{
			WeixinJSBridge.invoke('getBrandWCPayRequest',
				jsApiParameters, (res) => {

					if (res.err_msg == "get_brand_wcpay_request:ok") {

						this.$toast('支付成功')
						wx_pay.checkPayInfo(order_code)

					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {

						this.$toast('取消支付')

					} else if (res.err_msg == "get_brand_wcpay_request:fail") {

						this.$toast('支付失败')
					}
			})
		}

		if (typeof WeixinJSBridge == "undefined"){

			if( document.addEventListener ){

				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)

			}else if (document.attachEvent){

				document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
			}
		}else{

			onBridgeReady()
		}

	}
}

export default wx_pay

