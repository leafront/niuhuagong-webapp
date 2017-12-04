<template>
	<div class="pageView">
		<AppHeader/>
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
							<input type="text" class="personal_input_tx" placeholder="请输入昵称"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>姓名</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入姓名"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>职务</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请选择个人职务"/>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>公司</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入公司名称"/>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>行业</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请选择公司所在行业"/>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>类型</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请选择公司所在行业"/>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_form_item">
						<label>地址</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入公司地址"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>税号</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请输入具体税号"/>
						</div>
					</div>
					<div class="personal_form_item">
						<label>开户银行</label>
						<div class="personal_input">
							<input type="text" class="personal_input_tx" placeholder="请选择开户银行"/>
							<svg class="ico arrow_right_ico" aria-hidden="true">
								<use xlink:href="#icon-jiantou"></use>
							</svg>
						</div>
					</div>
					<div class="personal_button">
						<button class="form-button">完成</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>

	import AppHeader from '@/components/common/header'

	export default {
		
		components: {

			AppHeader
			
		},

		data () {

			return {

			}

		},

		beforeCreate () {

			document.title = '完善公司资料'

		}

	}

</script>

<style lang="scss">
	
	@import '../../styles/user_tit.scss';
	
	.personal{
		
		padding: 0 .75rem;
		
	}
	
	.personal_form{
		
		padding-top: .85rem;
		
	}
	

</style>