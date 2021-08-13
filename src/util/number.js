import { isLikeNumber, getType, checkTypeOrError } from './type'
import Decm from 'decimal.js'
import currency from 'currency.js'

export const add = Decm.add.bind(Decm) // +
export const sub = Decm.sub.bind(Decm) // -
export const mul = Decm.mul.bind(Decm) // ×
export const div = Decm.div.bind(Decm) // ÷
export const sum = Decm.sum.bind(Decm)

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
