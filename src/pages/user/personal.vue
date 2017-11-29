<template>
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
					<div class="personal_input" @click="showMenu(0)">
						<span>请选择个人职务</span>
						<svg class="ico arrow_right_ico" aria-hidden="true">
							<use xlink:href="#icon-jiantou"></use>
						</svg>
					</div>
				</div>
				<div class="personal_form_item">
					<label>公司</label>
					<div class="personal_input" @click="showMenu(1)">
						<span>请输入公司名称</span>
						<svg class="ico arrow_right_ico" aria-hidden="true">
							<use xlink:href="#icon-jiantou"></use>
						</svg>
					</div>
				</div>
				<div class="personal_form_item">
					<label>行业</label>
					<div class="personal_input">
						<span>请选择公司所在行业</span>
						<svg class="ico arrow_right_ico" aria-hidden="true">
							<use xlink:href="#icon-jiantou"></use>
						</svg>
					</div>
				</div>
				<div class="personal_form_item">
					<label>类型</label>
					<div class="personal_input">
						<span>请选择公司所在行业</span>
						<svg class="ico arrow_right_ico" aria-hidden="true">
							<use xlink:href="#icon-jiantou"></use>
						</svg>
					</div>
				</div>
				<SelectMenu :list="list" :index="0" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'job'" @selectMenu="selectMenu"/>
				<SelectMenu :list="list" :index="1" :isMenu="isMenu" @hideMenu="hideMenu" :attr="'company'" @selectMenu="selectMenu"/>
				<div class="personal_button">
					<button class="form-button">完成</button>
				</div>
			</div>
		</div>
		<AppFooter/>
	</div>
</template>

<script>

	import AppFooter from '@/components/common/footer'

	import SelectMenu from '@/components/widget/selectMenu'

	export default {
		
		components: {

			AppFooter,

			SelectMenu
			
		},
		
		data () {
			
			return {

				isMenu: [false,false],
				
				job:'',
				
				company: '',

				selectedId: [''],
				
				list: [{name:'北京',id:1},{name:'上海',id:2},{name:'广州',id:3},{name:'深圳',id:4},{name:'杭州',id:5},{name:'武汉',id:6}]
				
			}
			
		},

		beforeCreate () {

			document.title = '完善我的资料'

		},
		
		methods: {

			hideMenu (index) {
				
				this.isMenu.splice(index,1,false)
				
			},

			selectMenu (val,attr) {
				
				this[attr] = val
				
			},

			showMenu (index) {

				this.isMenu.splice(index,1,true)
				
			}
			
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
