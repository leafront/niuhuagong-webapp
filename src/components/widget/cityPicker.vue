<template>
	<div>
		<div class="weui-picker" :class="{'active': isCityPicker,'page_bottom':isWeixinIphoneX}">
			<div class = "weui-picker__hd">
				<span class="weui-picker__action" @click="cancel">取消</span>
				<span class="weui-picker__action" @click="confirm">确定</span>
			</div>
			<div class = "weui-picker__bd">
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" :class="{'weui-picker_item_active':selectCityValue.address.selectCity[0]==i}" v-for="(item,i) in province" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" :class="{'weui-picker_item_active':selectCityValue.address.selectCity[1]==i}" v-for="(item,i) in city" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item":class="{'weui-picker_item_active':selectCityValue.address.selectCity[2]==i}"  v-for="(item,i) in area" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div></div>
		</div>
		<div class="weui-mask" :class="{'active':isCityPicker}" @click="cancel"></div>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex'

	import IScroll from '@/lib/IScroll'

	import utils from '@/widget/utils'

	import store from '@/widget/store'

	import * as Model from  '@/model/common'

	export default {
		data () {

			return {
				num: 3,
				province: [],
				scroll: [],
				isScroll: false,
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		computed: {

			...mapGetters({
				'isCityPicker': 'getIsCityPicker',
				'selectCityValue': 'getSelectCity',
				'isScrollPicker': 'getIsScrollPicker'
			}),
			city () {

				const {selectCity} = this.selectCityValue.address

				if (this.province.length) {

					return  this.province[selectCity[0]].city

				} else {

					return []
				}

			},
			area () {
				const {selectCity} = this.selectCityValue.address

				if (this.province.length) {
					return this.city[selectCity[1]].area
				} else {
					return []
				}

			}
		},
		created () {

			this.getCityArea()
		},
		methods: {
			...mapActions([
				'updateSelectCity',
				'updateIsCityPicker',
				'updateIsOverlayVisible',
				'updateScrollPicker'
			]),

			getCityArea () {

				Model.areaCity({
					type: 'GET',
					cache: true
				}).then((res) => {

					this.province = res.data

					const expires = 24 * 60 * 60 * 1000

					let result = {
						times: new Date().getTime() + expires,
						results: res
					}

					if (!store.get('/static/data/areaCity.js')) {
						store.set('/static/data/areaCity.js', result)
					}
				})

			},

			cancel () {

				this.$emit('hideCityPicker')

			},

			confirm () {

				const areaCity = this.province

				const {selectCity} = this.selectCityValue.address

				const provinceIndex = selectCity[0]
				const cityIndex = selectCity[1]
				const areaIndex = selectCity[2]

				const province_name = areaCity[provinceIndex].name;
				const province_id = areaCity[provinceIndex].id;

				const city_name = areaCity[provinceIndex].city[cityIndex].name;
				const city_id = areaCity[provinceIndex].city[cityIndex].id;

				const area_name = areaCity[provinceIndex].city[cityIndex].area[areaIndex].name;
				const district_id = areaCity[provinceIndex].city[cityIndex].area[areaIndex].id;

				const results = {
					address: {
						province_id,
						city_id,
						district_id,
						selectCity: [provinceIndex,cityIndex,areaIndex]
					},
					name: province_name + ' ' + city_name + ' ' + area_name,
				}

				this.$emit('showCityPicker',results)

			},
			scrollList () {

				var This = this;

				var itemHeight = document.querySelector('.weui-picker__item').offsetHeight;

				var len = 3;

				const selectCityValue = Object.assign({},this.selectCityValue)

				let selectCity = Object.assign([],selectCityValue.address.selectCity)

				Array.from(document.querySelectorAll('.weui-picker__group')).forEach((item,idx) => {

					var iscroll = new IScroll(item, {
						scrollX: false
					})

					this.scroll.push(iscroll)

					iscroll.on('scrollEnd', function () {

						var itemLen = item.querySelectorAll('.weui-picker__content li').length - 7

						var result = ( -this.y / itemHeight)

						if (result > itemLen) {
							result = itemLen
						}

						var index = parseInt(result, 10)

						var diff = result - index

						if (diff > 0.5) {
							index ++;
						}


						selectCity.splice(idx,1,index)

						if (idx == 0) {

							selectCity = [index, 0 , 0 ]

							for (var j = 1; j < len; j++) {

								This.scroll[j].scrollTo(0,0)

							}

						}

						if (idx == 1) {

							selectCity.splice(2,1,0);

							This.scroll[idx+1].scrollTo(0,0)

						}

						selectCityValue.address.selectCity = selectCity
						
						This.updateSelectCity(selectCityValue)

						iscroll.refresh()

						iscroll.scrollTo(0, -index * itemHeight)
					})

					this.scroll[idx].scrollTo(0, -selectCity[idx] * itemHeight)
				})
			}

		},

		watch:{

			isScrollPicker () {

				setTimeout((() => {
					this.scrollList()
				}),0)

			}
		},
		/**
		 * 销毁组件选中状态
		 *
		 */
		beforeDestroy (){

			this.updateSelectCity({name:'',address:{selectCity:[0,0,0]}})
			this.updateScrollPicker(false)

		}
	}


</script>
