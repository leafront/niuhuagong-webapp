<template>
	<div class="pageView">
		<div class="scroll-view-wrapper center-view" :class="{'visibility':!pageView}">
			<div class="user_pic">
				<div class="user_pic_info" @click="pageAction('/user/info')">
					<img :src="userInfo.head_img"/>
					<div class="user_info_txt">
						<span>{{userInfo.name}}</span>
						<button class="user_info_tips">完整度50%</button>
					</div>
				</div>
				<div class="user_setting">
					<svg class="ico user_set_ico" aria-hidden="true">
						<use xlink:href="#icon-shezhi"></use>
					</svg>
				</div>
			</div>
			<div class="user_order">
				<div class="user_order_tit" @click="orderAction('/order/list')">
					<span>我的订单</span>
					<div class="order_arrow">
						<strong>查看全部订单</strong>
						<svg class="ico order_arrow_right" aria-hidden="true">
							<use xlink:href="#icon-jiantou"></use>
						</svg>
					</div>
				</div>
				<div class="user_menu">
					<ul class="user_menu_list">
						<li @click="orderAction('/order/list?channel=2')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-daifukuan"></use>
								</svg>
							</div>
							<span>待支付</span>
						</li>
						<li @click="orderAction('/order/list?channel=3')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-fahuo"></use>
								</svg>
							</div>
							<span>待发货</span>
						</li>
						<li @click="orderAction('/order/list?channel=4')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-daishouhuo"></use>
								</svg>
							</div>
							<span>待收货</span>
						</li>
						<li @click="orderAction('/order/list?channel=5')">
							<div class="order_status">
								<svg class="ico order_status_ico" aria-hidden="true">
									<use xlink:href="#icon-pingjia"></use>
								</svg>
							</div>
							<span>待评价</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="order_link">
				<div class="order_link_item" @click="pageAction('/user/address')">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-icon-yxj-address"></use>
					</svg>
					<span>收货地址管理</span>
				</div>
				<div class="order_link_item">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-fapiao"></use>
					</svg>
					<span>发票信息管理</span>
				</div>
				<div class="order_link_item">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-shoucangjia"></use>
					</svg>
					<span>收藏夹</span>
				</div>
				<div class="order_link_item">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-xiaoxi"></use>
					</svg>
					<span>消息中心</span>
					<i class="order_notice_num"></i>
				</div>
				<div class="order_link_item" @click="logoutAction">
					<svg class="ico order_link_ico" aria-hidden="true">
						<use xlink:href="#icon-tuichu"></use>
					</svg>
					<span>退出</span>
				</div>
			</div>
		</div>
		<AppFooter/>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import AppFooter from '@/components/common/footer'
	
	import * as Model from '@/model/user'
	
	import {userLoginState} from '@/widget/common'

	import { mapActions,mapGetters } from 'vuex'
	
	import store from '@/widget/store'
	
	export default {
		
		data () {
			return {
				userInfo: {}
			}
		},
		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView': 'getPageView'
			}),
		},
		components: {
			AppFooter
		},
		beforeCreate () {

			document.title = '个人中心'

		},
		created () {
			this.getUserInfo()
		},
		methods: {
			...mapActions([
				'updatePageView'
			]),
			pageAction (url) {
				
				this.$router.push(url)
				
			},
			logoutAction () {
				Model.userLogout({
					type: 'POST'
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {
						this.$toast(res.msg)
						setTimeout(() => {
							this.pageAction('/user/login')
						},3000)
					} else {
						this.$toast(res.msg)
					}
				})
			},
			orderAction (url) {
				location.href = url
			},
			getUserInfo () {
				this.updatePageView(false)
				this.showLoading()
				const userInfo = store.get('NHG_USER')
				if (userInfo) {
					this.updatePageView(true)
					this.userInfo = userInfo
				} else {
					userLoginState()
					.then((res) => {
						const data = res.data
						this.$hideLoading()
						if (res.status == 1) {
							this.userInfo = data
							this.updatePageView(true)
						} else {
							this.pageAction('/user/login?redirect=' + this.$route.fullPath)
						}

					})
				}
			}
		}
		
	}
	
</script>

<style lang="scss">
	
	.center-view{
		
		background: #f2f2f2;
		
	}
	
	.order_link{
		
		margin-top: .2rem;
		
		background: #fff;
		
		padding-left: .28rem;
		
	}
	.order_link_item{
		
		height: 1.02rem;
		
		display:flex;
		
		align-items: center;
		
		border-bottom: 1px solid #ededed;
		
		span{
		
			color: #252525;
			
			font-size: .28rem;
			
		}
		
		.order_notice_num{
			
			width: .18rem;
			
			height: .18rem;
			
			background: #fe8900;
			
			border-radius: 50%;
			
			position:relative;
			
			left: .1rem;
			
			top: -0.05rem;
			
		}
		
		.order_link_ico{
			
			margin-right: .25rem;
			
			width: .4rem;
			
			height: .4rem;
			
			color:#252525;
			
		}
		
	}
	
	.user_pic{
	
		height: 2.52rem;
		
		background:url(./images/user_bg.jpg) no-repeat;
		
		background-size:100% auto;
		
		padding-left:.5rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
	
	}

	.user_pic_info{
		
		display: flex;
		
		flex:1;
		
		align-items: center;
		
		img{
			width: 1.2rem;
			height: 1.2rem;
			border-radius: 50%;
			border: 4px solid #fff;
		}
	}
	.user_info_txt{
		
		padding-left: .3rem;
		
		span{
			
			font-size: .32rem;
			
			color:#fff;
			display:block;
		}
		
		.user_info_tips{
			
			font-size: .21rem;
			
			background:transparent;
			
			margin-top: .18rem;
			
			border:2px solid #fff;
			
			color: #fff;
			
			padding: 0 .24rem;
			
			height: .44rem;
			
			border-radius: .24rem;
			
		}
	}
	
	.user_setting{
		
		padding:.6rem .5rem .5rem 1rem;
		
		.user_set_ico{
			width: .6rem;
			height: .6rem;
			color:#fff;
		}
	}
	.user_order{
		
		padding-left:.28rem;
		
		background: #fff;
		
		
	}
	
	.order_arrow{
		
		display:flex;
		
		align-items: center;
		
		padding-right: .28rem;
	}
	.user_order_tit{
		
		height: .92rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		border-bottom: 1px solid #ededed;
		
		span{
			color:#252525;
			
			font-size: .28rem;
		}
		
		.order_arrow_right{
			width: .2rem;
			height: .4rem;
			color: #c1c1c1;
		}
		
	}
	.user_menu_list{
		
		height: 1.66rem;
		
		display:flex;
		
		align-items: center;
		
		li{
			
			justify-content: center;
			
			align-items: center;
			
			display:flex;
			
			flex-direction: column;
			
			flex:1;
			
			span{
				
				color:#252525;
			}
		
		}
	}
	.order_status{
		
		position: relative;
		
		.order_status_ico {
			
			width: .6rem;
			
			height: .6rem;
			
			color: #cecece;
		}
		.order_status_num{
			
			width: .4rem;
			height: .4rem;
			
			border-radius: 50%;
			
			border: .03rem solid #fe8900;
			
			font-size: .21rem;
			color: #fe8900;
			line-height: .4rem;
			
			text-align:center;
			
			background: #fff;
			
			display:block;
			
			position:absolute;
			
			right: -0.2rem;
			
			top: -0.2rem;
			
		}
	}
</style>