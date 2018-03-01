<template>
  <div id="app">
	  <SliderMenu/>
    <router-view/>
  </div>
</template>

<script>
	
	import SliderMenu from '@/components/common/sliderMenu'

	import store from '@/widget/store'

	import utils from '@/widget/utils'
	
	import * as Model from '@/model/common'

	import { wxOauthLogin } from '@/widget/common'

	import { mapGetters, mapActions } from 'vuex'
	
	export default {
		components: {
			SliderMenu
		},
		beforeCreate () {
			/**
			 * 获取iconfont 字体文件缓存
			 */
			Model.getIconFont({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {
				
				utils.appendScript(res)
				const expires = 30 * 60 * 1000
				
				let result = {
					times: new Date().getTime() + expires,
					results: res
				}

				if (!store.get('/static/fonts/iconfont.js')) {

					store.set('/static/fonts/iconfont.js', result)

				}
			})

			/**
			 * 获取 fastclick 文件缓存
			 */

			Model.getFastClick({
				type: 'GET',
				dataType: 'text',
				cache: true
			}).then((res) => {

				if (!store.get('/static/fastclick/index.js')) {

					const expires = 30 * 60 * 60 * 1000

					let result = {
						times: new Date().getTime() + expires,
						results: res
					}

					utils.appendScript(res)

					store.set('/static/fastclick/index.js', result)

					if ('addEventListener' in document) {
						document.addEventListener('DOMContentLoaded', function() {
							FastClick.attach(document.body);
						}, false);
					}

				}
			})
		},
		watch: {
			'$route'() {
				this.$nextTick(() => {
					utils.fixedBottom()
				})
			}
		}
	}
	
</script>

<style lang="scss">
	@import './styles/reset.scss';
	@import './styles/main.scss';
	@import './styles/loading.scss';
	@import './styles/toast.scss';
	@import './styles/footer.scss';
	@import './styles/selectMenu.scss';
	@import './styles/slidershow.scss';
</style>
