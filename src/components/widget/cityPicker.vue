<template>
	<div>
		<div class="weui-picker" :class="{'active': isCityPicker}">
			<div class = "weui-picker__hd">
				<span class="weui-picker__action" @click="cancel">取消</span>
				<span class="weui-picker__action" @click="confirm">确定</span>
			</div>
			<div class = "weui-picker__bd">
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in province" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in city" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
				<div class="weui-picker__group">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in area" :key="i">{{item.name}}</li>
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

	import store from '@/widget/store'
	
	import * as Model from  '@/model/common'

	export default {

		data () {

			return {
				num: 3,
				selectCity: [0,0,0],
				province: [],
				scroll: []
			}
		},
		computed: {

			...mapGetters({
				'isCityPicker': 'getIsCityPicker'
			}),
			city () {
				
				if (this.province.length) {

					return  this.province[this.selectCity[0]].city
					
				} else {
					
					return []
				}

			},
			area () {

				if (this.province.length) {
					return this.city[this.selectCity[1]].area
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
				'updateIsOverlayVisible'
			]),

			getCityArea () {
				
				Model.areaCity({
					type: 'GET',
					cache: true
				}).then((res) => {
					
					console.log(res)
					
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
				
				let ids = []

				const province_name = areaCity[this.selectCity[0]].name;
				const province_id = areaCity[this.selectCity[0]].id;
				
				const city_name = areaCity[this.selectCity[0]].city[this.selectCity[1]].name;
				const city_id = areaCity[this.selectCity[0]].city[this.selectCity[1]].id;
				
				const area_name = areaCity[this.selectCity[0]].city[this.selectCity[1]].area[this.selectCity[2]].name;
				const area_id = areaCity[this.selectCity[0]].city[this.selectCity[1]].area[this.selectCity[2]].id;
				
				const results = {
					address: {
				  	province_name,
						province_id,
						city_name,
						city_id,
						area_name,
						area_id
				  },
					name: province_name + ' ' + city_name + ' ' + area_name
				}

				this.$emit('showCityPicker',results)

			},
			scrollList () {

				var This = this;

				var itemHeight = document.querySelector('.weui-picker__item').offsetHeight;

				var len = 3;

				Array.from(document.querySelectorAll('.weui-picker__group')).forEach((item,idx) => {

					var iscroll = new IScroll(item, {
						scrollX: false
					})

					this.scroll.push(iscroll)

					iscroll.on('scrollEnd', function () {
						
					  var itemLen = item.querySelectorAll('.weui-picker__content li').length - 7
						
						var result = ( -this.y / itemHeight);
						
						if (result > itemLen) {
							result = itemLen;
						}

						var index = parseInt(result, 10);

						var diff = result - index;

						if (diff > 0.5) {
							index ++;
						}
						

						This.selectCity.splice(idx,1,index);

						if (idx == 0) {

							This.selectCity = [index, 0 , 0 ];

							for (var j = 1; j < len; j++) {

								This.scroll[j].scrollTo(0,0);

							}

						}
						
						if (idx == 1) {

							This.selectCity.splice(2,1,0);

							This.scroll[idx+1].scrollTo(0,0);
							
						}

						iscroll.refresh();

						iscroll.scrollTo(0, -index * itemHeight);
					})
					iscroll.scrollTo(0, -This.selectCity[idx] * itemHeight);
				})
			}

		},

		watch:{
			province () {
				
				setTimeout(() => {

					this.scrollList()
					
				},0)
			}
			
		}
	}


</script>
