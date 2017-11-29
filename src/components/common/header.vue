<template>
	<div class="header">
		<div class="head_img">
			<img src="./images/logo.png"/>
		</div>
		<div class="head_nav" @click="dropMenu">
			<svg class="ico head_ico" aria-hidden="true" v-show="!isMenu">
				<use xlink:href="#icon-daohanganniu"></use>
			</svg>
			<svg class="ico head_ico" aria-hidden="true" v-show="isMenu">
				<use xlink:href="#icon-daohangguanbi-"></use>
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
		<div class="sub_nav" :class="{'active':isMenu}">
			<ul class="sub_nav_list">
				<li v-for="(item,index) in linkList" :key="index" @click="routerAction(item.url)"><span>{{item.name}}</span></li>
			</ul>
			<div class="sub_login">
				<div class="sub_login_wrapper" @click="routerAction('/user/login')">
					<svg class="ico sub_user_ico" @click="pageAction('/user/cart')" aria-hidden="true">
						<use xlink:href="#icon-iconfonticozhuce"></use>
					</svg>
					<span>登录/注册</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	
	.sub_login{
		
		display: flex;
		
		align-items: center;
		
		justify-content: center;
		
		.sub_login_wrapper{
			
			border-radius: .44rem;
			
			display:flex;
			
			align-items: center;
			
			justify-content: center;
			
			margin: .56rem 0;
			
			height:.75rem;
			
			width: 3.06rem;
			
			background: #f6f6f6;
			
			span{
				
				padding-left: .24rem;
			
				font-size: .3rem;
				
				color: #252525;
				
			}
			
		}
		
		.sub_user_ico{
		
			width: .28rem;
			
			height: .28rem;
			
			color: #008aec;
		
		}
		
	}
	
	.sub_nav{
		
		position: absolute;
		
		transition: all .5s cubic-bezier(.4,.01,.165,.99);
		
		left:0;
		
		top:1.2rem;
		
		width:100%;
		
		background: #fff;
		
		max-height:0;
		
		overflow: hidden;
		
		&.active{
			
			max-height: 2000px;
		
		}
		
	}
	
	.sub_nav_list{
		
		display: flex;
		
		padding: 0 1.12rem;
		
		flex-direction: column;
		
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
		width:1.2rem;
		padding-left:.3rem;
		display:flex;
		
		align-items: center;
		.head_ico{
			
			color:#008aec;
			width: .45rem;
			height: .38rem;
			
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
			
			width: .4rem;
			
			height: .4rem;
			
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
			
			width: .42rem;
			height: .42rem;
			color:#008aec;
		}
		
	}
	.head_img{
		
		position:absolute;
		
		left: 50%;
		margin-left: -0.95rem;
		img{
			vertical-align: top;
			width: 1.9rem;
			height: .6rem;
			
		}
	}

</style>

<script>

	export default {

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

		},
		
		data () {
			
			return {
				
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
			
		}

	}

</script>