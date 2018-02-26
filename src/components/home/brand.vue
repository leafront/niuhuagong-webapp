<template>
	<div class="brand">
		<h3>—  热销品牌  —</h3>
		<ul class="brand_list">
			<li v-for="(item,index) in brandList" :key="index"><img :src="item.brand_img"/></li>
		</ul>
	</div>
</template>


<style lang="scss">
	.brand{
		background: #f2f2f2;
		h3 {
			line-height: 1.05rem;
			height: 1.05rem;
			text-align: center;
			color: #252525;
			font-size: .32rem;
		}
	}
	.brand_list{
		padding: 0 .28rem .22rem .3rem;
		display: flex;
		flex-wrap: wrap;
		li {
			width: 25%;
			border-right: .02rem solid #f2f2f2;
			border-bottom: .02rem solid #f2f2f2;
			height: 1rem;
			img{
				width: 100%;
				height: 100%;
			}
			&:nth-child(3n) {
				padding-right:0;
			}
		}
	}
	
</style>

<script>
	
	export default {
		props: {
			brandList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			pageAction (url) {
				this.$router.push(url)
			}
		}
	}
</script>