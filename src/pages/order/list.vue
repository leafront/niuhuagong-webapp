<template>
	<div class="pageView">
		<AppHeader :title="title" :backFn="backFn"/>
		<div class="order_menu">
			<ul class="order_menu_list">
				<li v-for="(item,i) in orderTxt" :class="{'active': channel == item.channel}" @click="showTab(item)"><span>{{item.name}}</span></li>
			</ul>
		</div>
		<div class="scroll-view-wrapper order-view" :class="{'visibility':!pageView}">
			<!--全部-->
			<template v-if="orderList && orderList.length">
				<div class="order_tab" :class="{'page_bottom':isWeixinIphoneX}">
					<div class="order_item" v-for="(item,index) in orderList" :key="index">
						<div class="order_item_tit">
							<span>订单号：{{item.order_code}}</span>
							<strong>{{statusTxt[item.status]}}</strong>
						</div>
						<div class="order_info" v-for="(child,cIndex) in item.sku_list" @click="pageAction('/order/detail?order_code='+item.order_code)">
							<img :src="child.img_thumbnail_url"/>
							<div class="order_info_txt">
								<p>{{child.sku_name}}</p>
								<span>{{child.sku_code}}</span>
								<span>{{child.unit_num}}{{child.unit_name}}/{{child.unit}}× {{child.number}}（小计:{{child.unit_num * child.number}}公斤）</span>
								<strong>￥ {{child.price | price}}</strong>
							</div>
						</div>
						<div class="order_money">
							<span>运费:¥ {{item.delivery_price}}(送货上门)</span>
							<div class="order_money_total">
								<strong>合计:</strong>
								<i>￥{{item.total_price | price}}</i>
							</div>
						</div>
						<template v-if="item.status == 10">
							<div class="order_status">
								<button class="order_btn_status"  @click="actionCancelOrder(item)">取消订单 </button>
								<button class="order_btn_status" @click="payAction(item)">我要付款 </button>
							</div>
						</template>
						<template v-if="item.status == 20">
							<div class="order_status">
								<button class="order_btn_status" @click="actionCancelOrder(item)">取消订单 </button>
								<button class="order_btn_status" @click="remindDeliver(item)">提醒发货 </button>
							</div>
						</template>
						<template v-if="item.status == 30">
							<div class="order_status" @click="orderReceipt(item)">
								<button class="order_btn_status">确认收货 </button>
							</div>
						</template>
						<template v-if="item.status == 40">
							<div class="order_status">
								<button class="order_btn_status">已完成</button>
							</div>
						</template>
						<template v-if="item.status == 50">
							<div class="order_status">
								<button class="order_btn_status">已评价</button>
							</div>
						</template>
					</div>
				</div>
				<!--全部-->
			</template>
			<template v-else>
				<div class="order_empty">
					<img src="./images/order_empty_bg.png"/>
					<p>没有订单</p>
				</div>
			</template>
			<Overlay>
				<div class="overlay_title" slot="title">
					<h5>请选择取消订单的理由</h5>
				</div>
				<div class="overlay_cont" slot="content">
					<div class="order_refund">
						<ul class="order_refund_list">
							<li v-for="(item,index) in refundList" @click="selectRefund(item,index)">
								<span>{{item.name}}</span>
								<div class="refund_checked" :class="{'active':refundIndex == index}">
									<svg class="ico refund_checked_ico" aria-hidden="true">
										<use xlink:href="#icon-gou"></use>
									</svg>
								</div>
							</li>
						</ul>
					</div>
					<div class="overlay_submit">
						<span @click="updateOverlayVisible(false)">取消</span>
						<span @click="submitRefund">确定</span>
					</div>
				</div>
			</Overlay>
		</div>
	</div>
</template>

