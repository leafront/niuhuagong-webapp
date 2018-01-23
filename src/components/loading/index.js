var Loading = {};
//避免重复install，设立flag
Loading.installed = false;
Loading.install = function(Vue, options) {
	if(Loading.installed) return;
	let opt = {
		// 默认持续时间
		duration: "3000"
	}
	// 使用options的配置
	for(let i in options) {
		opt[i] = options[i]
	}
	Vue.prototype.$showLoading = () => {

		// 如果页面有toast则不继续执行
		if(document.querySelector('.ui-loading-mask')) return;
		// 1、创建构造器，定义好提示信息的模板
		let toastTip = Vue.extend({
			template: `
			<div class="ui-loading-mask">
			 <div class="ui-mask-cont">
				 <svg class="ui-mask-loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
						<rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(0 50 50) translate(0 -30)">
						<animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0s" repeatCount="indefinite"></animate>
						</rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(30 50 50) translate(0 -30)">
						<animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.06666666666666667s" repeatCount="indefinite">   
						</animate>
						</rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(60 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.13333333333333333s" repeatCount="indefinite"></animate>
						</rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(90 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.20000000000000004s" repeatCount="indefinite"></animate></rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(120 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.26666666666666666s" repeatCount="indefinite"></animate></rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(150 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(180 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.4000000000000001s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(210 50 50) translate(0 -30)">
						<animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.46666666666666673s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(240 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.5333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(270 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.6s" repeatCount="indefinite"></animate></rect>
						<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(300 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#fff" transform="rotate(330 50 50) translate(0 -30)"><animate attributeName="opacity" from="1" to="0" dur="0.8s" begin="0.7333333333333334s" repeatCount="indefinite"></animate></rect>
				 </svg>努力加载中...
			 </div>   
			 </div>
			`
		});
		// 2、创建实例，挂载到文档以后的地方
		let tpl = new toastTip().$mount().$el;
		// 3、把创建的实例添加到body中
		document.body.appendChild(tpl);

		//阻止遮罩滑动
		tpl.addEventListener("touchmove", function(e) {
			e.stopPropagation();
			e.preventDefault();
		})

		Loading.installed = true;

	}

	Vue.prototype.$hideLoading = () => {

		const maskUi = document.querySelector('.ui-loading-mask');

		if (maskUi) {
			maskUi.parentNode.removeChild(maskUi);
		}
	}

};

if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Loading)
};

export default Loading;
