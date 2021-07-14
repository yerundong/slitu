import { getType } from './object'

/**
 * 判断是否合法数字
 * 合法数字：123、"123"
 * 不合法：NaN、Boolean、以及其他
 */
export const isLegalNumber = (value) => {
	if (!['String', 'Number'].includes(getType(value))) return false
	if (value === '') return false
	let value_ = Number(value)
	if (Number.isNaN(value_)) return false
	return true
}

/**
 * 数字双位格式化
 * @param {Number} value
 * @returns {String}
 */
export const doubleNumber = (value) => {
	if (!isLegalNumber(value))
		throw new Error('doubleNumber: value is not legal number')

	const number = Number(value)

	let np = ''
	if (number < 0) {
		np = '-'
	}

	let abs = Math.abs(number)

	if (abs < 10 && abs >= 0) {
		return np + '0' + abs
	} else {
		return number.toString()
	}
}
