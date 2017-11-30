<template>
	<div class="shop clearfix">
		<h3>—  热销榜单  —</h3>
		<LazyLoad :options="{ele:'lazyLoad_img',scrollEle: 'appView',errorImg:'./images/default.png'}">
			<ul class="shop_list clearfix" id="lazyLoad">
				<li v-for="item in list">
					<img class="lazyLoad_img" data-src="http://files.niuhuagong.com/img/item/big_60f04603d7f57a5ca877a29f752b7716.jpg" :src="defaultImg"/>
					<p>甲基羟丙基纤维素 HK4M </p>
					<span>赫克力士天普</span>
					<strong><b class="shop_kilo">￥36.00</b>/公斤</strong>
				</li>
			</ul>
		</LazyLoad>
	</div>
</template>
<script>
	
	import LazyLoad from '@/components/widget/lazyLoad'

	import defaultImg from '@/images/default.png'
	
	export default {
		
		components: {

			LazyLoad
			
		},
		
		data () {
			
			return {

				defaultImg,
				
				list: [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined]
				
			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.shop{
		
		padding: 0 .3rem;
		
		h3{
			
			padding:.55rem 0;
			
			font-size: .42rem;
			
			color: #252525;
			
			text-align:center;
			
		}
		
	}
	
	.shop_list{
		
		border-top: 1px solid #ededed;
		
		li{
			
			float: left;
			
			width:50%;
			
			border-bottom: 1px solid #ededed;
			
			text-align:center;
			
			&:nth-child(2n) {
				
				border-left: 1px solid #ededed;
				
			}
			
			p{
				
				color:#252525;
				
			}
			
			span{
				
				color: #a2a2a2;
				
				display:block;
				
				padding-top: .1rem;
				
				padding-bottom: .15rem;
			}
			
			strong{
				
				color: #fe8900;
				
				display:block;
				
				padding-bottom: .52rem;
				
			}
			
			.shop_kilo{
				
				font-weight: bold;
				
				font-size: .28rem;
				
			}
			
			img{
				
				margin: 0.3rem 0;
				
				width: 3rem;
				
				height: 3rem;
				
			}
			
		}
		
	}
	
</style>