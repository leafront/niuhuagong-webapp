<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view" id="appView" :class="{'visibility':!pageView}">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" v-model.trim="addressInfo.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="手机号码" v-model="addressInfo.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<span class="ui-form-text" :class="{'input-place-text':selectCityValue.name}">{{selectCityValue.name}}</span>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" v-model="addressInfo.address_detail" class="ui-form-input"/>
				</div>
				<div class="form_address_default" @click="setDefaultAddress">
					<div class="form_address_checked" :class="{'active': addressInfo.is_default}">
						<svg aria-hidden="true" class="ico ico-gou">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-gou">
							</use>
						</svg>
					</div>
					<span>设为默认地址</span>
				</div>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker" :selectCity="selectCityValue.selectCity"/>
		<div class="ui-submit-button white-view" @click="editUserAddress">
			<span class="submit_button">确定</span>
		</div>
	</div>
</template>

<style lang="scss">
	@import '../address.scss';
	
	

</style>

<script>

	import AppHeader from '@/components/common/header'

	import CityPicker from '@/components/widget/CityPicker'

	import * as Model from '@/model/address'

	import validate from '@/widget/validate'

	import { mapActions, mapGetters } from 'vuex'

	export default {

		components: {
			AppHeader,
			CityPicker

		},
		computed: {
			...mapGetters({
				'selectCityValue': 'getSelectCity',
				'pageView':'getPageView'
			})
		},

		data () {

			return {

				title: '修改地址',
				addressInfo: {
				
				},
				areaAddress:''

			}
			
		},

		mixin: ['loading'],
		beforeCreate () {

			document.title = '修改地址'

		},
		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity',
				'updatePageView',
				'updateScrollPicker'
			]),
			/**
			 * 编辑当前用户地址
			 */
			editUserAddress () {
				
				const {
					province_id,
					city_id,
					district_id,
					is_default,
					area_id,
					name,
					mobile,
					address_detail,
					id:address_id,

				} = this.addressInfo

				if (!name) {

					this.$toast('请输入收货人姓名')

					return

				}

				if (!validate.isName(name)) {
					this.$toast('请输入正确的收货人姓名')
					return
				}

				if (!mobile) {

					this.$toast('请输入手机号码')

					return

				}

				if (!validate.isMobile(mobile)) {
					this.$toast('请输入正确的手机号码')
					return
				}

				if (!this.selectCityValue.name) {

					this.$toast('请输入所选地区')

					return

				}

				if (!address_detail) {

					this.$toast('街道小区等详细地址')

					return

				}

				Model.editUserAddress({
					type: 'POST',
					data:{
						province_id,
						city_id,
						district_id,
						address_detail,
						zip: 430406,
						name,
						mobile,
						address_id,
						is_default
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status == 1) {

						this.$toast('修改成功')
						
						setTimeout(() => {

							this.$router.back()
							
						},2000)

					} else {

						this.$toast(res.msg)

					}

				})
			},

			setDefaultAddress () {
			
				this.addressInfo.is_default = this.addressInfo.is_default ? 0 : 1
			
			},

			/**
			 *
			 * 获取当前用户地址
			 */

			getUserAddress () {

				Model.getUserAddress({
					type: 'POST',
					data: {
						address_id: this.$route.query.id
						
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status >= 1) {

						this.updatePageView(true)

						this.$hideLoading()
						
						data.is_default = parseInt(data.is_default)
						
						if (!data.selectCity) {

							data.selectCity = [0,0,0]
						}

						this.addressInfo = data
						
						const { privince_name, province_id, selectCity, city_name, city_id, district_name, district_id } = data
						
						
						const areaAddress = privince_name + ' ' + city_name + ' ' + district_name
						
						this.updateSelectCity({name:areaAddress,address: {selectCity}})

						this.updateScrollPicker(true)


					} else {

						this.$toast(res.msg)

					}

				})
			},
			/**
			 * 隐藏城市ui控件
			 */
			hideCityPicker () {

				this.updateIsCityPicker(false)

			},

			/**
			 * 显示城市ui控件
			 *
			 * @param {Object} addressInfoVal
			 */

			showCityPicker (addressInfoVal) {

				this.updateSelectCity(addressInfoVal)

				this.updateIsCityPicker(false)
				
				let addressInfo = Object.assign({},this.addressInfo)

				addressInfo = Object.assign(addressInfo,addressInfoVal.address)
				
				this.addressInfo = addressInfo

			}

		},

		created (){

			this.updatePageView(false)

			this.getUserAddress()
			
			this.showLoading()
		
		}
		

	}

</script>