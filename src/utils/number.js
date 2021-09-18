import { isLikeNumber, getType, checkTypeOrError } from './type'
import Decimal from 'decimal.js'
import Currency from 'light-currency'

// Decimal
export const add = Decimal.add.bind(Decimal) // +
export const sub = Decimal.sub.bind(Decimal) // -
export const mul = Decimal.mul.bind(Decimal) // ×
export const div = Decimal.div.bind(Decimal) // ÷
export const sum = Decimal.sum.bind(Decimal)
export const toFixed = (value, dp, rm) =>
	new Decimal(value).toFixed(dp, rm).valueOf()
export const toDP = (value, dp, rm) => new Decimal(value).toDP(dp, rm).valueOf()

// Currency
Currency.setConfig({
	prefix: '￥',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 4,
	suffix: '',
})
Currency.extend('add', function(value) {
	return this.setValue(add(this.value, value).valueOf())
})

Currency.extend('sub', function(value) {
	return this.setValue(sub(this.value, value).valueOf())
})

Currency.extend('mul', function(value) {
	return this.setValue(mul(this.value, value).valueOf())
})

Currency.extend('div', function(value) {
	return this.setValue(mul(this.value, value).valueOf())
})

Currency.extend('toFixed', function(dp) {
	return this.setValue(toFixed(this.value, dp))
})

Currency.extend('toDP', function(dp) {
	return this.setValue(toDP(this.value, dp))
})

export { Currency }

/**
 * 获取数字整数位的位数
 * @param {Number,LikeNumber} value
 * @returns {String}
 */
export const getIntFigure = (value) => {
	if (!isLikeNumber(value))
		throw new Error(`Expected Number or LikeNumber, got ${getType(value)}`)
	const value_num = Number(value)
	return parseInt(Math.abs(value_num)).toString().length
}

/**
 * 补足整数数位
 * @param {Number,LikeNumber} value
 * @param {Number} figture 位数
 * @returns {String}
 */
export const completeIntDigit = (value, figture = 2) => {
	if (!isLikeNumber(value))
		throw new Error(`Expected Number or LikeNumber, got ${getType(value)}`)
	checkTypeOrError(figture, 'Number')
	if (figture < 1) figture = 1
	const value_num = Number(value)
	const figture_ = getIntFigure(value)
	if (figture_ >= figture) {
		return value.toString()
	} else {
		const diffFig = figture - figture_
		const value_abs = Math.abs(value_num)
		const symbol = value_num < 0 ? '-' : ''
		return `${symbol}${'0'.repeat(diffFig)}${value_abs}`
	}
}
