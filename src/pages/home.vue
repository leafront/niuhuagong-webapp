<template>
	<div class="pageView">
		<AppHeader/>
	  <div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
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

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		
		components: {

			AppHeader,

			Banner,

			Service,

			List
			
		},
		
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},
		
		methods: {
			
			...mapActions([
				'updatePageView',
			])
			
		},

		beforeCreate () {

			this.$showLoading()

			document.title = '牛化工'

		},
		created (){

			this.updatePageView(false)
		
			setTimeout(() => {
				this.$hideLoading()

				this.updatePageView(true)
				
			},700)
			
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