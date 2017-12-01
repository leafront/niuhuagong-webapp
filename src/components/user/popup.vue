<template>
	<div class="register_mask" v-show="isPopup">
		<div class="register_cont">
			<div class="register_close" @click="closePopup">
				<svg class="ico register_close_ico" aria-hidden="true">
					<use xlink:href="#icon-close"></use>
				</svg>
			</div>
			<div class="register_title">
				<h4>注册成功!</h4>
			</div>
			<div class="register_bg"></div>
			<div class="register_tips">
				<p>继续完善资料</p>
				<p>可获得<strong>100元</strong>优惠券！</p>
			</div>
			<div class="register_submit">
				<button>马上去完善</button>
			</div>
		</div>
	</div>
</template>


<script>
	
	export default {
		
		
		props: {

			isPopup: {
				
				type: Boolean,
				default: false
				
			}
			
		},
		
		methods: {

			closePopup () {
				
				this.$emit('closeMask',false)
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.register_close{
		
		position:absolute;
		
		padding: .22rem;
		
		right:0;
		
		top:0;
		
		.register_close_ico{
			color:#a2a2a2;
			padding: .12rem;
			width: .24rem;
			height: .24rem;
			
			border-radius: 50%;
		
			border: .03rem solid #a2a2a2;
		}
	}
	
	.register_tips{
		
		padding: .5rem 0;
		
		text-align:center;
		
		p{
			
			font-size: .28rem;
			
			line-height: .42rem;
			
		}
		
		strong{
			
			color:#fe8900;
			
		}
	}
	
	.register_bg{
		
		width: 3.3rem;
		
		height: 3.3rem;
		
		border-radius: 50%;
		
		background:url(./images/register_tips_bg.png) no-repeat #e5f3fd center center;
		
		background-size: 2.32rem 1.8rem;
		
	}
	
	.register_mask{
		
		width: 100%;
		
		height:100%;
		
		position: fixed;
		
		left:0;
		
		top:0;
		
		z-index: 200;
		
		background: rgba(0,0,0,.75)
		
	}
	
	.register_cont{
		
		background: #fff;
		
		position: absolute;
		
		top: 50%;
		
		left: 50%;
		
		padding: 0 1.35rem;
		
		z-index: 300;
		
		transform:translate(-50%,-50%);
		
		display: flex;
		
		align-items: center;
		
		flex-direction: column;
		
	}
	
	.register_title{
		
		padding: .68rem 0;
		
		text-align:center;
		
		h4{
			
			font-size: .42rem;
			
			color: #252525;
			
		}
		
	}
	
	.register_submit{
		
		padding-bottom: .82rem;
		
		width: 100%;
		
		button{
			
			width:100%;
			
			height: .94rem;
			line-height: .94rem;
			
			font-size: .38rem;
			color: #fff;

			
			border-radius: .44rem;
			
			background: #fe8900;
			
		}
		
	}
</style>