<template>
	<div class="pageView">
		<div class="scroll-view-wrapper">
			<div class="user_info">
				<div class="user_tit">
					<h5>继续完善我的资料</h5>
					<div class="login_line">
						<span></span>
					</div>
				</div>
				<div class="user_types">
					<span :class="{'active':user_type == 1}" @click="selectUser(1)">个人</span>
					<span :class="{'active':user_type == 2}" @click="selectUser(2)">公司</span>
				</div>
				<div class="user_confirm">
					<button class="form-button" @click="routerAction" :disabled="!user_type">下一步</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	
	@import '../../styles/user_tit.scss';
	
	.user_info{
		
		padding: 0 .4rem;
		
	}
	
	.user_types{
		
		padding: 1.35rem .6rem 1.14rem;
		
		display:flex;
		
		justify-content: space-between;
		

		
		span{
			
			display: flex;
			
			align-items: center;
			
			justify-content: center;
			
			width: 1.85rem;
			
			height: 1.85rem;
			
			border-radius: 50%;
			
			border:.01rem solid #d2d2d2;
			
			font-size: .28rem;
			
			box-sizing: border-box;
			
			&.active {
				
				border: .06rem solid #008aec;
				
				color: #008aec;
				
			}
			
		}
	
	
	}
	
</style>

<script>

	import AppHeader from '@/components/common/header'
	
	export default {
		
		data () {
			
			return {

				disabled: false,
				
				user_type: 0
				
			}
			
		},

		beforeCreate () {

			document.title = '用户认证'

		},
		
		created () {
		
			
		},
		
		methods: {

			selectUser (type) {
				
				this.user_type = type;
				
			},

			routerAction () {
				
				if (this.user_type == 1) {

					this.$router.push('/user/personal')
					
				} else {

					this.$router.push('/user/company')
					
				}
				
			}
			
		}
		
	}
	
</script>