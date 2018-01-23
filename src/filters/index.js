/**
 * @param {Number} str
 * @param {Number} number
 * @returns {string}
 * toThousands(2343244.452,2)
 * =>"2,343,244.45"
 */

const toThousands  = function (str) {

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

}

const price = function (val) {

	return (val / 100).toFixed(2)


}

export default { toThousands, price }