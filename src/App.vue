<template>
  <div id="app">
		<AppHeader/>
    <router-view/>
  </div>
</template>

<script>
	
	import AppHeader from '@/components/common/header'
	
	export default {
		components: {
			AppHeader,
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
