<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper">
			<div class="login">
				<div class="user_tit">
					<h5>重置密码</h5>
					<div class="login_line">
						<span></span>
					</div>
				</div>
				<div class="user_form">
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" v-model.trim="params.pwd" class="login_input" placeholder="请输入6~20位新密码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" v-model.trim="params.confirm_pwd" class="login_pass_input" placeholder="请再次输入6~20位新密码"/>
					</div>
					<div class="user_login" @click="resetAction">
						<button class="form-button">完成</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import AppHeader from '@/components/common/header'

	import validate from '@/widget/validate'
	
	import store from '@/widget/store'

	import * as Model from '@/model/user'

	export default {
		data () {
			return {
				title: '重置密码',
				params: {
					pwd: '',
					confirm_pwd: ''
				}
			}
		},
		components: {
			AppHeader
		},
		beforeCreate () {

			document.title = '重置密码'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},
			resetAction () {
				const params = store.get('NHG_FORGET_PASS')
				const { confirm_pwd, pwd } = this.params
				if (!params) {
					this.$toast('手机号码和验证码错误')
					this.pageAction('/user/reset/forget')
					return
				}

				if (!pwd) {
					this.$toast('请输入重置密码')
					return
				}
				if (!validate.isPass(pwd)) {
					this.$toast('请输入6~20位数字和字母密码')
					return
				}
				if (!confirm_pwd) {
					this.$toast('请再次输入重置密码')
					return
				}
				if (confirm_pwd !== pwd) {
					this.$toast('两次输入密码不一致')
					return
				}

				this.userResetPass()

			},
			userResetPass () {
				const params = store.get('NHG_FORGET_PASS')
				const {
					mobile,
					verify_code
				} = params
				
				const pwd = this.params.pwd

				this.$showLoading()
				Model.userResetPass({
					type: 'POST',
					data: {
						channel: 3,
						mobile,
						pwd,
						verify_code
					}
				}).then((res) => {
					this.$hideLoading()
					const data = res.data
					if (data && res.status ==1) {
						store.remove('NHG_FORGET_PASS')
						this.$toast(res.msg)
						setTimeout(() => {
							this.pageAction('/user/login')
						},3000)
					} else {

						this.$toast(res.msg)

					}
				})
			}
		}
	}

</script>

<style lang="scss">
	
	@import '../../../styles/user.scss';


</style>