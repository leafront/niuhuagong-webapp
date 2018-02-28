<template>
	<div class="home-header">
		<div class="head_img" @click="routerAction('/')">
			<img src="./images/logo.png"/>
		</div>
		<div class="head_nav">
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="!isMenu">
				<use xlink:href="#icon-daohanganniu"></use>
			</svg>
			<svg class="ico head_ico" @click="dropMenu" aria-hidden="true" v-show="isMenu">
				<use xlink:href="#icon-close"></use>
			</svg>
		</div>
		<!--<div class="head_nav_link">-->
			<!--<div class="head_nav_search" @click="pageAction('/search')">-->
				<!--<svg class="ico head_search_ico" aria-hidden="true">-->
					<!--<use xlink:href="#icon-sousuo2"></use>-->
				<!--</svg>-->
			<!--</div>-->
		<!--</div>-->
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
	

	.home-header{
		
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
			padding: .3rem 0 .3rem .3rem;
			color:#008aec;
			width: .52rem;
			height: .6rem;
			
		}
		.head_user_ico{
			
			padding:.3rem;
			color:#008aec;
			width: .5rem;
			height: .6rem;
			
		}
	}
	
	.head_nav_link{
		
		display:flex;
		
	}
	
	.head_nav_search{
		
		height: 1.2rem;
		
		display:flex;
		
		align-items: center;
		
		padding-right:.3rem;
		
		padding-left: .5rem;
		
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
		top:50%;
		transform: translate(-50%,-50%);
		img{
			width: 1.9rem;
			height: .6rem;
			
		}
	}

</style>

