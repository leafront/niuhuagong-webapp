<template>
	<div class="slideshow-wrap">
		<slot></slot>
		<ul class="slideshow-dots">
			<li v-for="(item,$index) in list" :class="{'active':$index == index-1}">
			</li>
		</ul>
	
	</div>
</template>
<script>

	import utils from '@/widget/utils'

	export default {
		props:{
			list:{
				type: Array,
				default:[]
			},
			step: {
				type: Number,
				default: 20
			},
			isAutoPlay: {
				type: Boolean,
				default: true
			},
			sliderBtn: {
				type: String,
				default: '.slideshow-dots li'
			},
			slideItem:{
				type: String,
				default: '.slideshow-item'
			},
			sliderLi: {
				type: String,
				default: '.slideshow-item li'
			},
			// 阻止页面上下滑动
			preventDefault: {
				type: Boolean,
				default: false
			},
			autoTime: {
				type: Number,
				default: 5000
			},

		},

		data () {

			return {
				index: 1,
				startTime: 0,
				itemLength: 0,
				itemWidth:0,
				wrapper: null,
				pagination: null,
				startX: 0,
				startY:0,
				endX: 0,
				endY:0,
				x:0,
				isValid: true,
				isCheck: false,
				autoPlayTimer: null
			}

		},
		methods: {

			touchstart (e) {

				var point = e.touches ? e.touches[0] : e;
				this.startX = this.endX = point.pageX;
				this.startY = this.endY = point.pageY;
				this.isValid = true;
				this.isCheck = false;
				this._start(e);
			},
			touchmove (e) {
				if (!this.isValid) return;
				var point = e.touches ? e.touches[0] : e;
				this.endX = point.pageX;
				this.endY = point.pageY;

				var differX = this.endX - this.startX;
				var differY = this.endY - this.startY;
				if (!this.isCheck) {
					if (Math.abs(differY) > Math.abs(differX)) {
						this.isValid = false;
						return;
					}
					this.isCheck = true;
				}

				this._move(e, differX);
				
				e.preventDefault();
			},
			touchend (e) {
				if (!this.isValid) return;
				this._end();
			},
			init () {

				this.wrapper = document.querySelector(this.slideItem);

				const slider = document.querySelectorAll(this.sliderLi);

				this.pagination = document.querySelectorAll(this.sliderBtn);

				this.startTime = new Date().getTime();

				this.itemLength = this.pagination.length;

				const firstElement = this.wrapper.firstElementChild;

				const lastElement = this.wrapper.lastElementChild;

				const firstEleClone = firstElement.cloneNode(true);

				const lastEleClone = lastElement.cloneNode(true);

				firstElement.insertAdjacentElement('beforebegin',lastEleClone);

				lastElement.insertAdjacentElement('afterend',firstEleClone);

				this.itemWidth = this.$el.offsetWidth;

				this.setWrapperPos(-this.index * this.itemWidth);

				this.startAutoPlay();

			},
			_start () {
				this.clearAnimate();
				const left = this.wrapper.style.transform;
				// left可能有小数
				this.x = parseInt(left.match(/\(([-\.\d]+)px,/)[1], 10);

				// 控制快速滑动
				if (new Date().getTime() - this.startTime < 300) {
					this.isValid = false;
				}
				if (this.preventDefault) {
					this.isCheck = true;
				}
			},
			_move (e, differX) {
				this.setWrapperPos(this.x + differX);
			},
			_end () {
				const left = this.wrapper.style.transform;
				const distance = -parseInt(left.match(/\(([-\.\d]+)px,/)[1], 10);
				const width = this.itemWidth;


				if (this.startX > this.endX) {
					this.x = - Math.ceil(distance / width) * width;
				} else {
					this.x = - Math.floor(distance / width) * width;
				}


				this.wrapper.style.cssText = 'transition:300ms cubic-bezier(0.22, 0.69, 0.72, 0.88);-webkit-transition:300ms cubic-bezier(0.22, 0.69, 0.72, 0.88)';
				this.setWrapperPos(this.x);

				let index = -this.x / width;
				// 最后控制
				if (this.x >= 0) {
					index = this.itemLength;
					setTimeout(() => {
						this.clearAnimate();
						this.setWrapperPos(-this.itemLength * width);
					}, 300);
					this.startTime = new Date().getTime();
				} else if (Math.abs(this.x) >= (this.itemLength +1) * width) {
					index = 1;

					setTimeout(() => {
						this.clearAnimate();
						this.setWrapperPos(-width);
					}, 300);
					this.startTime = new Date().getTime();
				}
				this.index = index;

				this.startAutoPlay();
			},
			setWrapperPos (x) {
				this.wrapper.style.transform = 'translate3d(' + x + 'px, 0, 0)';
				this.wrapper.style.WebkitTransform = 'translate3d(' + x + 'px, 0, 0)';
			},
			clearAnimate () {

				this.wrapper.style.transition =  'none';
			},
			autoPlay () {
				this.index++;
				var x = - this.index * this.itemWidth;
				if (this.index > this.itemLength) {
					this.index = 1;
					setTimeout(() => {
						this.clearAnimate();
						this.setWrapperPos(-this.itemWidth);
					}, 310);
				}

				this.wrapper.style.cssText = 'transition:300ms ease-in; -webkit-transition:300ms ease-in; transform: translate3d(' + x + 'px, 0, 0); -webkit-transform:translate3d(' + x + 'px, 0, 0)';
			},
			startAutoPlay () {
				if (this.isAutoPlay && this.itemLength > 1) {
					this.stopAutoPlay();
					this.autoPlayTimer = setInterval(() => this.autoPlay(), this.autoTime);
				}
			},
			stopAutoPlay () {
				if (this.autoPlayTimer) {
					clearInterval(this.autoPlayTimer);
					this.autoPlayTimer = null;
				}
			}

		},
		watch: {

			list () {

				if (this.list.length == 1) {
					return
				}

				setTimeout(() => {

					this.init();

				},0)

				this.$el.addEventListener('touchstart',(e) => {
					this.touchstart(e);
				}, false)
				this.$el.addEventListener('touchmove',(e) => {
					this.touchmove(e);
				},false)
				this.$el.addEventListener('touchend',(e) => {
					this.touchend(e);
				},false)
			}

		},
		beforeDestroy () {

			clearInterval(this.autoPlayTimer);

		}

	}


</script>

