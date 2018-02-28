<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="cart_tit" v-show="pageView">
			<h5>我的购物车<i v-show="selectNum">（{{selectNum}}）</i></h5>
			<span v-show="isDelete" @click="delCartShop">删除</span>
		</div>
		<div class="scroll-view-wrapper cart-view" id="appView" :class="{'visibility':!pageView}">
			<div class="cart_list">
				<LazyLoad :list="list" :options="{ele:'lazyLoad_img',scrollEle: 'appView'}">
					<div class="cart_list_item" v-for="(item,index) in list" :key="index">
						<div class="list_checked_circle" @click="selectItem(item)">
							<div class="list_item_checked" :class="{'active': cartList[item.shop_cart_id]}">
								<svg class="ico cart_checked_ico"  aria-hidden="true">
									<use xlink:href="#icon-gou"></use>
								</svg>
							</div>
						</div>
						<div class="cart_img" @click="pageAction('/detail?id='+ item.spu_id)">
							<div class="lazyLoad_img" :data-src="item.img_thumbnail_url"></div>
						</div>
						<div class="cart_info">
							<p>{{item.sku_specs_desc}}</p>
							<span>{{item.unit_num}}{{item.unit_name}}/{{item.unit}} （小计:{{item.unit_num * numList[index]}}{{item.unit_name}}）</span>
							<div class="cart_info_txt">
								<strong>￥{{item.price | price}}</strong>
								<div class="cart_num">
									<div class="cart_reduce" @click.stop="changeCart(item,index,-1)">
										<i></i>
									</div>
									<input type="tel" class="cart_num_input" @blur="changeNum(item,index)" v-model.trim="numList[index]"/>
									<div class="cart_add" @click.stop="changeCart(item,index,1)">
										<i class="ico1"></i>
										<i class="ico2"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</LazyLoad>
			</div>
			<template v-if="!list || !list.length">
				<div class="cart_empty">
					<img src="./images/cart_empty.png"/>
					<p>购物车空空如也</p>
				</div>
			</template>
		</div>
		<div class="settlement" :class="{'visibility':!pageView}">
			<div class="sett_item">
				<div class="sett_item_select" @click="selectAll">
					<div class="list_item_checked" :class="{'active':isAllSelect}">
						<svg class="ico cart_checked_ico" aria-hidden="true">
							<use xlink:href="#icon-gou"></use>
						</svg>
					</div>
					<i>全选</i>
				</div>
				<div class="sett_total">
					<span>合计：</span>
					<strong>￥{{totalPrice | price}}</strong>
				</div>
			</div>
			<div class="sett_computed" @click="shopAction">
				<span>结算<i v-show="selectNum">({{selectNum}})</i></span>
			</div>
		</div>
		<AppFooter/>
	</div>
</template>

