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
						<input type="tel" v-model.trim="params.mobile" class="login_input" placeholder="请输入新密码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" v-model.trim="params.pwd" class="login_pass_input" placeholder="请再次输入新密码"/>
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

	import * as Model from '@/model/user'

	export default {
		data () {
			return {
				title: '重置密码',
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

			document.title = '重置密码'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},
			resetAction () {
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

				this.userLogin()

			},
			userLogin () {
				const {
					mobile,
					pwd
				} = this.params

				this.$showLoading()
				Model.userResetPass({
					type: 'POST',
					data: {
						channel: 1,
						mobile,
						pwd
					}
				}).then((res) => {
					const data = res.data

					if (data && res.status ==1) {
						this.$hideLoading()
						this.$toast(res.msg)
						setTimeout(() => {
							this.pageAction('/user/center')
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