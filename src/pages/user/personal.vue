<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper">
			<div class="personal">
				<div class="user_tit">
					<h5>继续完善我的资料</h5>
					<div class="login_line">
						<span></span>
					</div>
				</div>
				<div class="personal_form">
					<div class="personal_form_item">
						<label>昵称</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" v-model="params.user_name" placeholder="请输入昵称"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>姓名</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" v-model="params.name" placeholder="请输入姓名"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>职务</label>
						<div class="personal_input" @click="showMenu(0)">
							<span :class="{'personal_input_checked': params.duty}">{{params.duty || '请选择个人职务'}}</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>公司</label>
						<div class="personal_input">
							<input type="text" v-model.trim="params.company_name" class="personal_input_tx" placeholder="请输入公司名称"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>行业</label>
						<div class="personal_input" @click="showMenu(1)">
							<span :class="{'personal_input_checked': params.company_trade}">{{ params.company_trade || '请选择公司所在行业'}}</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>类型</label>
						<div class="personal_input" @click="showMenu(2)">
							<span :class="{'personal_input_checked': params.company_type}">{{params.company_type || '请选择公司类型'}}</span>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<SelectMenu :list="user_duty" :index="0" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'duty'" @selectMenu="selectMenu"/>
					<SelectMenu :list="company_trade" :index="1" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'company_trade'" @selectMenu="selectMenu"/>
					<SelectMenu :list="company_type" :index="2" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'company_type'" @selectMenu="selectMenu"/>
					<div class="personal_button" @click="submitAction">
						<button class="form-button">完成</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'
	
	import * as Model from '@/model/user'

	import SelectMenu from '@/components/widget/selectMenu'

	export default {
		
		components: {

			SelectMenu,
			AppHeader
			
		},
		
		data () {
			
			return {
				title: '完善我的资料',
				isMenu: [false,false,false],
				user_duty: [],
				company_type: [],
				company_trade: [],
				params: {
					user_type: '',
					name: '',
					company_name: '',
					user_name: '',
					duty: '',
					company_trade: '',
					company_type: ''
				}
			}
			
		},

		beforeCreate () {

			document.title = '完善我的资料'
			
		},
		created () {

			this.getIndustryList()
		},
		methods: {

			hideMenu (index) {
				
				this.isMenu.splice(index,1,false)
				
			},
			pageAction (url) {
				this.$router.push(url)
				
			},
			selectMenu (val,attr) {
				
				this.params[attr] = val
				
			},

			showMenu (index) {

				this.isMenu.splice(index,1,true)
				
			},
			/**
			 * 获取行业类型列表
			 */
			getIndustryList () {
				
				Model.getIndustryList({
					type: 'GET'
				}).then((res) => {
					
					const data = res.data
					if (data && res.status == 1) {
					
						this.user_duty = data.user_duty
						this.company_type = data.company_type
						this.company_trade = data.company_trade
						this.params.user_type = 1
					}
				})
			},

			/**
			 * 用户提交信息验证
			 */

			submitAction () {
			
				const {
					user_name,
					name,
					duty,
					company_name,
					company_trade,
					company_type
				} = this.params
				
				if (!user_name) {
					this.$toast('请输入昵称')
					return
					
				}
				if (!name) {
					this.$toast('请输入姓名')
					return
				}
				if (!duty) {
					this.$toast('请选择个人职务')
					return
				}
				if (!company_name) {
					this.$toast('请输入公司名称')
					return
				}
				if (!company_trade) {
					this.$toast('请选择公司所在行业')
					return
				}
				if (!company_type) {
					this.$toast('请选择公司类型')
					return
				}
				this.supplyUserInfo()
			},
			/**
			 * 用户完善个人资料信息提交
			 */
			supplyUserInfo () {
				
				Model.supplyUserInfo({
					type: 'POST',
					data: this.params
				}).then((res) => {
					
					const data = res.data
					if (data && res.status == 1) {
						this.pageAction('/user/center')
					} else {
					
						this.$toast(res.msg)
						
					}
				})
			}
		}

	}

</script>

<style lang="scss">
	
	@import '../../styles/user_tit.scss';
	
	
</style>
