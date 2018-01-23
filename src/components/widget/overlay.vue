<template>
	<div class="overlay" v-show="overlayVisible">
		<div class="overlay_wrapper">
			<slot name="title"></slot>
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	
	import { mapGetters } from 'vuex'
	
	export default {
	
		computed: {
			...mapGetters({
				'overlayVisible':'getOverlayVisible'
			})
			
		},
		
		mounted () {

			/**
			 *
			 * 阻止弹层外的元素滚动
			 */

			this.$el.addEventListener('touchmove',(event) => {

				event.preventDefault()

				event.stopPropagation()

			},false)
			
		}
	
	}
	
</script>

<style lang="scss">
	
	.overlay{
		
		width: 100%;
		
		height: 100%;
		
		position: fixed;
		
		left:0;
		
		top:0;
		
		background:rgba(0,0,0,.75);
		
		z-index:1000;
		
	}
	
	.overlay_title{
		
		padding-left: .35rem;
		
		border-bottom: 1px solid #cecece;
		
		
		h5{
			
			font-size: .38rem;
			
			color: #252525;
			
			height: 1.3rem;
			
			display:flex;
			
			justify-content: center;
			
			align-items: center;
			
		}
		
	}
	
	.overlay_submit{
		
		display: flex;
		
		height: .94rem;
		
		line-height: .94rem;
		
		border-top: 1px solid #cecece;
		
		span{
			
			width:50%;
			
			display:block;
			
			color: #252525;
			
			font-size: .32rem;
			
			text-align:center;
			
			&:first-child {
				
				border-right: 1px solid #cecece;
				
			}
		}
		
	}
	
	.overlay_wrapper{
		
		width: 6rem;
	
		position: fixed;
		
		left: 50%;
		
		top: 50%;
		
		transform: translate(-50%,-50%);
		
		background: #fff;
		
	}

</style>