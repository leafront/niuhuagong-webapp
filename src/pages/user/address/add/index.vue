<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper white-view" id="appView">
			<div class="form_address">
				<div class="ui-form-item">
					<input type="text" placeholder="收货人姓名" v-model.trim="addressInfo.name" class="ui-form-input"/>
				</div>
				<div class="ui-form-item">
					<input type="tel" placeholder="手机号码" v-model.trim="addressInfo.mobile" class="ui-form-input"/>
				</div>
				<div class="ui-form-item" @click="updateIsCityPicker(true)">
					<span class="ui-form-text" :class="{'input-place-text':selectCityValue.name}">{{selectCityValue.name || '请选择收货地址 '}}</span>
				</div>
				<div class="ui-form-item">
					<input type="text" placeholder="街道小区等详细地址" v-model.trim="addressInfo.address_detail" class="ui-form-input"/>
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
		<div class="ui-submit-button" @click="addUserAddress">
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
				'selectCityValue': 'getSelectCity'
			})
		},

		data () {
			return {
				fromOrder: this.$route.query.order,
				title: '新建地址',
				addressInfo: {
					city_id: '',
					is_default:0,
					province_name:'',
					province_id: '',
					district_id: '',
					name: '',
					zip: 430406,
					mobile: '',
					address_detail: ''
				}
			}
		},
		created () {
			setTimeout(() => {
				this.updateScrollPicker(true)
			},0)
			if (this.fromOrder) {
				this.addressInfo.is_default = 1
			}
		},
		methods: {

			...mapActions([
				'updateIsCityPicker',
				'updateSelectCity',
				'updateScrollPicker'
			]),
			pageAction (url) {
				this.$router.push(url)
			},

			setDefaultAddress () {
				if (!this.fromOrder) {
					this.addressInfo.is_default = this.addressInfo.is_default ? 0 : 1
				}
			},
			/**
			 * 新建当前用户地址
			 */
			addUserAddress () {
				const {
					province_id,
					city_id,
					district_id,
					name,
					mobile,
					address_detail,
					is_default

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
				Model.addUserAddress({
					type: 'POST',
					data: {
						province_id,
						city_id,
						district_id,
						address_detail,
						zip: 430406,
						name,
						mobile,
						is_default
					}
				}).then((res) => {

					const data = res.data
					if (data && res.status == 1) {
						if (this.fromOrder) {
							this.pageAction(this.fromOrder)
						} else {
							this.$router.back()
						}
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
		
		beforeCreate () {
			document.title = '新建地址'
		}
	}

</script>