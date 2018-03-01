<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility':!pageView}">
			<div class="order_submit">
				<template v-if="userAddress.address_id">
					<div class="submit_address" @click="pageAction('/user/address?from=order')">
						<svg aria-hidden="true" class="ico icon_address">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dizhi1">
							</use>
						</svg>
						<div class="submit_address_info">
							<div class="submit_address_txt">
								<span>收货人：{{userAddress.name}}</span>
								<span>{{userAddress.mobile}}</span>
							</div>
							<p>收货地址：{{userAddress.address}}</p>
						</div>
						<svg class="ico order_arrow_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</template>
				<template v-else>
					<div class="submit_order_item" @click="pageAction('/user/address?from=order')">
						<span>收货地址</span>
						<div class="submit_order_menu">
							<strong>请添加收货地址</strong>
							<svg aria-hidden="true" class="ico order_arrow_right">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou-right">
								</use>
							</svg>
						</div>
					</div>
				</template>
				<div class="order_submit_list">
					<div class="order_info" v-for="(item,index) in orderInfo">
						<div class="order_info_wrapper">
							<div class="order_img">
								<img :src="item.img_thumbnail_url"/>
							</div>
							<div class="order_info_txt">
								<p>{{item.sku_name}}</p>
								<span>{{item.unit_num + item.unit_name + '/' + item.unit}}</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥{{item.price | price}}</span>
							<strong>×{{item.number}}</strong>
						</div>
					</div>
				</div>
				<div class="order_submit_price">
					<div class="submit_order_item">
						<span>运费</span>
						<div class="submit_order_menu">
							<strong>￥{{priceInfo.delivery_price | price}}</strong>
						</div>
					</div>
					<div class="submit_order_item">
						<span>应付总额</span>
						<div class="submit_order_menu">
							<strong>￥{{priceInfo.total_price | price}}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="order_submit_btn" :class="{'page_bottom':isWeixinIphoneX}">
			<div class="order_total_price">
				<span>实付款：</span>
				<p><small>￥</small>{{priceInfo.total_sku_price | price}}</p>
			</div>
			<button @click="createOrder">立即支付</button>
		</div>
	</div>
</template>
<script>

	import AppHeader from '@/components/common/header'

	import utils from '@/widget/utils'
	
	import * as Model from '@/model/order'

	import wx_pay from '@/widget/wx_pay'

	import { mapGetters, mapActions } from 'vuex'

	export default {

		components: {
			AppHeader
		},
		data () {
			return {
				title: '提交订单',
				isWeixinIphoneX: utils.isWeixinIphoneX(),
				orderInfo: [],
				userAddress: {},
				priceInfo: {},
			}
		},
		computed: {
			...mapGetters({
				'pageView': 'getPageView'
			}),
		},
		mixin: ['loading'],
		beforeCreate () {
			document.title = '提交订单'
		},
		methods: {
			...mapActions([
				'updatePageView'
			]),
			pageAction (url) {
				this.$router.push(url)
			},
			/**
			 * 商品创建订单
			 */
			createOrder () {
				
				const address_id = this.userAddress.address_id
				const {from, sku_id, cart_ids,number } = this.$route.query
				
				if (!address_id) {
					this.$toast('请选择收货地址')
					return
				}
				let data = {}
				if (from == 'detail') {
					data = {
						channel: 1,
						address_id,
						number,
						sku_id,
						is_need_invoice: 0
					}
				} else {
					data = {
						channel: 2,
						address_id,
						shop_cart_str: cart_ids,
						is_need_invoice: 0
					}
				}
				
				this.showLoading()
				Model.createOrder({
					type: 'POST',
					data
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status == 1) {
						const order_code = data.order_code
						return order_code
					} else {
						this.$toat(res.msg)
						return
					}
				}).then((order_code) => {

					if (order_code) {

						wx_pay.payInfo.call(this,{order_code,channel:1})

					}
				}).catch((err) => {
					
					this.$toast('网络服务错误')
					
				})
			},
			getCreateOrderInfo (results) {
				Model.getCreateOrderInfo({
					type: 'POST',
					data: results
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status == 1) {
						this.updatePageView(true)
						this.orderInfo = data.sales_sku_data
						this.userAddress = data.sales_default_address_data
						this.priceInfo = {
							"total_sku_atom_price": data.total_sku_atom_price,
							"total_sku_price": data.total_sku_price,
							"delivery_price": data.delivery_price,
							"total_price": data.total_price,
						}
					}
				})
			}
		},
		created () {
			this.updatePageView(false)
			this.showLoading()
			const {
				sku_id,
				number,
				cart_ids,
				from
			} = this.$route.query
			
			let data = {}
			
			if (from == 'detail') {
				data = {
					channel: 1,
					sku_id,
					number
				}
			} else {
				data = {
					channel: 2,
					shop_cart_str: cart_ids
				}
			}
			this.getCreateOrderInfo(data)
			
		}
	}

