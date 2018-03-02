<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" id="appView" :class="{'visibility':!pageView}">
			<Banner :bannerList="bannerList"/>
			<div class="detail">
				<div class="detail_size">
					<p class="detail_shop_name">{{spu_info.name}}</p>
					<div class="detail_shop_info">
						<p><i>￥</i>{{price | price}}</p>
						<div class="detail_shop_address" v-show="false">
							<span class="detail_shop_express font-s">配送至:</span>
							<strong class="detail_shop_area" @click="updateIsCityPicker(true)">{{selectCityValue.name || '上海 黄浦区'}}</strong>
							<span class="detail_is_shop font-s">有货</span>
						</div>
					</div>
					<div class="detail_wholesale">
						<svg class="ico icon_pifa" aria-hidden="true">
							<use xlink:href="#icon-pifa"></use>
						</svg>
						<p>一次性购物满100kg，可享受<strong>￥10.00/kg</strong></p>
					</div>
					<div class="detail_tag" v-if="specs_info[0]">
						<span class="font-s">{{specs_info[0].spec_name}}：</span>
						<ul class="detail_tag_list">
							<li :class="{'active':typeIndex == index}" v-for="(item,index) in specs_info[0].option" @click="selectType(item,index)">{{item.spec_option_name}}</li>
						</ul>
					</div>
					<div class="detail_tag" v-if="specs_info[1]">
						<span class="font-s">{{specs_info[1].spec_name}}：</span>
						<ul class="detail_tag_list">
							<li :class="{'disabled':selectedList[item.spec_option_id],'active':modelIndex == index}" v-for="(item,index) in specs_info[1].option" @click="selectModel(item,index)">{{item.spec_option_name}}</li>
						</ul>
					</div>
					<div class="detail_cart_num">
						<span class="font-s">数量：</span>
						<div class="cart_num">
							<div class="cart_reduce" @click.stop="changeNum(-1)">
								<i></i>
							</div>
							<input type="tel" class="cart_num_input" @blur="inputProductNum" v-model.trim="proNumber"/>
							<div class="cart_add" @click.stop="changeNum(1)">
								<i class="ico1"></i>
								<i class="ico2"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="detail_sample">
				  <img src="http://111.231.103.97:9999/leidi/product/554164390221428348.jpg"/>
					<div class="sample_info">
						<div class="sample_info_txt">
							<p class="font-s">样品15g/袋</p>
							<p class="font-s">￥1.00</p>
						</div>
						<div class="sample_button">
							<span class="font-s">加购物车</span>
							<span class="font-s">马上试用</span>
						</div>
					</div>
				</div>
				<div class="shop_detail">
					<div class="shop_detail_tit">
						<span></span>
						<h5>商品详情</h5>
						<span></span>
					</div>
					<div class="shop_des" v-html="spu_info.desc">
					</div>
				</div>
			</div>
			<Overlay v-if="isSoldOut">
				<div class="overlay_title" slot="title">
					<h5>设置到货通知</h5>
				</div>
				<div class="overlay_cont" slot="content">
					<div class="shop_enough">
						<p>本商品暂时缺货，</p>
						<p>到货后将通过<strong>手机短信</strong>通知您</p>
						<input type="tel" placeholder="请输入您的手机号码" class="shop_enough_tel"/>
					</div>
					<div class="overlay_submit">
						<span @click="updateOverlayVisible(false)">取消</span>
						<span>确定</span>
					</div>
				</div>
			</Overlay>
		</div>
		<div class="detail_cart" :class="{'page_bottom':isWeixinIphoneX}">
			<div class="detail_icon">
				<div class="detail_icon_item">
					<svg class="ico icon-shoucang" aria-hidden="true">
						<use xlink:href="#icon-shoucang"></use>
					</svg>
					<span>收藏夹</span>
				</div>
				<div class="detail_icon_item" @click="pageAction('/cart')">
					<svg class="ico icon-gouwuche" aria-hidden="true">
						<use xlink:href="#icon-gouwuche"></use>
					</svg>
					<span>购物车</span>
				</div>
			</div>
			<div class="detail_join">
				<span class="join_cart" @click="addShopCart">加入购物车</span>
				<span class="join_buy" @click="orderAction">立即购买</span>
			</div>
		</div>
		<CityPicker @hideCityPicker="hideCityPicker" @showCityPicker="showCityPicker"/>
	</div>