<script>

	import Overlay from '@/components/widget/overlay'
	import AppHeader from '@/components/common/header'
	import wx_pay from '@/widget/wx_pay'
	import { mapActions,mapGetters } from 'vuex'
	import * as Model from '@/model/order'
	import utils from '@/widget/utils'
	export default {
		components: {
			Overlay,
			AppHeader
		},
		data () {
			return {
				orderList: [],
				channel: this.$route.query.channel || "1",
				refundIndex: 0,
				title: '我的订单',
				cancel_id: 1,
				order_code: '',
				refundList:[{
					name: '我不想买了',
					cancel_id: 1
				},{
					name: '商品缺货',
					cancel_id: 2
				},{
					name: '收货信息有误',
					cancel_id: 3
				},{
					name: '商品数量/款式有误',
					cancel_id: 4
				},{
					name: '其他原因',
					cancel_id: 5
				}],
				statusTxt: {
					'10': '待支付',
					'20': '待发货',
					'30': '待收货',
					'40': '待评价 ',
					'50': '已评价',
					'100': '已取消'
				},
				orderTxt: [{
					name:'全部',
					channel: 1
				},{
					name:'待支付',
					channel: 2
				},{
					name:'待发货',
					channel: 3
				},{
					name:'待收货',
					channel: 4
				},{
					name:'待评价',
					channel: 5
				}],
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		mixin: ['loading'],
		beforeCreate () {
			document.title = '我的订单'
		},
		computed: {
			...mapGetters({
				'pageView': 'getPageView'
			}),
		},
		methods: {
			...mapActions([
				'updateOverlayVisible',
				'updatePageView'
			]),
			submitRefund () {
				this.updateOverlayVisible(false)
				Model.cancelOrder({
					type: 'POST',
					data: {
						order_code: this.order_code,
						cancel_id: this.cancel_id
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {
						this.$toast(res.msg)
						const channel = this.channel
						return channel
					} else {
						this.$toast(res.msg)
					}
				}).then((channel) => {

					this.getOrderList(channel)
					
				})
			},
			pageAction (url) {

				this.$router.push(url)

			},
			remindDeliver ({order_code}) {
				Model.remindDeliver({
					type: 'POST',
					data: {
						order_code
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {
						this.$toast(res.msg)
					} else {
						this.$toast(res.msg)
					}
				})
			},
			backFn () {

				this.pageAction('/user/center')

			},

			showTab ({channel}) {

				this.channel = channel

				this.getOrderList(channel)

			},

			selectRefund ({cancel_id},index) {
				this.refundIndex = index
				this.cancel_id = cancel_id
			},
			actionCancelOrder ({order_code,id}) {

				this.order_id = id

				this.order_code = order_code

				this.updateOverlayVisible(true)

			},
			payAction ({order_code}) {

				wx_pay.payInfo.call(this,{channel: 1,order_code})

			},

			/**
			 *
			 * 确认收货
			 */

			orderReceipt ({order_code}) {

				this.$showLoading()

				Model.orderReceipt({
					type: 'POST',
					data: {
						order_code
					}
				}).then((res) => {

					const data = res.data
					this.$hideLoading()
					if (data && res.status == 1) {
						this.$toast(res.msg)
					} else {
						this.$toast(res.msg)
					}
					const channel = this.channel
					return channel
				}).then((channel) => {
					this.getOrderList(channel)
				})
			},
			getOrderList (channel) {
				Model.getOrderList({
					type: 'POST',
					data: {
						channel
					},
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status == 1) {
						this.updatePageView(true)
						this.orderList = data
					} else {
						this.updatePageView(true)
						this.orderList = data
					}
				})
			}
		},
		created() {
			this.updatePageView(false)
			this.showLoading()
			const channel = this.channel
			this.getOrderList(channel)
		}
	}

</script>

<style lang="scss">
	
	.refund_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		margin-right: .3rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		background: #fff;
		
		border: .02rem solid #252525;
		
		&.active{
			
			background: #252525;
			
		}
		.refund_checked_ico{
			
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}
	
	
	
	
	.order_refund_list{
		
		
		li{
			
			display: flex;
			
			justify-content: space-between;
			
			height: .8rem;
			
			align-items: center;
			
			span{
				
				font-size: .3rem;
				
				color: #252525;
				
			}
			
		}
		
	}
	
	.order_refund{
		
		padding: .32rem .35rem;
		
	}
	
	.order_empty{
		
		padding-top: 40%;
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		flex-direction: column;
		
		p{
			
			margin-top: .3rem;
			
			font-size: .28rem;
		}
		
		img{
			
			width: 1.96rem;
			
			height: 1.3rem;
			
		}
		
	}
	
	
	.order_status{
		
		height: .75rem;
		
		display: flex;
		
		align-items: center;
		
		justify-content: flex-end;
		
		padding-right: .26rem;
		
		.order_btn_status{
			
			margin-left: .24rem;
			
			height: .46rem;
			
			line-height: .46rem;
			
			padding: 0 .18rem;
			
			border-radius: .44rem;
			
			color: #252525;
			
			background: #fff;
			
			border:1px solid #a8a8a8;
			
		}
		
	}
	
	.order_money{
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		height: .75rem;
		
		padding: 0 .3rem;
		
		border-bottom: 1px solid #f1f1f1;
		
		span{
			
			color: #252525;
			
		}
		
	}
	
	.order_money_total{
		
		strong{
			
			color: #252525;
		}
		
		span{
			
			color: #252525;
			
		}
		
		i{
			
			color: #fe8900;
			
			font-size: .28rem;
			
			padding-left: .2rem;
			
		}
		
	}
	
	.order_info{
		
		padding: .4rem .3rem;
		
		display: flex;
		
		align-items: center;
		
		border-bottom: 1px solid #f1f1f1;
		
		img{
			
			width: 1.5rem;
			
			height: 1.5rem;
			
		}
		
	}
	
	.order_info_txt{
		
		padding-left: .28rem;
		
		p{
			color: #252525;
			
			padding-bottom: .15rem;
		}
		
		span{
			
			display:block;
			
		}
		
		strong{
			
			padding-top: .15rem;
			
			display:block;
			
			color: #252525;
			
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
		
		strong{
			
			color:#008aec;
			
			&.order_item_status{
				
				color: #a2a2a2;
				
			}
			
		}
		
	}
	
	.order_menu{
		
		background: #fff;
	}
	
	.order-view{
		
		background: #f6f6f6;
	}
	
	.order_menu_list{
		
		height: .75rem;
		
		display: flex;
		
		padding: 0 .24rem;
		
		
		li{
			
			display: flex;
			
			justify-content: center;
			
			align-items: center;
			
			flex: 1;
			
			border-bottom: .04rem solid transparent;
			
			color: #252525;
			
			&.active {
				
				border-bottom: .04rem solid #008aec;
				
			}
			
		}
		
	}
</style>