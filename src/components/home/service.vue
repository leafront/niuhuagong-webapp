<template>
	<div class="home_service">
		<ul class="service_menu">
			<li>
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-zhengpin"></use>
				</svg>
				<span>正品保障</span>
			</li>
			<li>
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-zhifu"></use>
				</svg>
				<span>安全支付</span>
			</li>
			<li>
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-wuliu"></use>
				</svg>
				<span>闪电发货</span>
			</li>
			<li>
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-jishu1"></use>
				</svg>
				<span>技术支持</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
	.home_service{
		
		padding: .45rem 0;
		
	}
	
	.service_menu{
		
		display:flex;
		
		align-items: center;
		
		li{
			
			display:flex;
			
			flex-direction: column;
			
			align-items: center;
			
			flex:1;
			
			justify-content: center;
			
			position:relative;
			
			&:after{
				
				width:.02rem;
				height: .8rem;
				content:'';
				
				background:#f0f0f0;
				
				position:absolute;
				
				right:0;
				
				top: .12rem;
				
				
			}
			
			&:last-child{
				
				&:after {
					
					display: none;
				}
				
			}
			.foot_icon{
				
				width: .55rem;
				height: .55rem;
				color: #252525;
			}
			span{
				
				font-size: .21rem;
				
				color:#252525;
				
				padding-top: .18rem;
				
			}
		}
	}
</style>