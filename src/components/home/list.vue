<template>
	<div class="shop clearfix">
		<h3>—  热销榜单  —</h3>
		<LazyLoad :list="list" :options="{ele:'lazyLoad_img',scrollEle: 'appView'}">
			<ul class="shop_list clearfix" id="lazyLoad">
				<li v-for="item in list" @click="pageAction('/detail?id='+item.item_id)">
					<div class="lazyLoad_img" :data-src="item.item_img_url"/>
					<p>{{item.item_name}}</p>
					<span>{{item.item_desc}}</span>
					<strong><b class="shop_kilo">￥{{item.price | price }}</b>/公斤</strong>
				</li>
			</ul>
		</LazyLoad>
	</div>
</template>
<script>
	
	import LazyLoad from '@/components/widget/lazyLoad'

	import defaultImg from '@/images/default.png'
	
	export default {
		props:{
			list:{
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data () {
			
			return {
				defaultImg
			}
		},
		components: {
			LazyLoad
		},
		methods: {
			pageAction (url) {
				
				this.$router.push(url)
				
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
				
				padding-right: .3rem;
				
				&:nth-child(2n) {
					padding-left: .3rem;
				}
				
			}
			
			span{
				
				color: #a2a2a2;
				display:block;
				padding: .1rem .3rem .15rem;
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
			
			.lazyLoad_img{
				
				margin: 0.3rem 0;
				
				width: 3rem;
				
				height: 3rem;
				
				background-size: 100% auto;
				
			}
			
		}
		
	}
	
</style>