</template>

<script>

	import Banner from '@/components/detail/banner'

	import AppHeader from '@/components/common/header'

	import CityPicker from '@/components/widget/CityPicker'

	import Overlay from '@/components/widget/overlay'
	
	import utils from '@/widget/utils'

	import * as Model from '@/model/detail'

	import { mapActions, mapGetters } from 'vuex'

	export default {
		data () {
			return {
				bannerList: [],
				proNumber: 1,
				shop_price: '',
				info: null,
				isSoldOut: false,
				title: '商品详情',
				specs_info: [],
				modelList: [],
				typeIndex: -1,
				modelIndex: -1,
				modelId: '',
				typeId: '',
				skuId: '',
				selectedList: {},
				spu_info: {},
				isWeixinIphoneX: utils.isWeixinIphoneX()
			}
		},
		components: {
			AppHeader,
			Banner,
			CityPicker,
			Overlay
		},
		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView':'getPageView',
				'selectCityValue': 'getSelectCity'
			}),
			price () {
				return this.shop_price * this.proNumber
			}
		},
		methods: {
			...mapActions([
				'updatePageView',
				'updateIsCityPicker',
				'updateSelectCity',
				'updateOverlayVisible',
				'updateScrollPicker'
			]),
			/**
			 * 添加购物车到商品
			 */
			addShopCart () {
				const sku_id =  this.skuId
				const number =  this.proNumber
				
				if (!sku_id) {
					this.$toast('请选择商品类型或型号')
					return
				}
				
				Model.addShopCart({
					type: 'POST',
					data: {
						sku_id,
						number
					}
				}).then((res) => {
					
					const data = res.data
					if (data && res.status == 1) {
						this.$toast(res.msg)
					} else {
						this.$toast(res.msg)
					}
				})
				
			},
			/**
			 * 选择商品类型
			 */
			selectType (item,optIndex) {
				this.skuId = ''
				const typeId = item.spec_option_id
				const selectedModel = []
				const modelList = this.modelList
				const selectedList = this.selectedList
				this.typeIndex = optIndex
				this.modelIndex = -1
				this.typeId = typeId
				this.specs_info[1].option.forEach((item) => {
					let obj = {
						typeId,
						modelId: item.spec_option_id
					}
					selectedModel.push(obj)
				})
		
				selectedModel.forEach((item,index) => {
					
					if (item.typeId == modelList[index].typeId && item.modelId == modelList[index].modelId) {
						selectedList[item.modelId] = false
					} else {
						selectedList[item.modelId] = true
					}
				})
				
				this.selectedList = selectedList
			},
			/**
			 * 选择商品型号
			 */
			selectModel (item,index) {
				
				const { spec_option_id } = item
				const { selectedList, modelList, typeId } = this
				this.modelId = spec_option_id
				if (selectedList[spec_option_id]) {
					this.$toast('商品型号不可选')
					return
				} else {
					modelList.forEach((item) => {
						if (typeId == item.typeId && spec_option_id == item.modelId) {
							this.shop_price = item.price
							this.skuId = item.id
						}
					})
					this.modelIndex = index
				}
			},
			/**
			 * 获取商品详情页信息
			 */
			getProductDetail () {
				
				Model.getProductDetail({
					type: 'GET',
					data: {
						item_id: this.$route.query.id
					}
				}).then((res) => {
					
					const data = res.data
					this.$hideLoading()
					
					if (data && res.status == 1) {
						
						this.updatePageView(true)
						this.specs_info = data.specs_info
						this.bannerList = data.spu_info.img
						this.spu_info = data.spu_info
						this.shop_price = data.spu_info.price
						this.setSelectedList(data.specs_info[1].option)
						this.setModelInfo(data.sku_info)
						
					} else {
						
						this.$toast(res.msg)
						
					}
					
				})
			},
			
			/**
			 *
			 * 设置默认商品类型和型号选中项
			 */
			
			setSelectedList (data) {
				let selectedList = {}
				data.forEach((item) => {
					selectedList[item.spec_option_id] = false
				})
				this.selectedList = selectedList
			},
			/**
			 * 综合合并商品型号和类型列表
			 */
			
			setModelInfo (data) {
				
				let result = []
				
				data.forEach((item,index) => {
					var obj = {
						typeId: item.specs_option[0].spec_option_id,
						modelId: item.specs_option[1].spec_option_id,
						price: item.price,
						id: item.id
					}
					result.push(obj)
				})
				
				this.modelList = result
				
			},
			pageAction (url) {

				if (url) {

					this.$router.push(url)

				}
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

				this.updateSelectCity(addressInfoVal);
				this.updateIsCityPicker(false)
				let addressInfo = Object.assign({},this.addressInfo)
				addressInfo = Object.assign(addressInfo,addressInfoVal.address)
				this.addressInfo = addressInfo

			},
			/**
			 *
			 * 改变商品的输入框数量
			 *
			 */

			inputProductNum () {

				const proNumber = parseInt(this.proNumber)

				if (proNumber <= 0 || !proNumber) {

					this.$toast('单件商品数量不能少于1件')
					this.proNumber = 1
					return

				}

			},
			/**
			 * 购物车中的增加和减少
			 * @param {String} val
			 */

			changeNum (val) {

				let proNumber = parseInt(this.proNumber)

				if (proNumber == 1 && val == -1) {
					this.$toast('单件商品数量不能少于1件')
					return

				}

				proNumber += val
				this.proNumber = proNumber

			},
			/**
			 * 设置商品详情图片大小
			 *
			 */
			setImgWidth () {

				const shopCont = document.querySelector('.shop_des');
				const isChildElement = shopCont.childNodes.length

				if (isChildElement) {
					
					const img = shopCont.getElementsByTagName('img')
					Array.from(img).forEach((item) => {
						item.style.width = '100%'
					})
				}
			},
			/**
			 * 商品立即购买
			 *
			 */
			orderAction () {
				const sku_id =  this.skuId
				const number =  this.proNumber

				if (!sku_id) {
					this.$toast('请选择商品类型或型号')
					return
				}

				location.href = `/order/submit?from=detail&sku_id=${sku_id}&number=${number}`
			}

		},

		beforeCreate () {

			document.title = '商品详情'

		},
		watch: {
			info () {
				setTimeout(() => {
					this.setImgWidth()
				},0)
			}
		},
		created (){

			setTimeout(() => {
				this.updateScrollPicker(true)
			},300)

			this.showLoading()
			this.updatePageView(false)
			this.getProductDetail()
			
		}
	}

