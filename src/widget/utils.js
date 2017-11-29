const utils = {
	/**
	 * @param {Number} str
	 * @param {Number} number
	 * @returns {string}
	 * toThousands(2343244.452,2)
	 * =>"2,343,244.45"
	 */

	toThousands: function (str) {

		var number = arguments[1] || 0;

		var str = str.toString();

		var decimal = '';

		var pos = str.indexOf('.');

		var result = '';

		var decimalPos = '0';

		if (pos > -1) {

			decimal =  str.slice(pos,pos + 1 + number);

			str = str.slice(0,pos);

		}

		while( str.length > 3) {

			result = ',' + str.slice(-3) + result;

			str = str.slice(0,str.length-3);

		}

		if (str) {

			result = str + result;

			if(decimal && number) {

				decimal = (+decimal).toFixed(number)

				result += decimal

			} else {

				if (number){

					decimalPos = '.' + decimalPos.repeat(number)

					result += decimalPos

				}

			}

		}

		return result;

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
	}

}

export default utils;