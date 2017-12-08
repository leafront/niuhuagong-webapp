<template>
  <div id="app">
	  <SliderMenu/>
    <router-view/>
  </div>
</template>

<script>
	
	import SliderMenu from '@/components/common/sliderMenu'
	
	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		components: {
			SliderMenu
		},
		
		
		methods: {

			pageAction (url) {

				this.$router.push(url);

			}

		}
	}
	
</script>

<style lang="scss">
	
	@import './styles/loading.scss';
	@import './styles/toast.scss';
	@import './styles/main.scss';
	@import './styles/footer.scss';
	
</style>
