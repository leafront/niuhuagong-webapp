var Toast = {};
//避免重复install，设立flag
Toast.installed = false;
Toast.install = function(Vue, options) {
	if(Toast.installed) return;
	let opt = {
		// 默认显示位置
		defaultType: "center",
		// 默认持续时间
		duration: "3000"
	}
	// 使用options的配置
	for(let i in options) {
		opt[i] = options[i]
	}
	Vue.prototype.$toast = (toast) => {

		// 如果页面有toast则不继续执行
		if(document.querySelector('.mask-ui')) return;
		// 1、创建构造器，定义好提示信息的模板
		let toastTip = Vue.extend({
			template: `
				 <div class="mask-ui">
					<span>${toast}</span>
				 </div>       `
		});
		// 2、创建实例，挂载到文档以后的地方
		let tpl = new toastTip().$mount().$el;
		// 3、把创建的实例添加到body中
		document.body.appendChild(tpl);
		// 4.三秒后移除
		setTimeout(() => {
			document.body.removeChild(tpl);
		}, opt.duration);

		Toast.installed = true;

	};
};

if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Toast)
};

export default Toast;
