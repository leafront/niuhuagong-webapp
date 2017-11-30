<template>
	<div class="header">
		<div class="head_img">
			<img src="./images/logo.png"/>
		</div>
		<div class="head_nav">
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="!isMenu">
				<use xlink:href="#icon-daohanganniu"></use>
			</svg>
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="isMenu">
				<use xlink:href="#icon-daohangguanbi-"></use>
			</svg>
			<svg class="ico head_user_ico" @click="pageAction('/user/center')" aria-hidden="true">
				<use xlink:href="#icon-yonghu"></use>
			</svg>
		</div>
		<div class="head_nav_link">
			<div class="head_nav_search">
				<svg class="ico head_search_ico" aria-hidden="true">
					<use xlink:href="#icon-sousuo2"></use>
				</svg>
			</div>
			<div class="head_nav_cart" @click="pageAction('/user/cart')">
				<svg class="ico head_cart_ico" aria-hidden="true">
					<use xlink:href="#icon-gouwuche1"></use>
				</svg>
			</div>
		</div>
		<div class="sub_nav" :class="{'active':isMenu}" :style="{'height':subHeight}">
			<ul class="sub_nav_list">
				<li v-for="(item,index) in linkList" :key="index" @click="routerAction(item.url)"><span>{{item.name}}</span></li>
			</ul>
			<AppFooter/>
		</div>
	</div>
</template>

<script>

	import AppFooter from '@/components/common/footer'

	export default {
		
		components: {

			AppFooter
			
		},

		data () {

			return {

				subHeight: 0,

				isMenu: false,

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
		
			
			const headHeight = this.$el.offsetHeight
			
			const winHeight = document.documentElement.clientHeight
			
			this.subHeight = winHeight - headHeight + 'px'
		
		},

		methods: {

			pageAction (url) {

				this.$router.push(url)

			},

			dropMenu () {

				this.isMenu = !this.isMenu

			},

			routerAction (url) {

				this.isMenu = false

				this.pageAction(url)

			}

		}

	}

</script>

<style lang="scss">
	
	.sub_nav{
		
		position: absolute;
		
		background: #f2f2f2;
		
		transition: all .5s cubic-bezier(.4,.01,.165,.99);
		
		left:0;
		
		top:1.2rem;
		
		width:100%;
		
		max-height:0;
		
		overflow: hidden;
		
		&.active{
			
			padding-bottom: .2rem;
			
			max-height: 2000px;
			
			height:100%;
		
		}
		
	}
	
	.sub_nav_list{
		
		display: flex;
		
		padding: 0 1.12rem;
		
		flex-direction: column;
		
		background: #fff;
		
		li{
			
			justify-content: center;
			
			align-items: center;
			
			display:flex;
			
			height: 1.1rem;
			
			color: #252525;
			
			font-size: .3rem;
			
			border-bottom: 1px solid #eee;
			
		}
		
	}
	
	.header{
		
		background:#fff;
		
		height: 1.2rem;
		
		display:flex;
		
		align-items: center;
		
		justify-content: space-between;
		
		position:relative;
		
		z-index:100;
		
		box-shadow: 0 .1rem .16rem rgba(152,152,152,.3);
		
		
	}
	
	.head_nav{
		height:1.2rem;
		display:flex;
		align-items: center;
		.head_ico{
			padding: .35rem 0 .35rem .3rem;
			color:#008aec;
			width: .5rem;
			height: .5rem;
			
		}
		.head_user_ico{
			
			padding: .35rem .3rem .35rem .3rem;
			color:#008aec;
			width: .5rem;
			height: .5rem;
			
		}
	}
	
	.head_nav_link{
		
		display:flex;
		
	}
	
	.head_nav_search{
		
		height: 1.2rem;
		
		display:flex;
		
		align-items: center;
		
		padding:0 .15rem;
		
		.head_search_ico{
			
			width: .5rem;
			
			height: .5rem;
			
			color: #008aec;
			
		}
	}
	
	.head_nav_cart{
		
		height: 1.2rem;
		
		padding-left: .15rem;
		
		padding-right:.3rem;
		
		display:flex;
		
		align-items: center;
		
		.head_cart_ico{
			
			width: .5rem;
			height: .5rem;
			color:#008aec;
		}
		
	}
	.head_img{
		
		position:absolute;
		
		left: 50%;
		margin-left: -0.95rem;
		img{
			width: 1.9rem;
			height: .6rem;
			
		}
	}

</style>

