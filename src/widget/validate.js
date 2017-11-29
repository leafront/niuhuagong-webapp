
var validate = {
	/**
	 * @param {string} phone
	 * @return {boolean}
	 */
	isMobile (text) {

		var pattern = /^1[3-8]\d{9}$/;

		return pattern.test(text);

	},

	/**
	 * @param {string} zipCode
	 * @returns {boolean}
	 * @example
	 * Lizard.isZipCode('430406')
	 */
	isZipCode (text){

		var pattern = /^[0-9]{6}$/;

		return pattern.test(text);
	},

	/**
	 *
	 * @param {string} text
	 * @returns {boolean}
	 */

	isNumber (text) {

		var pattern = /^[0-9]\d{0,8}$/;

		return pattern.test(text);

	},

	/**
	 * @param {Number || String} text
	 * @returns {boolean}
	 */

	checkNumber: function (text) {

		var pattern = /^[0-9]+.?[0-9]*$/;

		return pattern.test(text);

	},

	/**
	 *
	 * @param {string} text
	 *
	 * @returns {boolean}
	 */

	isPercent (text) {

		var pattern = /^((\d+\.?\d*)|(\d*\.\d+))$/;

		return pattern.test(text);

	},
	/**
	 * 邮箱验证
	 * @param {string} email
	 * @return {boolean}
	 * @example
	 * validate.isEmail('leafront@126.com')
	 */
	isEmail: function (text) {

		var pattern = /^([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;

		return pattern.test(text);
	},

	/**
	 *
	 * @param {string} password
	 * @returns {boolean}
	 */
	isPass: function(text){

		var pattern = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{8,64}/i;

		return pattern.test(text)

	},
	/**
	 * 验证是否为真实姓名，中英文和数字，中文算两个，长度不超过20
	 * @param {string} name 姓名
	 * @return {boolean}
	 * @example
	 * validate.isName('张三')
	 */
	isName: function (text) {

		var pattern = /^([\u4e00-\u9fa5]|[A-Za-z_])+$/;

		if (pattern.test(text)) {

			text = text.replace(/[\u4e00-\u9fa5]/g, '__');

			return text.length <= 20;

		} else {

			return false;

		}
	},

	/**
	 * 验证银行卡
	 * @param {string} text 银行卡
	 * @return {boolean}
	 * @example
	 * validate.isBankCard('5222323889')
	 */
	isBankCard: function(text) {
		// 16位以上
		var pattern = /^\d{16,19}$/;

		return pattern.test(text);
	},

	/**
	 * @param {string} verifyCode
	 * @return {boolean}
	 * @example
	 * validate.isVerify('4545')
	 */
	isVerify: function(text){

		var pattern = /^[0-9a-zA-Z]{4}$/;

		return pattern.test(text);

	},
	/**
	 * 验证是否为身份证号码
	 * @param {string} card 身份证号码
	 * @return {boolean}
	 * @example
	 * validate.isIdCard('513030198908230234')
	 */
	isIdCard: function(text) {
		//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
		var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;

		return pattern.test(text);

	},

	/**
	 * 车牌号,这个字段比较特殊，可以宽松验证，也可以严格保证7位验证
	 * 验证前，先调用{@link validate.toUpperCase}这个方法,矫正用户的输入
	 * @param {string} carNumber 车牌号
	 * @return {boolean}
	 * @example
	 *
	 * validate.isCarNumber('沪A') // 返回false
	 * validate.isCarNumber('沪A123456')  // 返回true
	 */
	isCarNumber: function(text) {
		return /^[\u4e00-\u9fa5][A-Za-z][A-Za-z0-9]{5,6}$/.test(text);
	},
	/**
	 * 发动机号
	 * @param {string} text 发动机号码
	 * @return {boolean}
	 * @example
	 * validate.isEngineNumber('EA02551')
	 */
	isEngineNumber: function(text) {

		var pattern = /^[A-Z0-9\*]{4,17}$/;

		return pattern.test(text);
	},
	/**
	 * 车架号,验证前，先调用{@link validate.toUpperCase}这个方法,矫正用户的输入
	 * @param {string} text 字符串
	 * @param {int} [length=17] 验证长度
	 * @return {boolean}
	 * @example
	 * validate.isVin('EA02551', 6)
	 * validate.isVin('LSVHJ133022221761')
	 */
	isVin: function(text, length) {
		length = length || 17;

		var pattern = new RegExp('^[A-Z0-9]{' + length + '}$');

		return pattern.test(text);
	},

	/**
	 *
	 * @param {string} text
	 *
	 * @returns {boolean}
	 */
	isDisplacement:function(text){

		var pattern = /^([1-8]$)|(^[1-8]\.[0-9]$)/;

		return pattern.test(text);
	}

}

export default validate