<template>
	<div class="sub_nav" :class="{'active':isMenu}" :style="{'height':subHeight}">
		<ul class="sub_nav_list">
			<li v-for="(item,index) in linkList" :key="index" @click="routerAction(item.url)">
				<span>{{item.name}}</span>
				<svg aria-hidden="true" class="ico arrow_right_ico">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-jiantou">
					</use>
				</svg>
			</li>
		</ul>
		<FooterBot/>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex'
 
	import FooterBot from '@/components/common/footer_bot'
	
	export default {

		components: {
			FooterBot
		},
		computed: {
			...mapGetters({
				isMenu: 'getIsMenu'
			})
		},
		data () {

			return {

				subHeight: 0,

				linkList:[{
					url: '/',
					name:'首页'
				},{
					url: '/',
					name:'纤维素醚'
				},{
					url: '/',
					name:'乳胶粉'
				},{
					url: '/',
					name:'钛白粉'
				},{
					url: '/',
					name:'色卡'
				},{
					url: '/',
					name:'色浆'
				},{
					url: '/',
					name:'干粉助剂'
				},{
					url: '/',
					name:'涂料助剂'
				}]

			}
			
		},
		
		mounted () {
			
			this.getMenuHeight()

		},
		
		methods: {
			...mapActions([
				'updateIsMenu',
			]),
			
			/**
			 * 获取下拉菜单的高度
			 *
			 * @param null
			 *
			 */
			
			getMenuHeight () {
				
				const headHeight = this.$el.offsetHeight

				const winHeight = document.documentElement.clientHeight

				this.subHeight = winHeight - headHeight + 'px'
				
			},

			/**
			 *  页面路由跳转
			 * @param url
			 */

			pageAction (url) {

				this.$router.push(url)

			},

			/**
			 *  页面路由跳转
			 * @param url
			 *
			 */
			
			routerAction (url) {
				
				this.updateIsMenu(false)

				this.pageAction(url)

			}
			
		}
		
	}
	
</script>

<style lang="scss">
	
	.sub_nav{
		
		position: absolute;
		
		background: #f2f2f2;
		
		transition: transform .2s linear;
		
		left:0;
		
		top:1.2rem;
		
		width:100%;
		
		transform: translateY(-100%);
		z-index: -10;
		&.active{

			transform: translateY(0);
			z-index:10;
		}
		
	}
	
	.sub_nav_list{
		
		display: flex;
		
		padding: 0 .75rem;
		
		flex-direction: column;
		
		background: #fff;
		
		li{
			
			justify-content: space-between;
			
			align-items: center;
			
			display:flex;
			
			height: 1.1rem;
			
			color: #252525;
			
			font-size: .3rem;
			
			border-bottom: .01rem solid #eee;
			
			.arrow_right_ico{
				width: .2rem;
				height: .4rem;
				color: #c1c1c1;
				padding-left: .1rem;
			}
			
		}
		
	}


</style>