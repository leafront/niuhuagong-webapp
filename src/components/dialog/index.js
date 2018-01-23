var Toast = {};
//避免重复install，设立flag
Toast.installed = false;
Toast.install = function(Vue, options) {
	if(Toast.installed) return;
	Vue.prototype.$dialog = (options) => {

		// 如果页面有toast则不继续执行
		if(document.querySelector('.dialog-container')) return;
		// 1、创建构造器，定义好提示信息的模板
		let toastTip = Vue.extend({
			template: `
				<div class="dialog-container weui-show">
					<div class="dialog-mask"></div>
					<div class="weui-dialog">
						<div class="weui-dialog__bd" id = "dialog-content">${options.content}</div>
						<div class="weui-dialog__ft">
							<span id = "dialog-cancel" class="weui-dialog__btn weui-dialog__btn_default">取消</span>
							<span id = "dialog-confirm" class="weui-dialog__btn weui-dialog__btn_primary">确认</span>
						</div>
					</div>
				</div>`
		});

		// 2、创建实例，挂载到文档以后的地方
		let tpl = new toastTip().$mount().$el;

		// 3、把创建的实例添加到body中
		document.body.appendChild(tpl);

		document.getElementById('dialog-cancel').addEventListener('click',() => {

			document.body.removeChild(tpl);

		})



		document.getElementById('dialog-confirm').addEventListener('click', () => {

			document.body.removeChild(tpl);

			options.success();

		})

		Toast.installed = true;

	};
};

if(typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(Toast)
};

export default Toast;
