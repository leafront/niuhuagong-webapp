<template>
	<div class="header">
		<div class="head_img" @click="pageAction('/')">
			<img src="./images/logo.png"/>
		</div>
		<div class="head_nav">
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="!isMenu">
				<use xlink:href="#icon-daohanganniu"></use>
			</svg>
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="isMenu">
				<use xlink:href="#icon-daohangguanbi-"></use>
			</svg>
			<svg class="ico head_user_ico" @click="routerAction('/user/center')" aria-hidden="true">
				<use xlink:href="#icon-yonghu"></use>
			</svg>
		</div>
		<div class="head_nav_link">
			<div class="head_nav_search">
				<svg class="ico head_search_ico" aria-hidden="true">
					<use xlink:href="#icon-sousuo2"></use>
				</svg>
			</div>
			<div class="head_nav_cart" @click="routerAction('/user/cart')">
				<svg class="ico head_cart_ico" aria-hidden="true">
					<use xlink:href="#icon-gouwuche1"></use>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex'

	export default {
		
		computed: {
			...mapGetters({
				'isMenu':'getIsMenu'
			})
		},
		methods: {
			...mapActions([
				'updateIsMenu'
			]),
			pageAction (url) {

				this.$router.push(url)

			},

			dropMenu () {
				
				this.updateIsMenu(!this.isMenu)
				
			},

			routerAction (url) {

				this.updateIsMenu(false)

				this.pageAction(url)

			}

		}

	}

</script>

<style lang="scss">
	

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
			
			width: .55rem;
			height: .55rem;
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

