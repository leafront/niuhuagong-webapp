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
						<div class="user_sex_item">
							<svg class="ico user_sex_ico" aria-hidden="true">
								<use xlink:href="#icon-boy"></use>
							</svg>
							<span>先生</span>
						</div>
						<div class="user_sex_item active">
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
						<input type="tel" class="login_input" placeholder="请输入手机号码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" class="login_pass_input" placeholder="请输入6~20位密码"/>
					</div>
					<div class="user_form_item">
						<svg class="ico login_pass_ico" aria-hidden="true">
							<use xlink:href="#icon-mima"></use>
						</svg>
						<span></span>
						<input type="password" class="login_pass_input" placeholder="请再次输入密码"/>
					</div>
					<div class="register_login">
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

	export default {

		components: {

			AppHeader

		},
		
		data () {
			
			return {
				
				isPopup: false
				
			}
			
		},
		
		components: {
			
			Popup
			
		},
		
		created () {
			
			this.isPopup = true
			
		},
		
		beforeCreate () {

			document.title = '用户注册'

		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},

			closeMask (val) {
				
				this.isPopup = val
				
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