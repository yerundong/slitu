/**
 * type.js处理数据类型相关方法
 * 注意：此处将 NaN 作为一个单独的类型，标识为'NaN'，而非'Number'
 */
import isNaN from 'lodash/isNaN'
/**
 * 获取数据类型
 */
export const getType = (value) => {
	const type = Object.prototype.toString.call(value).slice(8, -1)
	if (isNaN(value)) return 'NaN'
	return type
}

/**
 * 判断数据是引用类型还是基本类型
 */
export const getTypeOf = (value) =>
	isInTypes(value, [
		'Number',
		'String',
		'Boolean',
		'Undefined',
		'Null',
		'NaN',
		'Symbol',
	])
		? 'basic'
		: 'refer'

/**
 * 判断数据是否是类型之一
 */
export const isInTypes = (value, type_array = []) => {
	throwTypeError(type_array, 'Array')
	return type_array.includes(getType(value))
}

/**
 * 判断数据是否不是类型之一
 */
export const isNotInTypes = (value, type_array = []) => {
	throwTypeError(type_array, 'Array')
	return !isInTypes(value, type_array)
}

/**
 * 判断数据是否 Object 类型
 * 覆盖 lodash 的 isObject，lodash 的 isObject([]) 结果为 true，本方法严格区分 Object 和其他引用类型
 */
export const isObject = (value) => getType(value) === 'Object'

/**
 * 判断数据是否Undefined、Null、NaN类型
 */
export const isUseless = (value) =>
	isInTypes(value, ['Undefined', 'Null', 'NaN'])

/**
 * 判断是否类数字
 * 类数字：123、"123"
 * 不合法：NaN、Boolean、以及其他
 */
export const isLikeNumber = (value) => {
	if (isNotInTypes(value, ['String', 'Number'])) return false
	if (value === '') return false
	let value_ = Number(value)
	if (isNaN(value_)) return false
	return true
}

/**
 * 判断数据的类型是否相同
 */
export const isTypeEqual = (value1, value2) =>
	getType(value1) === getType(value2)

/**
 * 判断传入数据与期望类型是否一致，若不一致，抛出异常
 */
export const throwTypeError = (value, expectedType) => {
	const gotType = getType(value)
	if (gotType !== expectedType)
		throw new Error(`Expected ${expectedType}, got ${gotType}`)
}

/**
 * 判断传入数据与多个期望类型是否一致，若不一致，抛出异常
 */
export const throwTypesError = (value, expectedTypes) => {
	throwTypeError(expectedTypes, 'Array')
	if (isNotInTypes(value, expectedTypes)) {
		throw new Error(
			`Expected ${expectedTypes.toString()}, got ${getType(value)}`
		)
	}
}
