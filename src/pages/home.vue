<template>
	<div class="pageView" :class="{'visibility':!pageView}">
		<AppHeader/>
	  <div class="scroll-view-wrapper" id="appView">
		  <Banner :bannerList="bannerList"/>
			<Service/>
		  <Brand :brandList="brandList"/>
		  <div class="service_ad">
				<div class="service_ad_item" v-for="item in adList" @click="locationAction(item.item_landing_url)">
					<img :src="item.item_img_url">
				</div>
		  </div>
		  <List :list="hotList"/>
	  </div>
		<AppFooter/>
</div>
</template>


<script>
	import Banner from '@/components/home/banner'

	import AppHeader from '@/components/home/header'

	import AppFooter from '@/components/common/footer'
	
	import Brand from '@/components/home/brand'
	
	import Service from '@/components/home/service'
	
	import List from '@/components/home/list'
	
	import * as Model from '@/model/home'

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		data () {
		  return {
				bannerList: [],
			  adList:[],
			  hotList: [],
			  brandList: []
		  }
		},
		components: {
			AppHeader,
			AppFooter,
			Banner,
			Brand,
			Service,
			List
		},
		mixin: ['loading'],
		
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			})
		},
		methods: {
			
			...mapActions([
				'updatePageView',
			]),
			pageAction (url) {
				
				if (url) {
					
					this.$router.push(url)
					
				}
			},
			locationAction (url) {
				
				location.href = url
				
			},
			/**
			 * 获取品牌列表信息
			 */
			getBrandList () {
				return Model.getBrandList({
					type: 'GET',
					cache: true,
				}).then((res) => {
					const data = res.data
					if (data && res.status >= 1) {
						this.brandList = data.splice(0,12)
					} else {
						this.$toast(res.msg)
					}
					return res
				})
			},
			/**
			 * 获取首页banner列表
			 *
			 */
			getBannerList () {

				return Model.getBannerList({
					type: 'GET',
					cache: true,
				}).then((res) => {
					const data = res.data

					if (data && res.status >= 1) {
						this.bannerList = data
					} else {
						this.$toast(res.msg)
					}
					return res

				})
			},

			/**
			 * 获取商品列表
			 */
			getProductList () {

				return Model.getProductList({
					type: 'GET',
					cache: true,
				}).then((res) => {
					
					const data = res.data
					if (data && res.status >= 1) {
						
						//this.adList = data.rqxp.item
						this.hotList = data
						
					} else {
						
						this.$toast(res.msg)
						
					}
					return res

				})

			}
			
		},

		beforeCreate () {

			document.title = '牛化工'

		},
		created (){

			this.updatePageView(false)

			Promise.all([
				this.getBannerList(),
				this.getBrandList(),
				this.getProductList()
			]).then((res) => {
				if (res) {
					let isSendSuccess = res.every((item) => {
						return item.status == 1
					})
					if (isSendSuccess) {
						this.updatePageView(true)
						this.$hideLoading()
					}
				}
			})

			this.showLoading()
			
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