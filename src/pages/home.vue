<template>
  <div class="scroll-view-wrapper">
	  <Banner/>
	  <AppFooter/>
  </div>
</template>

<script>
	
	import Banner from '@/components/home/banner'

	import AppFooter from '@/components/common/footer'
	
	export default {
		
		components: {

			Banner,

			AppFooter
			
		},
		
		created (){
		
			
		}
	}
	
</script>