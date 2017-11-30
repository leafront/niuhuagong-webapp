<template>
	<div class="lazyLoad">
		<slot></slot>
	</div>
</template>

<script>
	
	export default {
		
		props: ['options'],
		
		data () {

			return {
				
				default: {
				  scrollEle: 'appView',
					ele:'lazyLoad_img',
					time: 200, // 设置一个检测时间间隔
					complete: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
					position: { // 只要其中一个位置符合条件，都会触发加载机制
						top: 0, // 元素距离顶部
						right: 0, // 元素距离右边
						bottom: 0, // 元素距离下面
						left: 0 // 元素距离左边
					},
					errorImg:'./images/default.png',
					successImg: 'successImg'
				}
			}
			
		},
		
		created () {

			Object.assign(this.options, this.default)
			
		},
		
		mounted () {
			
			this.start()
			
		},
	
		methods: {
			
			getClientRect (el,options) {
				
				const bcr = el.getBoundingClientRect() //取得元素在可视区的位置

				const mw = el.offsetWidth //元素自身宽度
				
				const mh = el.offsetHeight //元素自身的高度

				const w = window.innerWidth //视窗的宽度

				const h = window.innerHeight //视窗的高度

				const boolX = (!((bcr.right - options.left) <= 0 && ((bcr.left + mw) - options.left) <= 0) && !((bcr.left + options.right) >= w && (bcr.right + options.right) >= (mw + w))) //上下符合条件

				const boolY = (!((bcr.bottom - options.top) <= 0 && ((bcr.top + mh) - options.top) <= 0) && !((bcr.top + options.bottom) >= h && (bcr.bottom + options.bottom) >= (mh + h))) //上下符合条件
	
				return el.width != 0 && el.height != 0 && boolX && boolY
				
			},
			start (){
				
				const appView = document.getElementById('appView')
	
				const scrollLoad = () => {
					
					const list = Array.prototype.slice.apply(document.getElementsByClassName(this.options.ele));
					
					if (!list.length && this.options.complete) {

						appView.removeEventListener('scroll',scrollImg,false);
						
					} else {
						
						list.forEach((el) => {
							
							if (!el.dataset.LazyLoadImgState && this.getClientRect(el, this.options.position)) {
								
								
								this.loadImg(el);
								
							}
						})
					}
				}
				
				const scrollImg = this.throttle(() => {
					
					scrollLoad();
					
				},this.options.time)
				
				scrollLoad();

				appView.addEventListener('scroll',scrollImg,false);
				
	
			},
			loadImg(el) { //加载图片
				
				el.dataset.LazyLoadImgState = 'start'
	
				const img = new Image()
				
				img.src = el.dataset.src
	
				img.addEventListener('load', () => {
					
					el.src = img.src
					
					delete el.dataset.src
					
					el.dataset.LazyLoadImgState = 'success'

					el.classList.add('successImg')
					
					
				}, false)
	
				img.addEventListener('error', () => {
					
					delete el.dataset.src
					
					el.dataset.LazyLoadImgState = 'error'

					el.src = this.options.errorImg
					
				}, false)
			},
			throttle (func, wait, mustRun) {
				var timeout,
					startTime = new Date();
				return function() {
					var context = this,
						args = arguments,
						curTime = new Date();
	
					clearTimeout(timeout);
					// 如果达到了规定的e触发时间间隔，触发 handler
					if(curTime - startTime >= mustRun){
						func.apply(context,args);
						startTime = curTime;
						// 没达到触发间隔，重新设定定时器
					}else{
						timeout = setTimeout(func, wait);
					}
				}
			}
		}
	
	}


</script>

<style lang="scss">
	
	.successImg {
		-webkit-animation: fadeIn 1s ease 0.2s 1 both;
		animation: fadeIn 1s ease 0.2s 1 both;
	}
	
	
	@-webkit-keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}


</style>