<script>

	import LazyLoad from '@/components/widget/lazyLoad'

	import AppHeader from '@/components/common/header'

	import AppFooter from '@/components/common/footer'

	import utils from '@/widget/utils'
	
	import * as Model from '@/model/cart'

	import { mapActions, mapGetters } from 'vuex'
	
	export default {
		
		components: {

			LazyLoad,
			AppFooter,
			AppHeader

		},
		mixin: ['loading'],
		data () {
			return {
				cartList:{},
				title: '购物车',
				list: [],
				numList:[]
			}
		},
		methods: {

			...mapActions([
				'updatePageView',
			]),
			pageAction (url) {
				
				this.$router.push(url)
				
			},
			
			/**
			 * 获取购物车商品列表
			 */
			getCartList () {
				Model.getCartList({
					type: 'GET'
				}).then((res) => {

					this.$hideLoading()
					const data = res.data
					if (data && res.status == 1) {
						this.list = data
						const cartList = {}
						let  numList = []

						this.list.forEach((item) => {

							cartList[item.shop_cart_id] = false
							numList.push(parseInt(item.number))

						})

						this.cartList = cartList
						this.numList = numList

						this.updatePageView(true)
					} else {
						this.$toast(res.msg)
					}
					
				})
			},
			
			/**
			 * 添加购物车商品数量
			 *
			 */
			updateShopCart (index,cartNum,data) {

				Model.updateShopCart({
					type: 'POST',
					data
				}).then((res) => {

					const data = res.data
					if (data && res.status == 1) {
						this.numList.splice(index,1,cartNum)
					} else {
						this.$toast(res.msg)
					}
				})
			},
			/**
			 *
			 * return {String} cart_id
			 */

			getCartIds () {

				const { list, cartList } = this
				let cart_id = []
				list.forEach((item) => {

					if (cartList[item.shop_cart_id]) {
						cart_id.push(item.shop_cart_id)
					}
				})

				cart_id = cart_id.join(',')

				return cart_id
			},
			/**
			 * 删除购物车商品
			 */

			delCartShop () {

				const cart_id =  this.getCartIds()
			
				Model.delCartShop({
					type: 'POST',
					data: {
						shop_cart_id: cart_id
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {
						this.$toast(res.msg)
						this.deleteItem()
					} else {
						this.$toast(res.msg)
					}
					
				})
			
			},
			/**
			 * 选中购物车中的一项
			 * @param id
			 *
			 */

			selectItem ({shop_cart_id}) {
				
				this.cartList[shop_cart_id] = !this.cartList[shop_cart_id]
				
			},

			/**
			 * 购物车中的增加和减少
			 * @param {Number} index
			 * @param {Number} val
			 */

			changeCart (item,index,val) {
				
				let cartNum = parseInt(this.numList[index])
				
				if (cartNum == 1 && val == -1) {
					
					this.$toast('单件商品数量不能少于1件')
					return
					
				}
				cartNum += val
				const data = {
					shop_cart_id: item.shop_cart_id,
					number: cartNum
				}
				
				this.updateShopCart(index,cartNum,data)
			
			},

			/**
			 * 全选或者全不选的实现
			 *
			 * @param null
			 *
			 */

			selectAll () {
				const list = this.list
				const cartList = this.cartList
				
				if (this.isAllSelect) {
					
					list.forEach(({shop_cart_id}) => {
						cartList[shop_cart_id] = false
					})
					
				} else {
					
					list.forEach(({shop_cart_id}) => {
						cartList[shop_cart_id] = true
					})
					
				}
			},

			/**
			 * 删除购物车中的一项
			 *
			 * @param null
			 */

			deleteItem () {
				
				const cartList = this.cartList
				const list = this.list
				
				for (let len = list.length, i = len - 1; i >=0; i--) {
					
					if (cartList[list[i].shop_cart_id]) {
						
						this.numList.splice(i,1)
						this.list.splice(i,1)
					}
				}
			},

			changeNum (item,index) {
				
				const cartNum = parseInt(this.numList[index])
			
				if (cartNum == 0 || !cartNum) {
					this.$toast('单件商品数量不能少于1件')
					this.numList.splice(index,1,1)
					return
				}
				
				const data = {
					shop_cart_id: item.shop_cart_id,
					number: cartNum
				}

				this.updateShopCart(index,cartNum,data)
			
			},
			shopAction () {
				const cart_id =  this.getCartIds()
				if (!cart_id) {
					this.$toast('请选择购物车中的商品')
					return
				}
				location.href = `/order/submit?from=cart&cart_ids=${cart_id}`
			},
			
		},
		computed:{
			...mapGetters({
				'pageView':'getPageView'
			}),
			/**
			 * 判断购物车中的商品是否全选
			 *
			 * @param null
			 *
			 * @returns {Boolean} isSelect
			 */
			
			isAllSelect () {
				
				const list = this.list
				const carList = this.cartList
				let isSelect = false

				if (list && list.length) {
					isSelect = list.every(({shop_cart_id}) => {
						return carList[shop_cart_id]
					})
					
				}
				
				return isSelect
				
			},

			/**
			 * 判断购物车中的商品是否有一个选中
			 * 如有，则可以显示删除按钮
			 *
			 * @param null
			 *
			 * @returns {Boolean} isDelete
			 */
			
			isDelete () {
				
				const list = this.list
				const cartList = this.cartList
				
				const isDelete = list.some(({shop_cart_id}) => {
					return cartList[shop_cart_id]
				})

				return isDelete
				
			},

			/**
			 *
			 * 选中购物车中的商品数量
			 *
			 * @param null
			 *
			 * @returns {Number} num
			 */
			
			selectNum () {
				
				let num = 0
				const cartList = this.cartList
				
				this.list.forEach(({id}) => {

					if(cartList[id]) {
						num ++
					}
				})
				
				return num
				
			},

			/**
			 *
			 * 购物车中的商品总价计算
			 *
			 * @param null
			 *
			 * @returns {Number} totalPrice
			 */
			
			totalPrice () {
				
				const cartList = this.cartList
				const numList = this.numList
				let totalPrice = 0
				
				this.list.forEach(({price,shop_cart_id},index) => {

					if (cartList[shop_cart_id]) {
						totalPrice += numList[index] * price
					}
					
				})
				
				return totalPrice
			
			}
		},

		beforeCreate () {

			document.title = '我的购物车'

		},
		created () {

			this.updatePageView(false)

			this.showLoading()
			
			this.getCartList()
			
		}
		
	}
	
</script>

<style lang="scss">
	
		.cart_empty{
			
			padding-top: 50%;
			
			display: flex;
			
			align-items: center;
			
			justify-content: center;
			
			flex-direction: column;
			
			p{
				
				margin-top: .44rem;
				
				font-size: .28rem;
				
			}
			
		}
	
	 .sett_total{
		
		 padding-left: .3rem;
		
		 font-size: .28rem;
		
		 display: flex;
		
		 flex:1;
		 
		 span{
			 
			 color: #252525;
			 
		 }
		 
		 strong{
			 
			 color:#fe8900;
			 
		 }
		 
	 }
	
	.sett_computed{
		
		height: 1.02rem;
		
		width: 2.5rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: center;
		
		background: #fe8900;
		
		span{
			
			font-size: .38rem;
			
			color: #fff;
		
		}
	
	}
	
	.settlement{
	
		height: 1.02rem;
		
		display:flex;
		
		align-items: center;
		
		background: #fff;
		
	}
	
	.sett_item{
	
		flex:1;
		
		display: flex;
		
		padding-left: .3rem;
		
		height: 1.02rem;
		
		align-items: center;
		
		justify-content: space-between;
		
		border-top: .01rem solid #d6d6d6;
		
		i{
			
			font-size: .28rem;
			
			color: #252525;
			
		}
	}
	
	.sett_item_select{
		
		height: 1.02rem;
		
		display: flex;
		
		padding-right: .4rem;
		
		align-items: center;
		
	}
	
	.cart-view{
		
		background: #f6f6f6;
		
	}
	
	.cart_info_txt{
		
		display:flex;
		
		justify-content: space-between;
		
		padding-top:.1rem;
		
		strong{
			
			color: #fe8900;
			
			font-size: .28rem;
			
		}
		
	}
	
	.cart_reduce{
		
		display:flex;
		
		width: .6rem;
		
		height: .5rem;
		
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
		
		height: .5rem;
		
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
		
		height: .5rem;
		
		.cart_num_input{
			
			font-size: .24rem;
			
			color: #252525;
			
			width: .8rem;
			
			text-align:center;
			
			
		}
		
	}
	
	.cart_info{
		
		flex:1;
		
		p{
			color:#252525;
			
			padding-bottom: .1rem;
		}
		
	}
	

	.cart_tit{
		
		background: #fff;
		
		height: .92rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		padding-left: .3rem;
		
		font-size: .28rem;
		
		color:#252525;
		
		span{
			
			height: .92rem;
			
			line-height: .92rem;
			
			padding-right: .3rem;
			
			padding-left: 1rem;
			
		}
		
		h5{
			font-size: .28rem;
		}
		
	}
	
	.cart_list{
		
		margin-top: .24rem;
		
		background: #fff;
		
		
	}
	
	.cart_list_item{
	
		padding: 0.38rem 0.3rem 0.38rem 0;
		
		display: flex;
		
		align-items: center;
		
		border-bottom:.01rem solid #ededed;
		
		&:last-child{
			border-bottom:0;
		}
		
	}
	
	.list_checked_circle{
		
		display: flex;
		
		padding-left: .3rem;
		
		align-items: center;
		
		height: 1.6rem;
		
	}
	
	.list_item_checked{
		
		width: .4rem;
		
		height: .4rem;
		
		border-radius: 50%;
		
		margin-right: .3rem;
		
		background: #fff;
		
		border: .02rem solid #252525;
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		&.active{
			
			background: #252525;
			
		}
		.cart_checked_ico{
			
			width: .26rem;
			height: .2rem;
			color: #fff;
			
		}
	}
	
	.cart_img{
		
		padding-right: .3rem;
		.lazyLoad_img{
			width: 1.6rem;
			height: 1.6rem;
			background-color: #f2f2f2;
			background-size: 100% auto;
		}
	}
</style>