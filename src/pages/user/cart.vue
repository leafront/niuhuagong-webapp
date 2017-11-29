<template>
	<div class="scroll-view-wrapper cart-view">
		<div class="cart_tit">
			<h5>我的购物车<i>（12）</i></h5>
			<span>删除</span>
		</div>
		<template v-if="list && list.length">
		<div class="cart_list">
				<div class="cart_list_item" v-for="item in list">
					<div class="list_item_checked">
						<svg class="ico cart_checked_ico" @click="pageAction('/user/cart')" aria-hidden="true">
							<use xlink:href="#icon-gou"></use>
						</svg>
					</div>
					<div class="cart_img">
						<img src="//img.alicdn.com/imgextra/i3/17413633/TB225tKecjI8KJjSsppXXXbyVXa_!!0-saturn_solar.jpg_210x210.jpg" />
					</div>
					<div class="cart_info">
						<p>阿克苏诺贝尔可再分散乳胶粉 易来泰ELOTEX 60W</p>
						<span>25公斤/包 （小计:25公斤）</span>
						<div class="cart_info_txt">
							<strong>￥568</strong>
							<div class="cart_num">
								<div class="cart_reduce">
									<i></i>
								</div>
								<input type="tel" class="cart_num_input" value="1"/>
								<div class="cart_add">
									<i class="ico1"></i>
									<i class="ico2"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
		</div>
		</template>
		<template v-else>
			<div class="cart_empty">
				<img src="./images/cart_empty.png"/>
				<p>购物车空空如也</p>
			</div>
		</template>

		<div class="bottom-placeholder"></div>
		<div class="settlement">
			<div class="sett_item">
				<div class="sett_item_select">
					<div class="list_item_checked active">
						<svg class="ico cart_checked_ico" @click="pageAction('/user/cart')" aria-hidden="true">
							<use xlink:href="#icon-gou"></use>
						</svg>
					</div>
					<i>全选</i>
				</div>
				<div class="sett_total">
					<span>合计：</span>
					<strong>￥900.00</strong>
				</div>
			</div>
			<div class="sett_computed">
				<span>结算<i>(5)</i></span>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		
		data () {
			
			return {
				
				list: [undefined,undefined,undefined,undefined,undefined,undefined]
				
			}
			
		},
		beforeCreate () {

			document.title = '用户购物车'

		}
		
	}
	
</script>

<style lang="scss">
	
		.cart_empty{
			
			padding-top: 50%;
			
			display: flex;
			
			align-items: center;
			
			justify-content: center;
			
			flex-direction: column;
			
			p{
				
				margin-top: .44rem;
				
				font-size: .28rem;
				
			}
			
		}
	
	 .sett_total{
		 
		 padding-right: .3rem;
		
		 font-size: .28rem;
		 
		 span{
			 
			 color: #252525;
			 
		 }
		 
		 strong{
			 
			 color:#fe8900;
			 
		 }
		 
	 }
	
	.sett_computed{
		
		height: 1.02rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		background: #fe8900;
		
		padding: 0 .54rem;
		
		span{
			
			font-size: .38rem;
			
			color: #fff;
		
		}
	
	}
	
	.bottom-placeholder{
		
		height: 1.02rem;
		
	}
	
	.settlement{
	
		height: 1.02rem;
		
		position: fixed;
		
		width: 100%;
		
		left: 0;
		
		bottom:0;
		
		display:flex;
		
		align-items: center;
		
		background: #fff;
		
	}
	
	.sett_item{
	
		flex:1;
		
		display: flex;
		
		padding-left: .3rem;
		
		height: 1.02rem;
		
		align-items: center;
		
		justify-content: space-between;
		
		border-top: 1px solid #d6d6d6;
		
		i{
			
			font-size: .28rem;
			
			color: #252525;
			
		}
	}
	
	.sett_item_select{
		
		display: flex;
		
		align-items: center;
		
	}
	
	.cart-view{
		
		background: #f6f6f6;
		
	}
	
	.cart_info_txt{
		
		display:flex;
		
		justify-content: space-between;
		
		padding-top:.1rem;
		
		strong{
			
			color: #fe8900;
			
			font-size: .28rem;
			
		}
		
	}
	
	.cart_reduce{
		
		display:flex;
		
		width: .41rem;
		
		height: .42rem;
		
		justify-content: center;
		
		align-items: center;
		
		border-right: 1px solid #cecece;
		
		i{
			
			width: .2rem;
			
			height: .03rem;
			
			background: #c1c1c1;
			
		}
		
	}
	
	.cart_add{
		
		width: .41rem;
		
		height: .42rem;
		
		border-left: 1px solid #cecece;
		
		position:relative;
		
		.ico1{
			width: .2rem;
			
			height: .03rem;
			
			background: #c1c1c1;
			
			display:block;
			
			position:absolute;
			
			left: 50%;
			
			top: 50%;
			
			transform: translate(-50%,-50%);
			
		}
		.ico2{
			
			width: .03rem;
			
			height: .2rem;
			
			background: #c1c1c1;
			
			display:block;
			
			
			position:absolute;
			
			left: 50%;
			
			top: 50%;
			
			transform: translate(-50%,-50%);
		}
		
	}
	
	.cart_num{
		
		display: flex;
		
		align-items: center;
		
		border: 1px solid #cecece;
		
		height: .42rem;
		
		.cart_num_input{
			
			font-size: .24rem;
			
			color: #252525;
			
			width: .8rem;
			
			text-align:center;
			
			
		}
		
	}
	
	.cart_info{
		
		flex:1;
		
		p{
			color:#252525;
			
			padding-bottom: .1rem;
		}
		
	}
	

	.cart_tit{
		
		
		background: #fff;
		
		height: .92rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding: 0 .3rem;
		
		font-size: .28rem;
		
		color:#252525;
		
		h5{
			font-size: .28rem;
		}
		
	}
	
	.cart_list{
		
		margin-top: .24rem;
		
		padding-left: .3rem;
		
		background: #fff;
		
		
	}
	
	.cart_list_item{
	
		padding: 0.38rem 0.3rem 0.38rem 0;
		
		display: flex;
		
		align-items: center;
		
		border-bottom:1px solid #ededed;
		
		&:last-child{
			border-bottom:0;
		}
		
	}
	
	.list_item_checked{
		
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
		.cart_checked_ico{
			
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}
	
	.cart_img{
		
		padding-right: .3rem;
		
		img{
			
			vertical-align: top;
		
			width: 1.6rem;
			height: 1.6rem;
			
			background: #f2f2f2;
		}
	}
</style>