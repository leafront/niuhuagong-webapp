<template>
	<div class="scroll-view-wrapper order-view">
		<div class="order_menu">
			<div class="order_tit">
				<svg class="ico order_arrow_left" aria-hidden="true">
					<use xlink:href="#icon-jiantou3"></use>
				</svg>
				<span>我的订单</span>
			</div>
			<ul class="order_menu_list">
				<li class="active"><span>全部</span></li>
				<li><span>待支付</span></li>
				<li><span>待发货</span></li>
				<li><span>待收货</span></li>
				<li><span>待评价</span></li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
	
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
	
	.order_tit{
		
		padding-left: .35rem;
		
		height: .94rem;
		
		display:flex;
		
		align-items: center;
		
		border-bottom: 1px solid #ededed;
		
		span{
			
			font-size: .28rem;
			
			color: #252525;
			
			
		}
		
		.order_arrow_left{
			width: .2rem;
			height: .4rem;
			color: #c1c1c1;
			margin-right: .2rem;
		}
		
		
	}
</style>