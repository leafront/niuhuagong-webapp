<template>
	<div class="pageView">
		<AppHeader/>
		<div class="scroll-view-wrapper">
			<div class="login">
				<div class="user_tit">
					<h5>欢迎注册为会员</h5>
					<div class="login_line">
						<span></span>
					</div>
				</div>
				<div class="user_form">
					<div class="user_sex">
						<div class="user_sex_item" :class="{'active': params.sex == 1}" @click="selectSex(1)">
							<svg class="ico user_sex_ico" aria-hidden="true">
								<use xlink:href="#icon-boy"></use>
							</svg>
							<span>先生</span>
						</div>
						<div class="user_sex_item" :class="{'active': params.sex == 2}" @click="selectSex(2)">
							<svg class="ico user_sex_ico" aria-hidden="true">
								<use xlink:href="#icon-girl"></use>
							</svg>
							<span>女士</span>
						</div>
					</div>
					<div class="user_form_item">
						<svg class="ico login_tel_ico" aria-hidden="true">
							<use xlink:href="#icon-shouji"></use>
						</svg>
						<span></span>
						<input type="tel" v-model="params.mobile" class="login_input" placeholder="请输入手机号码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" v-model="params.pwd" class="login_pass_input" placeholder="请输入6~20位密码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" v-model="params.confirm_pass" class="login_pass_input" placeholder="请再次输入密码"/>
					</div>
					<div class="register_login" @click="registerAction">
						<button class="form-button">注册</button>
					</div>
					<div class="user_tips">
						<span @click="pageAction('/user/login')">已有账户，马上去<strong>登录</strong></span>
					</div>
				</div>
			</div>
			<Popup :isPopup="isPopup" @closeMask="closeMask"/>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'
	
	import Popup from '@/components/user/popup'
	
	import validate from '@/widget/validate'
	
	import * as Model from '@/model/user'

	export default {
		data () {

			return {
				isPopup: false,
				params: {
					sex: 1,
					mobile: '',
					pwd: '',
					confirm_pass: ''
				}
			}
		},

		components: {

			AppHeader,
			Popup
		},
		created () {
			
			//this.isPopup = true
		},
		beforeCreate () {

			document.title = '用户注册'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},
			selectSex (sex) {
				
				this.params.sex = sex
			
			},
			closeMask (val) {
				
				this.isPopup = val
				
			},
			registerAction () {
				
				const {
					mobile,
					sex,
					pwd,
					confirm_pass
				} = this.params
				
				if (!mobile) {
					this.$toast('请输入手机号码')
					return
				}
				if (!validate.isMobile(mobile)) {
					this.$toast('请输入正确的手机号码')
					return
				}
				if (!pwd) {
					this.$toast('请输入密码')
					return
				}
				if (!validate.isPass(pwd)) {
					this.$toast('请输入6~20位数字和字母密码')
					return
				}
				if (!confirm_pass) {
					this.$toast('请再次输入密码')
					return
				}
				if (confirm_pass !== pwd) {
					this.$toast('两次输入密码不一致')
					return
				}
				this.userRegister({mobile,sex, pwd})
				
			},
			userRegister (data) {

				const {
					mobile,
					sex,
					pwd
				} = this.params
				
				Model.userRegister({
					type: 'POST',
					data
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {
						
						this.$toast(res.msg)
						setTimeout(() => {
							this.pageAction('/user/login')
						},2000)

					} else {

						this.$toast(res.msg)

					}
				})
			}
		}
	}

</script>

<style lang="scss">
	
	@import '../../styles/user.scss';
	
	.user_sex{
		
		display:flex;
		
		padding: 0  .65rem .42rem;
		
		align-items: center;
		
		justify-content: space-between;
		
	}
	
	
	.user_sex_item{
		
		display: flex;
		
		flex-direction: column;
		
		align-items: center;
		
		justify-content: center;
		
		span{
			
			font-size: .28rem;
			
			padding-top: .22rem;
		
		}
		
		.user_sex_ico{
			
			width: 1.22rem;
			height: 1.22rem;
			color: #cecece;
	
			
		}
		
		&.active {
			
			span {
				
				color: #008aec;
			}
			
			.user_sex_ico{
				
				color: #008aec;
				
			}
			
		}
	}
	.user_form{
		
		padding-top: .8rem;
		
	}
	
	.register_login{
		
		padding-top: .32rem;
		
		
	}
</style>