</script>

<style lang="scss">
	
	.shop_enough {
		padding: .7rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.shop_enough_tel{
			margin-top: .6rem;
			width: 4.4rem;
			height: .94rem;
			font-size: .32rem;
			padding: .3rem 0 .3rem .34rem;
			border: .01rem solid #cecece;
		}
		p{
			line-height: .44rem;
			font-size: .28rem;
			text-align: center;
			strong{
				color: #008aec;
			}
		}
	}
	
	.shop_des{
		
		img {
			width:100%;
		}
		
	}
	
	.shop_detail_tit{
		
		padding: .5rem 0;
		
		display: flex;
		
		justify-content: center;
		
		align-items: center;
		
		h5 {
			font-size: .38rem;
			color: #252525;
			
			padding: 0 .4rem;
		}
		
		span {
			
			width: 2.1rem;
			height: .22rem;
			
			background: url(./images/shop_line_bg.png) no-repeat;
			
			background-size: 2.1rem .22rem;
			
		}
		
	}
	
	.sample_button{
		
		display: flex;
		
		flex-direction: column;
		
		span {
			
			width: 1.7rem;
			height: .64rem;
			line-height: .64rem;
			
			text-align: center;
			&:first-child {
				color: #252525;
				border: .05rem solid #252525;
				margin-bottom: .15rem;
			}
			&:last-child {
				color: #fe8900;
				border: .05rem solid #fe8900;
			}
			
		}
		
	}
	
	.detail_sample{
		
		margin-top: .9rem;
		
		padding: .25rem .52rem .25rem .25rem;
		
		background: #f6f6f6;
		
		display: flex;
		
		justify-content: space-between;
		
		img {
			width: 2.1rem;
			height: 2.1rem;
			background: #f4f4f8;
		}
		
	}
	
	.sample_info{
		
		padding-left: .5rem;
		
		flex: 1;
		
		display: flex;
		
		justify-content: space-between;
		
		align-items: center;
		
	}
	
	.sample_info_txt{
		
		p {
			color: #252525;
			line-height: .4rem;
		}
	}
	
	.detail_join{
		
		display: flex;
		
		flex: 1;
		
		span {
			
			flex: 1;
			
			font-size: .32rem;
			color: #fff;
			display: flex;
			
			justify-content: center;
			
			align-items: center;
			&.join_cart{
				background: #008aec;
			}
			&.join_buy{
				background: #fe8900;
			}
			
		}
		
	}
	
	.detail_cart{
		display: flex;
	}
	
	.detail_icon{
		
		height: .94rem;
		
		display: flex;
		border-top: .01rem solid #cecece;
		
		border-bottom: .01rem solid #cecece;
		
	}
	
	.detail_icon_item{
		display: flex;
		width: .94rem;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		span{
			font-size: .22rem;
		}
		&:first-child {
			border-right: .01rem solid #cecece;
		}
		.icon-shoucang{
			
			width: .45rem;
			height: .45rem;
			
		}
		.icon-gouwuche{
			
			width: .45rem;
			height: .45rem;
			color: #008aec;
			
		}
	}
	
	.detail_cart_num{
		display: flex;
		span{
			line-height: .53rem;
			padding-right:.18rem;
		}
	}
	
	.cart_reduce{
		
		display:flex;
		
		width: .6rem;
		
		height: .53rem;
		
		justify-content: center;
		
		align-items: center;
		
		border-right: .01rem solid #cecece;
		
		i{
			
			width: .2rem;
			
			height: .03rem;
			
			background: #c1c1c1;
			
		}
		
	}
	
	.cart_add{
		
		width: .6rem;
		
		height: .53rem;
		
		border-left: .01rem solid #cecece;
		
		position:relative;
		
		.ico1{
			width: .2rem;
			
			height: .03rem;
			
			background: #c1c1c1;
			
			display:block;
			
			position:absolute;
			
			left: 50%;
			
			top: 50%;
			
			transform: translate(-50%,-50%);
			
		}
		.ico2{
			
			width: .03rem;
			
			height: .2rem;
			
			background: #c1c1c1;
			
			display:block;
			
			
			position:absolute;
			
			left: 50%;
			
			top: 50%;
			
			transform: translate(-50%,-50%);
		}
		
	}
	.cart_num{
		
		display: flex;
		
		align-items: center;
		
		border: .01rem solid #cecece;
		
		height: .53rem;
		width: 2.04rem;
		
		.cart_num_input{
			
			font-size: .24rem;
			
			color: #252525;
			
			width: .8rem;
			
			height: .53rem;
			
			padding: .1rem 0;
			
			text-align:center;
			
			
		}
		
	}
	
	.detail_tag{
		
		display: flex;
		
		margin-top: .5rem;
		
		span{
		
			padding-right: .18rem;
			line-height: .53rem;
		}
		
		.detail_tag_list {
			flex:1;
			li{
				float: left;
				padding: 0 .2rem;
				height: .53rem;
				line-height: .53rem;
				text-align: center;
				color: #252525;
				border: .01rem solid #d4d4d4;
				margin-right: .18rem;
				margin-bottom: .3rem;
				&.disabled {
					background: #ccc;
					border: .02rem solid #ccc;
				}
				&.active {
					border: .02rem solid #008aec;
				}
			}
		}
		
	}
	
	.detail_wholesale{
		
		height: .7rem;
		
		background: #f6f6f6;
		
		display: flex;
		
		align-items: center;
		.icon_pifa{
			
			width: .7rem;
			height:.7rem;
			color: #fe8900;
		}
		
		p{
			color: #252525;
		}
		strong {
			color: #fe8900;
		}
		
	}

	.detail_size{
		
		padding: 0 .3rem;
		.detail_shop_name {
		
			height: 1.2rem;
			line-height: 1.2rem;
			font-size: .38rem;
			color: #252525;
		}
	}
	
	.detail_shop_info{
		
		display: flex;
		justify-content: space-between;
		height: .86rem;
		
		p{
			color: #fe8900;
			font-size: .48rem;
			i {
				font-size: .3rem;
			}
		}
	}
	.detail_shop_address{
		
		display: flex;
		
		align-items: center;
		
		.detail_shop_express{
			padding-right: .18rem;
			
		}
		.detail_shop_area{
			
			height: .54rem;
			
			line-height: .54rem;
			
			padding: 0 .15rem;
			
			border: .01rem solid #cecece;
			color: #252525;
			
		}
		.detail_is_shop{
			padding-left: .1rem;
		}
	}
</style>

