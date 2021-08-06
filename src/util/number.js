import { isNotInTypes, isLikeNumber, getType } from './type'

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
 * 数字双位格式化
 * @param {likeNumber} value
 * @returns {String}
 * 注意非 likeNumber 类型，替换为 0
 */
export const doubleNumber = (value) => {
	if (!isLikeNumber(value))
		throw new Error(`Expected Number or LikeNumber, got ${getType(value)}`)

	const value_ = Number(value)
	let sym = ''
	if (number < 0) {
		sym = '-'
	}

	let abs = Math.abs(value_)

	if (abs < 10 && abs >= 0) {
		return sym + '0' + abs
	} else {
		return value_.toString()
	}
}
