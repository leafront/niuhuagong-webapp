<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper">
		<div class="login">
			<div class="user_tit">
				<h5>登录帐号</h5>
				<div class="login_line">
					<span></span>
				</div>
			</div>
			<div class="user_form">
				<div class="user_form_item">
					<svg class="ico login_tel_ico" aria-hidden="true">
						<use xlink:href="#icon-shouji"></use>
					</svg>
					<span></span>
					<input type="tel" v-model.trim="params.mobile" class="login_input" placeholder="请输入手机号码"/>
				</div>
				<div class="user_form_item">
					<svg class="ico login_pass_ico" aria-hidden="true">
						<use xlink:href="#icon-mima"></use>
					</svg>
					<span></span>
					<input type="password" v-model.trim="params.pwd" class="login_pass_input" placeholder="请输入密码"/>
				</div>
				<div class="user_form_pass">
					<span @click="pageAction('/user/login')">使用验证码登录</span>
					<span @click="pageAction('/user/reset/forget')">忘了密码</span>
				</div>
				<div class="user_login">
					<button class="form-button" @click="loginAction">登录</button>
				</div>
				<div class="user_tips">
					<span @click="pageAction('/user/register')">还没有账户，马上去<strong>注册</strong></span>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'
	
	import validate from '@/widget/validate'
	
	import * as Model from '@/model/user'

	export default {
		data () {
			return {
				title: '登录',
				redirect: this.$route.query.redirect,
				params: {
					mobile: '',
					pwd: ''
				}
			}
		},
		components: {
			AppHeader
		},
		beforeCreate () {
			document.title = '登录'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},
			loginAction () {
				const {
					mobile,
					pwd
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
				this.userLogin()
			
			},
			userLogin () {
				const {
					mobile,
					pwd
				} = this.params
				
				this.$showLoading()
				Model.userLogin({
					type: 'POST',
					data: {
						channel: 1,
						mobile,
						pwd
					}
				}).then((res) => {
					const data = res.data
					this.$hideLoading()
					if (data && res.status ==1) {
						const redirect = this.redirect
						if (redirect) {
							this.pageAction(redirect)
						} else {
							this.pageAction('/user/center')
						}
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

	
</style>