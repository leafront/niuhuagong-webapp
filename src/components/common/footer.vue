<template>
	<div class="footer" :class="{'page_bottom':isWeixinIphoneX}">
		<ul class="foot_list">
			<router-link tag="li" to="/">
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-shouye"></use>
				</svg>
				<span>首页</span>
			</router-link>
			<router-link tag="li" to="/cart">
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-gouwuche"></use>
				</svg>
				<span>购物车</span>
			</router-link>
			<router-link tag="li" to="/user/center">
				<svg class="ico foot_icon" aria-hidden="true">
					<use xlink:href="#icon-gerenzhongxin1"></use>
				</svg>
				<span>个人中心</span>
			</router-link>
		</ul>
	</div>
</template>

<script>

	import utils from '@/widget/utils'

	export default {

		data () {

			return {

				isWeixinIphoneX: utils.isWeixinIphoneX()

			}

		}
	}

</script>