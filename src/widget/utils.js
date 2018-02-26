
const utils = {
	setTimeout (callback,times) {

		this.timer = setTimeout(() => {
			callback()
			clearTimeout(this.timer)
		},times)

	},
	clearTimeout () {

		clearTimeout(this.timer)

	},
	serialize(value) {
		return JSON.stringify(value);
	},

	deserialize(value) {

		if (typeof value != 'string' || value == '') return undefined;

		try {
			return JSON.parse(value);
		} catch (e) {

			return undefined;
		}
	},

	isLocalStorageSupported() {
		var testKey = 'test',
			storage = window.sessionStorage;
		try {
			storage.setItem(testKey, 'testValue');
			storage.removeItem(testKey);
			return true;
		} catch (error) {
			return false;
		}
	},

	/**
	 *
	 * @param {Function} func
	 * @param {Boolean} wait
	 * @param {Boolean} mustRun
	 * @returns {Function}
	 */
	throttle: function (func, wait, mustRun) {
		var timeout,
			startTime = new Date();

		return function() {
			var context = this,
				args = arguments,
				curTime = new Date();

			clearTimeout(timeout);
			// 如果达到了规定的触发时间间隔，触发 handler
			if(curTime - startTime >= mustRun){

				func.apply(context,args);

				startTime = curTime;

				// 没达到触发间隔，重新设定定时器
			}else{

				timeout = setTimeout(func, wait);

			}
		}
	},
	isWeixin () {

		const ua = window.navigator.userAgent.toLowerCase();

		const isWeixin = ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false

		return isWeixin

	},
	isWeixinIphoneX (){

		const isWeixin = this.isWeixin()

		const ua = window.navigator.userAgent.toLowerCase();

		const isPhoneX = /iphone/gi.test(ua) && (screen.height == 812 && screen.width == 375)

		return (isWeixin && isPhoneX)
	},

	fixedBottom () {

		var scrollEl = document.querySelector('.scroll-view-wrapper');

		var overscroll = () => {
			scrollEl.addEventListener('touchstart', topScroll,  this.isPassive() ? {passive: true} : false);
			scrollEl.addEventListener('touchmove', botScroll, this.isPassive() ? {passive: true} : false);
		}

		overscroll()

		function topScroll () {

			var top = scrollEl.scrollTop
				, totalScroll = scrollEl.scrollHeight
				, currentScroll = top + scrollEl.offsetHeight;
			//If we're at the top or the bottom of the containers
			//scroll, push up or down one pixel.
			//
			//this prevents the scroll from "passing through" to
			//the body.
			if(top === 0) {
				scrollEl.scrollTop = 1;
			} else if(currentScroll === totalScroll) {
				scrollEl.scrollTop = top - 1;
			}

		}

		function  botScroll (evt) {
			//if the content is actually scrollable, i.e. the content is long enough
			//that scrolling can occur

			if(scrollEl.offsetHeight < scrollEl.scrollHeight)

				evt._isScroller = true;

		}

	},
	/**
	 * @param {Object} obj
	 * @returns {string}
	 * @example
	 * util.queryStringify({name:'leafront',age:23}) =>  'name=leafront&age=23'
	 *
	 */

	queryStringify (obj) {

		function toQueryPair(key,value) {

			if (value==='') {

				return key;

			}

			return key + '=' + encodeURIComponent(value==='' ? '' : String(value));

		}

		var result = [];

		for (var key in obj) {

			key = encodeURIComponent(key);

			var values = obj[key];

			if (values && values.constructor == Array) {

				var queryValues = [];

				for (var i = 0, len = values.length; i < len; i++) {

					queryValues.push(toQueryPair(key, values[i]));

				}

				result = result.concat(queryValues);

			} else {

				result.push(toQueryPair(key,values));

			}

		}


		return result.join('&');

	},

	/**
	 *
	 * @param {String} res
	 */

	appendScript (res) {

		const script = document.createElement('script')
		script.appendChild(document.createTextNode(res))
		document.head.appendChild(script)

	},
	isPassive() {

		let supportsPassiveOption = false
		try {
			addEventListener("test", null, Object.defineProperty({}, 'passive', {
				get: function () {
					supportsPassiveOption = true
				}
			}));
		} catch(e) {}
		return supportsPassiveOption;   //{passive: true} 就不会调用 preventDefault 来阻止默认滑动行为

	},
	isContained (arr1,arr2){
		if(!(arr1 instanceof Array) || !(arr2 instanceof Array)) return false;
		if(arr1.length < arr2.length) return false;
		var aStr = arr1.toString();
		for(var i = 0, len = arr2.length; i < len; i++){
			if(aStr.indexOf(b[i]) == -1) return false;
		}
		return true;
	}

}

export default utils;