<template>
	<div class="pageView">
		<AppHeader/>
		<div class="scroll-view-wrapper">
			<div class="personal">
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

		beforeCreate () {

			document.title = '完善我的资料'

		}

	}

</script>

<style lang="scss">
	
	
	.personal{
		
		padding: 0 .75rem;
		
	}


</style>
