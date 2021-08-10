import { isLikeNumber, getType, checkTypeOrError } from './type'

// import { create, all } from 'mathjs'
// const config = {
// 	epsilon: 1e-12,
// 	matrix: 'Matrix',
// 	number: 'BigNumber', // 可选值：number BigNumber
// 	precision: 64,
// 	predictable: false,
// 	randomSeed: null,
// }
// const math = create(all, config)
// const { add, chain, bignumber, evaluate, format } = math

// const a = chain('123,123')
// 	.add(4)
// 	.multiply(bignumber(2.1))
// 	.done()

// console.log(a.toNumber())
// console.log(add(0.1, 0.2))
// console.log(format(add(bignumber(0.1), bignumber(0.2))) * 1)
// console.log(format(evaluate('0.1 + 0.2')))

// Number.prototype.add = function(arg) {
// 	var r1, r2, m
// 	try {
// 		r1 = this.toString().split('.')[1].length
// 	} catch (e) {
// 		r1 = 0
// 	}
// 	try {
// 		r2 = arg.toString().split('.')[1].length
// 	} catch (e) {
// 		r2 = 0
// 	}
// 	m = Math.pow(10, Math.max(r1, r2)) // 取位数最大的那个
// 	var a = parseInt(this * m + 0.5)
// 	var b = parseInt(arg * m + 0.5)
// 	return (a + b) / m
// }
// console.log(0.1 + 0.2)
// console.log((0.1).add(0.2))

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
