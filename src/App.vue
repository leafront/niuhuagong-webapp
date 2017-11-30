<template>
  <div id="app">
		<AppHeader/>
	  <SliderMenu/>
    <router-view/>
  </div>
</template>

<script>
	
	import AppHeader from '@/components/common/header'
	
	import SliderMenu from '@/components/common/sliderMenu'
	
	export default {
		components: {
			AppHeader,
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
