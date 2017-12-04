<template>
	<div class="pageView">
		<div class="scroll-view-wrapper">
			<SearchBar/>
			<HotSearch/>
		</div>
 </div>
</template>

<script>
	
	import SearchBar from '@/components/search/searchBar'
	
	import HotSearch from '@/components/search/hotSearch'
	
	import { mapActions } from 'vuex'
	
	export default {
		
		components: {

			SearchBar,

			HotSearch
			
		},

		beforeCreate () {

			document.title = '用户搜索'

		},

		methods: {
			
			...mapActions([
				
				'updateIsHeader'
				
			])
			
		}
		
	}
	
	
</script>
