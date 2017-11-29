<template>
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
					<input type="tel" class="login_input" placeholder="请输入手机号码"/>
				</div>
				<div class="user_form_item">
					<svg class="ico login_pass_ico" aria-hidden="true">
						<use xlink:href="#icon-mima"></use>
					</svg>
					<span></span>
					<input type="password" class="login_pass_input" placeholder="请输入密码"/>
				</div>
				<div class="user_form_pass">
					<span @click="pageAction('/user/login')">使用动态验证码登录</span>
					<span>忘了密码</span>
				</div>
				<div class="user_login">
					<button class="form-button">登录</button>
				</div>
				<div class="user_tips">
					<span @click="pageAction('/user/register')">还没有账户，马上去<strong>注册</strong></span>
				</div>
			</div>
		</div>
		
		<AppFooter/>
	
	</div>
</template>

<script>

	import AppFooter from '@/components/common/footer'

	export default {

		components: {

			AppFooter

		},

		beforeCreate () {

			document.title = '用户密码登录'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			}

		}

	}

</script>

<style lang="scss">
	
	@import '../../styles/user.scss';
	.user_form{
		
		padding-top: 1.06rem;
	}

	
	.user_login{
		
		padding-top: 1.1rem;
		
		
	}
	
</style>