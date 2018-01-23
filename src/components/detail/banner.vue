<template>
	<swiper :list="bannerList" :showWay="showWay">
		<ul class="slideshow-item">
			<li v-for="item in bannerList" :style="{'width':itemWidth}" @click="pageAction(item.landing_url)">
				<img :src="item.img_url" :style="{'height':itemWidth}">
			</li>
		</ul>
	</swiper>
</template>

<script>

	import swiper from '@/components/widget/swiper.vue'

	export default {
		props: {
			bannerList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		components:{
			swiper
		},
		data () {
			return {
				showWay: 'detail_banner',
				itemWidth: document.documentElement.clientWidth + 'px',
			}
		},
		methods: {

			pageAction (url) {

				if (url) {

					location.href = url

				}

			}
		}
	}
</script>

