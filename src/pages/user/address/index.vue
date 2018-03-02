<template>
	<div class="pageView">
		<AppHeader :title="title" :backFn="backFn"></AppHeader>
		  <div class="scroll-view-wrapper white-view" :class="{'visibility':!pageView}">
			  <div class="address_title_wrapper">
				  <div class="address_title">
					  <h5>地址管理</h5>
					  <span @click="deleteUserAddress" v-show="isDelete && !isFromOrder">删除</span>
				  </div>
			  </div>
				<div class="select_address_item" v-for="(item,index) in list">
					<div class="ui-checked"  @click="selectItem(item.id,index)">
						<div class="ui-checked-radio" :class="{'active':selectAddress[item.id]}">
							<svg class="ico ui-checked-ico"  aria-hidden="true">
								<use xlink:href="#icon-gou"></use>
							</svg>
						</div>
					</div>
					<div class="select_address_info">
						<div class="select_address_txt">
							<span>{{item.name}}</span>
							<span>{{item.mobile}}</span>
						</div>
						<p>{{item.privince_name + ' ' + item.city_name + ' ' + item.district_name + ' ' +item.address_detail}}</p>
					</div>
					<div class="select_address_edit" @click="editAction(item.id)">
						<svg aria-hidden="true" class="ico icon-bianji">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-bianji">
							</use>
						</svg>
					</div>
				</div>
			  <div class="select_address_add" @click="addAction">
				  <svg aria-hidden="true" class="ico icon-jia">
					  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jia"></use>
				  </svg>
				  <span>新建地址</span>
			  </div>
		  </div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import { mapActions, mapGetters } from 'vuex'
	
	import store from '@/widget/store'
	
	import * as Model from '@/model/address'

	export default {

		components: {
			AppHeader
		},

		data () {
			const fromOrder = window.encodeURIComponent(this.$route.query.order)
			const isFromOrder = this.$route.query.order ? true : false
			
			return {
				isFromOrder,
				fromOrder,
				list: [],
				title: '地址管理',
				selectNum: 1,
				selectAddress:{}
			}
			
		},

		mixin: ['loading'],
		computed: {
			...mapGetters({
				'pageView':'getPageView'
			}),
			isDelete () {
				
				const list = this.list
				const selectAddress = this.selectAddress
				
				const isDelete = list.some((item) => {

					return  selectAddress[item.id]
				
				})
				
				return isDelete
				
			}
		},

		methods: {

			...mapActions([
				'updatePageView',
			]),
			addAction () {
				if (this.isFromOrder) {
					this.pageAction('/user/address/add?order='+this.fromOrder)
				} else {
					this.pageAction('/user/address/add')
				}
			},
			editAction (id) {
				if (this.isFromOrder) {
					this.pageAction(`/user/address/edit?id=${id}&?order='+this.fromOrder`)
				} else {
					this.pageAction(`/user/address/edit?id=${id}`)
				}
				
			},
			backFn () {

				this.pageAction('/user/center')
			},
			/**
			 * 删除用户地址
			 */
			deleteUserAddress () {

				const selectAddress = this.selectAddress

				const list = this.list
				
				let resultsId = []

				list.forEach((item) => {
					
					if (selectAddress[item.id]) {

						resultsId.push(item.id)
						
					}
				})

				resultsId = resultsId.join(',')
				
				Model.deleteUserAddress({
					type: 'POST',
					data: {
						address_id: resultsId
					}
				}).then((res) => {

					const data = res.data

					if (data && res.status == 1) {
						
						for (let len = list.length, i = len - 1; i >=0; i--) {

							if (selectAddress[list[i].id]) {
								this.list.splice(i,1)
							}
						}
						
						this.$toast('删除成功')
						
					} else {

						this.$toast(res.msg)

					}
				})
				
			},
			
			/**
			 * 获取用户地址列表
			 *
			 */

			getUserAddress () {
				
				Model.getUserAddressList({
					type: 'GET'
				}).then((res) => {
					
					const data = res.data

					if (data && res.status == 1) {

						this.updatePageView(true)

						this.$hideLoading()

						this.list = data

						let selectAddress = {}
						const fromOrder = this.$route.query.order
						data.forEach((item) => {
							if (fromOrder && item.is_default == 1) {
								selectAddress[item.id] = true
							} else {
								selectAddress[item.id] = false
							}

						})

						this.selectAddress = selectAddress

					} else {

						this.$toast(res.msg)

					}
				
				})
			},

			pageAction(url) {

				this.$router.push(url)

			},
			selectItem (id,index) {
				const {list, selectAddress} = this
				this.selectAddress[id] = !this.selectAddress[id]
				const fromOrder = this.$route.query.order
				if (fromOrder) {
					const results = this.list[index]
					results.is_default = 1
					results.address_id = results.id
					const {
						address_id,
						province_id,
						city_id,
						district_id,
						address_detail,
						zip,
						name,
						mobile,
						is_default
					} = results
					Model.editUserAddress({
						type: 'POST',
						data: {
							address_id,
							province_id,
							city_id,
							district_id,
							address_detail,
							zip,
							name,
							mobile,
							is_default
						}
					}).then((res) => {

						const data = res.data
						if (data && res.status >= 1) {
							this.pageAction(fromOrder)
						} else {
							this.$toast(res.msg)
						}
					})
				}
			}
		},
		beforeCreate () {
			document.title = '地址管理'
		},
		created (){

			this.updatePageView(false)
			this.getUserAddress()
			this.showLoading()

		}

	}

</script>

<style lang="scss">
	
	@import '../../../styles/header_tit.scss';
	
	.select_address_txt{
		
		display: flex;
		
		justify-content: space-between;
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
	}
	
	
	.select_address_add{
		
		padding: .7rem 0;
		
		display: flex;
		
		align-items: center;
		
		flex-direction: column;
		
		.icon-jia{
			
			width: .9rem;
			height: .9rem;
			
			color: #cecece;
			
		}
		
		span{
			
			font-size: .32rem;
			
			color: #9d9d9d;
			
			padding-top: .2rem;
			
		}
		
	}
	
	.select_address_edit{
		
		width:.7rem;
		
		height: 1.46rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		margin-left: .15rem;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.select_address_item{
		
		height: 1.46rem;
		
		padding-right:.3rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}
	
	.select_address_info{
		
		flex:1;
		
		p{
			
			color: #9d9d9d;
			
		}
	}
	
	.address_edit{
		
		width:.7rem;
		
		height: .8rem;
		
		display: flex;
		
		justify-content: flex-end;
		
		align-items: center;
		
		.icon-bianji{
			
			width: .38rem;
			height: .35rem;
			color: #9d9d9d;
			
		}
		
	}
	
	.address_txt{
		
		display: flex;
		
		font-size: .28rem;
		
		padding-bottom: .15rem;
		
		align-items: center;
		
		strong{
			
			padding-left: .3rem;
			
		}
		
	}
	
	
	.address_info{
		
		p{
			
			color: #9d9d9d;
		}
	}
	
	.address_item{
		
		height: 1.46rem;
		
		display: flex;
		
		align-items: center;
		
		
		border-bottom: .01rem solid #f1f1f1;
		
	}

</style>