</script>

<style lang="scss">
	
	.submit_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		
		flex:1;
	}
	
	.submit_address_info{
		
		color: #666;
		
		font-size: .28rem;
		
		display: flex;
		
		flex:1;
		
		flex-direction: column;
		
		margin-left: .15rem;
		
		p{
			
			i{
				
				padding-right: .05rem;
				
			}
		}
		
	}
	.submit_address{
		
		background: #fff;
		
		padding: .3rem .2rem;
		
		display: flex;
		
		align-items: center;
		
		.order_arrow_right{
			
			width: .3rem;
			height: .6rem;
			color: #666;
			margin-left: .15rem;
			
		}
		.icon_address{
			
			width: .45rem;
			
			height: .5rem;
			color: #666;
			
		}
		
	}
	
	.order_submit_btn{
		
		background: #fff;
		
		margin-top:.24rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-top: .01rem solid rgba(0,0,0,.1);
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		button{
			
			width: 2.3rem;
			
			height:.95rem;
			
			background: #f65253;
			
			line-height: .96rem;
			
			color: #fff;
			
			font-size: .3rem;
			
		}
		
	}
	
	.order_total_price{
		
		padding-left: .3rem;
		
		height:.95rem;
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		span{
			
			font-size: .3rem;
		}
		
		p{
			font-size: .4rem;
			
			color: #ff3c25;
			
			small{
				
				vertical-align: middle;
				
				font-size: .24rem;
			}
		}
		
	}
	
	.order_submit_price{
		
		margin-top: .24rem;
		
	}
	
	.order_submit_list{
		
		background: #fff;
		
		margin-top: .24rem;
		
	}
	
	
	.submit_order_item{
		
		height: 1rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding:0 .25rem;
		
		font-size: .28rem;
		
		border-bottom: .01rem solid rgba(0,0,0,.1);
		
		background: #fff;
		
		color: #666;
		
	}
	
	.submit_order_menu{
		
		display: flex;
		
		align-items: center;
		
		height: 1rem;
		
		.order_arrow_right{
			padding-left: .2rem;
			width: .25rem;
			height: .5rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.order_info{
		
		padding: .4rem .3rem;
		
		display: flex;
		
		border-bottom: 1px solid #f1f1f1;
		
		justify-content: space-between;
		
	}
	
	.order_img{
		
		padding-right: .3rem;
		
		img{
			
			width: 1.2rem;
			
			height: 1.2rem;
			
		}
		
		
	}
	
	.order_info_txt{
		
		display: flex;
		
		flex-direction: column;
		
		p{
			color: #252525;
			
			line-height: .44rem;
			
		}
		
		span{
			
			display:block;
			
		}
		
		
	}
	
	.order_info_wrapper{
		
		display: flex;
		
	}
	
	.order_info_price{
		
		span{
			font-weight: bold;
			line-height: .44rem;
		}
		strong{
			
			color:#9d9d9d;
			
			display: block;
			
			text-align: right;
			
		}
	}
</style>
