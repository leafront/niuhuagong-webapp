<template>
	<div class="pageView">
		<AppHeader :title="title"/>
		<div class="scroll-view-wrapper">
			<div class="login">
				<div class="user_tit">
					<h5>找回密码</h5>
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
						<input type="tel" v-model="params.mobile" class="login_input" placeholder="请输入手机号码"/>
						<div class="user_form_code" @click="countTime">
							<button class="login_code" :disabled="clickCode">{{codeTxt}}</button>
						</div>
					</div>
					<div class="user_form_item">
						<svg class="ico login_msg_ico" aria-hidden="true">
							<use xlink:href="#icon-yanzhengma"></use>
						</svg>
						<span></span>
						<input type="tel" v-model="params.pwd" class="login_input" placeholder="请输入验证码"/>
					</div>
					<div class="user_login" @click="forgetAction">
						<button class="form-button">下一步</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import * as Model  from '@/model/user'

	import validate from '@/widget/validate'

	import AppHeader from '@/components/common/header'

	export default {

		data () {
			return {
				codeTxt: '获取验证码',
				title: '找回密码',
				clickCode: false,
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

			document.title = '找回密码'

		},

		methods: {
			
			pageAction (url) {

				this.$router.push(url)

			},
			/**
			 * 用户点击获取验证码
			 *
			 */
			countTime (){

				let time = 60

				this.codeTxt = time + '秒后获取'

				this.clickCode = true

				let timer = setInterval(() => {

					time--

					this.codeTxt = time+'秒后获取'

					if(time == 0) {

						this.clickCode = false

						this.codeTxt = '获取验证码'

						clearInterval(timer)

					}
				},1000)
				this.getUserVerify()
			},
			forgetAction () {
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
					this.$toast('请输入手机验证码')
					return

				}
				if (!validate.isMessageCode(pwd)) {
					this.$toast('请输入正确的手机验证码')
					return

				}
				this.userForget()

			},
			userForget () {
				const {
					mobile,
					pwd
				} = this.params

				this.$showLoading()
				Model.userForget({
					type: 'POST',
					data: {
						channel: 2,
						mobile,
						pwd
					}
				}).then((res) => {
					const data = res.data

					if (data && res.status ==1) {

						this.$toast(res.msg)
						this.$hideLoading()
						setTimeout(() => {
							this.pageAction('/user/center')

						},3000)

					} else {

						this.$toast(res.msg)

					}
				})
			},
			getUserVerify () {
				const {
					mobile
				} = this.params

				if (!mobile) {
					this.$toast('请输入手机号码')
					return
				}
				if (!validate.isMobile(mobile)) {
					this.$toast('请输入正确的手机号码')
					return
				}
				Model.getUserVerify({
					type: 'POST',
					data: {
						mobile,
						channel: 1,
					}
				}).then((res) => {
					const data = res.data
					if (data && res.status == 1) {

						this.$toast(res.msg)

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