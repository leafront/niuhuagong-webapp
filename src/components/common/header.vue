<template>
	<div class="header" v-show="!isWeixin">
		<div class="header_back" @click="backAction">
			<svg class="ico order_arrow_left" aria-hidden="true">
				<use xlink:href="#icon-jiantou-left"></use>
			</svg>
		</div>
		
		<slot></slot>
		<span>{{title}}</span>
	</div>
</template>

<script>

	export default {

		props:['backFn','title'],

		data () {

			const  ua = window.navigator.userAgent.toLowerCase();
			const isWeixin = ua.match(/MicroMessenger/i) == 'micromessenger'

			return {
				isWeixin
			}

		},

		methods: {

			backAction () {

				if (this.backFn) {
					this.backFn()

				} else {
					this.$router.back()
				}

			}

		}

	}

</script>

<style lang="scss">
	
	.header_back{
		
		padding-left: .2rem;
		
		width: 1rem;
		
		height: .85rem;
		
		display: flex;
		
		align-items: center;
		
	}
	
	.header{
		
		height: .85rem;
		
		display:flex;
		
		align-items: center;
		
		border-bottom: .01rem solid rgba(0,0,0,0.1);
		
		background:#fff;
		
		position:relative;
		
		span{
			
			font-size: .34rem;
			
			color: #252525;
			
			width: 4rem;
			
			position:absolute;
			
			text-align: center;
			
			display: block;
			
			left:50%;
			
			transform: translateX(-50%);
			
		}
		
		.order_arrow_left{
			width: .6rem;
			height: .45rem;
			color: #666;
			margin-right: .05rem;
		}
	}

</style>