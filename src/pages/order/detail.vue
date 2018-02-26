<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper order_detail" id="appView" :class="{'visibility':!pageView}">
			<div class="order_wrapper" v-if="orderDetail">
				<div class="order_trade" @click="logisticsAction">
					<div class="order_trade_info">
						<svg class="ico icon_fahuo" aria-hidden="true">
							<use xlink:href="#icon-fahuo1"></use>
						</svg>
						<template v-if="orderDetail.status == 10">
							<div class="order_trade_txt">
								<h5>交易待支付</h5>
								<span>2018-01-23 21:51:56</span>
							</div>
						</template>
						<template v-else-if="orderDetail.status == 20">
							<div class="order_trade_txt">
								<h5>交易待发货</h5>
								<p>物流信息：订单开始处理</p>
								<span>2018-01-23 21:51:56</span>
							</div>
						</template>
						<template v-else-if="orderDetail.status == 30">
							<div class="order_trade_txt">
								<h5>交易已发货</h5>
								<p v-if="info.express_name">物流信息：info.express_name info.express_code</p>
								<span>2018-01-23 21:51:56</span>
							</div>
						</template>
						<template v-else-if="orderDetail.status == 40">
							<div class="order_trade_txt">
								<h5>交易已完成</h5>
								<p>物流信息：订单处理完成</p>
								<span>2018-01-23 21:51:56</span>
							</div>
						</template>
					</div>
					<div class="order_trade_arrow" v-show="orderDetail.status == 30 || orderDetail.status == 40">
						<svg class="ico icon_jiantou_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou-right"></use>
						</svg>
					</div>
				</div>
				<div class="order_address" v-if="order_detail">
					<svg class="ico icon_address" aria-hidden="true">
						<use xlink:href="#icon-dizhi1"></use>
					</svg>
					<div class="order_address_info">
						<div class="order_address_txt">
							<span>{{orderDetail.logistics_info.name}}</span>
							<span>{{orderDetail.logistics_info.mobile}}</span>
						</div>
						<p>{{orderDetail.logistics_info.address}}</p>
					</div>
				</div>
				<div class="order_item">
					<div class="order_item_tit">
						<span>订单号：{{orderDetail.order_code}}</span>
					</div>
					<div class="order_info" v-for="(item,index) in orderDetail.sku_list" :key="index">
						<div class="order_info_wrapper">
							<div class="order_img" @click="pageAction('/detail?id='+item.spu_id)">
								<img :src="item.img_thumbnail_url"/>
							</div>
							<div class="order_info_txt">
								<p>{{item.sku_name}}</p>
								<span>{{item.unit_num}}{{item.unit_name}}/{{item.unit}}</span>
							</div>
						</div>
						<div class="order_info_price">
							<span>￥{{item.price | price}}</span>
							<strong>×{{item.number}}</strong>
						</div>
					</div>
				</div>
				<div class="order_detail_info">
			
					<div class="order_info_item">
						<span>商品总价</span>
						<span>￥ {{orderDetail.total_price | price}}</span>
					</div>
					<div class="order_info_item">
						<span>运费</span>
						<span>￥ {{orderDetail.delivery_price | price}}</span>
					</div>
					<div class="order_info_item">
						<span>订单总额</span>
						<strong>￥ {{orderDetail.total_sku_price | price}}</strong>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapGetters, mapActions } from 'vuex'

	import * as Model from '@/model/order'

	export default {

		components: {
			AppHeader
		},
		data () {
			return {
				title: '订单详情',
				id: this.$route.query.id,
				statusTxt: {
					'10': '待支付',
					'20': '待发货',
					'30': '待收货',
					'40': '待评价 ',
					'50': '已评价'
				},
				orderDetail: {},
				info: {}
			}
		},
		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView': 'getPageView'
			}),
		},
		methods: {
			...mapActions([
				'updatePageView'
			]),
			logisticsAction () {

				if (this.orderDetail.status == 30 || this.orderDetail.status == 40) {

					this.pageAction('/order/logistics?order_code='+this.orderDetail.order_code)

				}
			},
			pageAction (url) {

				this.$router.push(url)

			},
			/**
			 * 获取订单详情
			 */
			getOrderDetail () {

				Model.getOrderDetail({
					type: 'POST',
					data: {
						order_code: this.$route.query.order_code
					}
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status >= 1) {
						this.updatePageView(true)
						this.orderDetail = data

					} else {
					
						this.$toast(res.msg)
					}
				})
			}
		},

		beforeCreate () {

			document.title = '订单详情'

		},
		created () {
			this.updatePageView(false)
			this.showLoading()
			this.getOrderDetail()
			
		}
	}
</script>

<style lang="scss">
	
	.order_detail{
		background: #f6f6f6;
	}
	
	.order_detail_info{
		
		margin-top: .24rem;
		
		background: #fff;
		
	}
	
	.order_info_item{
		
		padding: 0 .2rem;
		
		display: flex;
		
		justify-content: space-between;
		
		height: .78rem;
		
		align-items: center;
		
		border: .01rem solid #ededed;
		
		strong{
			
			font-size: .28rem;
			
			color: #f65253;
			
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
	
	.order_item{
		
		background: #fff;
		
		margin-top: .24rem;
		
	}
	
	.order_item_tit{
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: 0 .3rem;
		
		height: .75rem;
		
		border-bottom: 1px solid #f5f5f5;
		
		color: #9d9d9d;
		
	}
	
	.order_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		
		padding-bottom: .15rem;
		
		span{
			
			font-size: .28rem;
			
		}
		
	}
	
	.order_address{
		padding: .34rem .3rem;
		
		background: #fff;
		display: flex;
		
		.icon_address{
			
			width: .41rem;
			
			height: .5rem;
			
			color: #666;
			
		}
		
	}
	
	.order_address_info{
		
		padding-left: .3rem;
		
		flex:1;
		
		p{
			
			color: #9d9d9d;
			
		}
		
	}
	
	.order_trade_txt{
		
		padding-left: .22rem;
		
		h5{
			
			font-size: .3rem;
			
			color: #fff;
			
			line-height: .4rem;
			
		}
		
		p{
			padding-top: .18rem;
			color: #fff;
			
			padding-bottom: .1rem;
			
		}
		
		span{
			
			color: rgba(255,255,255,.5);
		}
		
	}
	
	.order_trade_info{
		
		display: flex;
		.icon_fahuo{
			
			width: .4rem;
			
			height: .35rem;
			
			color: #fff;
			
		}
		
		
	}
	
	.order_trade_arrow{
		
		.icon_jiantou_right{
			
			width: .3rem;
			height: .4rem;
			color:#fff;
		}
		
	}
	
	.order_trade{
		
		display: flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: .4rem .2rem;
		
		background: #1ba0e5;
		
		
	}


</style>
