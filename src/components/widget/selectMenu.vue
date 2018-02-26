<template>
	<div class="selectMenu">
		<div class="weui-picker" :class="{'active':isMenu[index]}">
			<div class = "weui-picker__hd">
				<span data-action="cancel" class="weui-picker__action" id="weui-picker-cancel" @click="cancelMenu">取消</span>
				<span data-action="select" class="weui-picker__action" id="weui-picker-confirm" @click="confirmMenu">确定</span>
			</div>
			<div class = "weui-picker__bd">
				<div class="weui-picker__group" :id="'selectMenu'+index">
					<ul class="weui-picker__content">
						<li v-for="n in num"></li>
						<li class="weui-picker__item" :class="{'weui-picker_item_active':iScollIndex == i}" v-for="(item,i) in list" :key="i">{{item.name}}</li>
						<li v-for="n in num"></li>
					</ul>
					<div class="weui-picker__mask"></div>
					<div class="weui-picker__indicator"></div>
				</div>
			</div>
		</div>
		<div class="weui-mask" :class="{'active':isMenu[index]}" @click="cancelMenu"></div>
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

				iScollIndex: 0,

				isSelectMenu: this.isMenu


			}

		},
		
		watch: {
			
			list () {
				setTimeout((() => {
					this.scrollMenu()
				}),0)
			}
			
		},
		
		methods: {
			
			/**
			 *
			 * 滚动下拉选项位置进行位置滚动
			 *
			 */
			
			scrollMenu () {

				const selectMenu = document.getElementById('')

				const iscroll = new IScroll('#selectMenu'+this.index, {
					scrollX: false
				})

				const itemHeight = document.querySelectorAll('.weui-picker__item')[0].offsetHeight

				iscroll.on('scrollEnd', () => {

					const result = ( -iscroll.y / itemHeight)

					let index = parseInt(result, 10)

					const diff = result - index

					if (diff > 0.5) index++


					this.iScollIndex = index


					iscroll.scrollTo(0, -index * itemHeight)

				})
				
			},
			
			/**
			 *
			 * 取消下拉菜单
			 *
			 */
			cancelMenu () {

				this.$emit('hideMenu',this.index)
			},
			/***
			 *
			 * 确认选中的下拉菜单
			 * @param null
			 *
			 */

			confirmMenu () {

				this.isSelectMenu = false

				this.$emit('hideMenu',this.index)
				
				const item = this.list[this.iScollIndex].name
				
				this.$emit('selectMenu',item,this.attr)
				
				
			}
			
		}
		
	}

</script>
