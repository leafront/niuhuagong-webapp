<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper logistics-view" id="appView" :class="{'visibility':!pageView}">
			<template v-if="logisticsInfo.logistics">
				<div class="logistics">
					<div class="logistics_info">
						<div class="logistics_info_icon">
							<svg class="ico icon_wuliu" aria-hidden="true">
								<use xlink:href="#icon-wuliu"></use>
							</svg>
						</div>
						<div class="logistics_info_txt">
							<p>物流公司：{{logisticsInfo.logistics}}</p>
							<p>运单编号：{{logisticsInfo.nu}}</p>
						</div>
					</div>
					<div class="logistics_list">
						<div class="logistics_list_item" :class="{'active': index==0}" v-for="(item,index) in logisticsInfo.data">
							<i class="logistics_circle"></i>
							<div class="logistics_list_time">
								<p>{{item.context}}</p>
								<p class="logistics_timer">{{item.time}}</p>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="ui-empty">
					<img src="./images/order_empty_bg.png"/>
					<p>{{info.message}}</p>
				</div>
			</template>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import * as Model from '@/model/order'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader

		},
		data () {
			return {
				title: '物流详情',
				logisticsInfo: {}
			}
		},
		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView': 'getPageView'
			}),
		},
		beforeCreate () {
			document.title = '物流详情'
		},
		methods: {
			...mapActions([
				'updatePageView'
			]),
			getLogisticsInfo (result) {
				Model.getLogisticsInfo({
					type: 'POST',
					data:result
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status == 1) {
						this.updatePageView(true)
						this.logisticsInfo = data
					}
				})
			}
		},
		created() {
			this.updatePageView(false)
			this.showLoading()
			this.getLogisticsInfo({type:1,order_code:this.$route.query.order_code})
			
		}
	}

</script>

<style lang="scss">
	
	.logistics-view{
		
		background: #fff;
		
	}
	
	.logistics_list_item{
		
		padding: .45rem .65rem .55rem;
		
		background: #fff;
		
		.logistics_circle{
			
			margin-top: .1rem;
			width: .15rem;
			height: .15rem;
			background: #cecece;
			border-radius: 50%;
			float:left;
			&:after{
				content:'';
				display: block;
				width: .01rem;
				height: 1rem;
				background: #cecece;
				
				position: relative;
				
				top: .36rem;
				
				left: .06rem;
				
			}
			
		}
		
		&:last-child{
			
			.logistics_circle{
				&:after{
					
					display:none;
					
				}
			}
		}
		&.active{
			.logistics_circle{
				
				background: #1ba0e5;
				
			}
			
			.logistics_list_time{
				color: #1ba0e5;
				
			}
			
		}
		
	}
	
	.logistics_list_time{
		
		padding-left: .72rem;
		
		color: #9d9d9d;
		.logistics_timer{
			
			padding-top: .12rem;
			
		}
		
	}
	
	.logistics_list{
		
		padding-top: .24rem;
		
		
		background: #f6f6f6;
		
	}
	
	.logistics_info{
		
		padding: .32rem .2rem;
		
		background: #fff;
		
		display: flex;
		
		align-items: center;
		
	}
	
	.logistics_info_txt{
		
		padding-left: .32rem;
		
		p{
			
			line-height: .44rem;
			
			font-size: .28rem;
			
		}
		
	}
	
	.logistics_info_icon{
		
		width: 1.04rem;
		
		height: 1.04rem;
		
		background: #cecece;
		
		border-radius: 50%;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.icon_wuliu{
			
			width: .65rem;
			
			height: .55rem;
			
			color: #fff;
			
		}
		
	}

</style>