<template>
	
	<div class="overlay" v-show="overlayVisible">
		<div class="overlay_cont">
			<slot name="title"></slot>
			<slot name="content"></slot>
		</div>
	</div>
	
</template>

<script>
	
	import { mapActions, mapGetters } from 'vuex'
	
	export default {
	
		computed: {

			...mapGetters({
				'overlayVisible':'getOverlayVisible'
			})
			
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
		
		border-bottom: .01rem solid #cecece;
		
		h5{
			
			font-size: .38rem;
			
			color: #008aec;
			
			height: 1.3rem;
			
			display:flex;
			
			align-items: center;
			
		}
		
	}
	
	.overlay_cont{
		
		width: 6rem;
	
		position: fixed;
		
		left: 50%;
		
		top: 50%;
		
		transform: translate(-50%,-50%);
		
		background: #fff;
		
	}

</style>