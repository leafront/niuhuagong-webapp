<template>
	<div class="selectMenu">
		<div class="weui-picker" :class="{'weui-animate-slide-up':isMenu[index]}">
			<div class = "weui-picker__hd">
				<span data-action="cancel" class="weui-picker__action" id="weui-picker-cancel" @click="cancelMenu">取消</span>
				<span data-action="select" class="weui-picker__action" id="weui-picker-confirm" @click="confirmMenu">确定</span>
			</div>
			<div class = "weui-picker__bd">
				<div class="weui-picker__group" :id="'selectMenu'+index">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" v-for="(item,i) in list" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
			</div>
		</div>
		<div class="weui-mask" @click="cancelMenu" v-show="isMenu[index]"></div>
	</div>
</template>

<script>
	
	import IScroll from '@/lib/IScroll'
	
	export default {
		
		props: {

			isMenu: {
				
				type: Array,
				
				default: []
				
			},
			
			index: {

				type: Number,

				default: 0
			},

			attr: {
				
				type: String,
				
				default: ''
				
			},
			
			list: {
				
				type: Array,
				
				default: []
				
			}
			
		},

		data () {

			return {

				num: 3,

				iScollIndex:0,

				isSelectMenu: this.isMenu


			}

		},
		
		mounted () {
			
			this.scrollMenu()
			
		},
		
		methods: {
			
			/**
			 *
			 * 滚动下拉选项位置进行位置滚动
			 *
			 */
			
			scrollMenu () {

				const selectMenu = document.getElementById('');

				const iscroll = new IScroll('#selectMenu'+this.index, {
					scrollX: false
				})

				const itemHeight = document.querySelectorAll('.weui-picker__item')[0].offsetHeight;

				iscroll.on('scrollEnd', () => {

					const result = ( -iscroll.y / itemHeight);

					let index = parseInt(result, 10);

					const diff = result - index;

					if (diff > 0.5) index++;


					this.iScollIndex = index;


					iscroll.scrollTo(0, -index * itemHeight);

				})
				
			},
			
			/**
			 *
			 * 取消下拉菜单
			 *
			 */

			cancelMenu () {
				
				this.iScollIndex = 0;

				this.$emit('hideMenu',this.index);
				
				
			},

			/***
			 *
			 *  确认选中的下拉菜单
			 *
			 * @param null
			 *
			 *
			 */

			confirmMenu () {

				this.isSelectMenu = false;

				this.$emit('hideMenu',this.index);
				
				const selectedId = this.list[this.iScollIndex].id;
				
				this.$emit('selectMenu',selectedId,this.attr);

				this.iScollIndex = 0;
				
			}
			
		}
		
	}

</script>

<style lang="scss">
	
	@keyframes slideUp {
		from {
			transform: translate3d(0, 100%, 0);
		}
		to {
			transform: translate3d(0, 0, 0);
		}
	}
	.weui-animate-slide-up {
		animation: slideUp ease .3s forwards;
	}
	@keyframes slideDown {
		from {
			transform: translate3d(0, 0, 0);
		}
		to {
			transform: translate3d(0, 100%, 0);
		}
	}
	.weui-animate-slide-down {
		animation: slideDown ease .3s forwards;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.weui-animate-fade-in {
		animation: fadeIn ease .3s forwards;
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	.weui-animate-fade-out {
		animation: fadeOut ease .3s forwards;
	}
	
	.weui-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .6);

	}
	
	.weui-picker {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 5000;
		backface-visibility: hidden;
		transform: translate(0, 100%);
		transition: transform .3s;
	}
	.weui-picker__hd {
		display: flex;
		padding: .2rem .3rem;
		background-color: #fff;
		position: relative;
		text-align: center;
		
		font-size: .32rem;
		
		border-bottom: 1px solid #d7d7dc;
	}
	.weui-picker__action {
		display: block;
		flex: 1;
		color: #1AAD19;
	}
	.weui-picker__action:first-child {
		text-align: left;
		color:#888;
	}
	.weui-picker__action:last-child {
		text-align: right;
	}
	.weui-picker__bd {
		display: flex;
		position: relative;
		background-color: #fff;
		height: 4.76rem;
		overflow: hidden;
	}
	.weui-picker__group {
		flex: 1;
		position: relative;
		height: 100%;
	}
	.weui-picker__mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		z-index: 3;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
		background-position: top, bottom;
		background-size: 100% 2.04rem;
		background-repeat: no-repeat;
		transform: translateZ(0);
	}
	.weui-picker__indicator {
		width: 100%;
		height: .68rem;
		position: absolute;
		left: 0;
		top: 2.04rem;
		z-index: 3;
	}
	.weui-picker__indicator:before {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #d7d7dc;
	}
	.weui-picker__indicator:after {
		content: " ";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-top: 1px solid #d7d7dc;
	}
	.weui-picker__content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.weui-picker__content li{
		line-height: .68rem;
		height:.68rem;
		text-align: center;
		color: #000;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size:.4rem;
	}
	.weui-picker__item_disabled {
		color: #999999;
	}
	
</style>