<template>
	<div class="pageView">
		<AppHeader/>
	  <div class="scroll-view-wrapper" id="appView">
		  <Banner/>
			<Service/>
		  <div class="service_ad">
				<div class="service_ad_item">
					<img src="./images/ad_banner.png">
				</div>
			  <div class="service_ad_item">
				  <img src="./images/ad_banner.png">
			  </div>
		  </div>
		  <List/>
	  </div>
</div>
</template>

<script>
	
	import Banner from '@/components/home/banner'

	import AppHeader from '@/components/common/header'
	
	import Service from '@/components/home/service'
	
	import List from '@/components/home/list'
	
	export default {
		
		components: {

			AppHeader,

			Banner,

			Service,

			List
			
		},
		
		created (){
		
			
		}
	}
	
</script>

<style lang="scss">
	
	.service_ad{
		
		background: #f2f2f2;
		
		padding: .24rem .2rem;
		
		display:flex;
		
		justify-content: space-between;
		
	}
	.service_ad_item{
		
		img{
			width: 3.42rem;
			height: 2.12rem;
		}
		
	}
	
	
	
</style>