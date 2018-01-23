
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

		var overscroll = function(el) {
			el.addEventListener('touchstart', function() {
				var top = el.scrollTop
					, totalScroll = el.scrollHeight
					, currentScroll = top + el.offsetHeight;
				//If we're at the top or the bottom of the containers
				//scroll, push up or down one pixel.
				//
				//this prevents the scroll from "passing through" to
				//the body.
				//console.log('top', top)
				//console.log('totalScroll', totalScroll)
				//console.log('totalScroll',totalScroll)
				if(top === 0) {
					el.scrollTop = 1;
				} else if(currentScroll === totalScroll) {
					el.scrollTop = top - 1;
				}
			});
			el.addEventListener('touchmove', function(evt) {
				//if the content is actually scrollable, i.e. the content is long enough
				//that scrolling can occur
				//console.log('touchmoveoffsetheight',el.offsetHeight)
				//console.log('touchmovescrollheight',el.scrollHeight)

				if(el.offsetHeight < el.scrollHeight)

					evt._isScroller = true;
			});

		}
		overscroll(document.querySelector(".scroll-view-wrapper"));

		function bodyScroll (evt) {

			//In this case, the default behavior is scrolling the body, which
			//would result in an overflow.  Since we don't want that, we preventDefault.
			if(!evt._isScroller) {

				evt.preventDefault();
			}
		}

		document.body.addEventListener('touchmove',bodyScroll);

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

	}

}

export default utils;