/**
 * 获取数据类型
 * 注意：此处将 NaN 作为一个单独的类型，标识为'NaN'，而非'Number'，以下设计类型的均是如此，不再标注
 */
export const getType = (value) => {
	const type = Object.prototype.toString.call(value).slice(8, -1)
	if (Number.isNaN(value)) return 'NaN'
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
	checkTypeOrError(type_array, 'Array')
	return type_array.includes(getType(value))
}

/**
 * 判断数据是否不是类型之一
 */
export const isNotInTypes = (value, type_array = []) => {
	checkTypeOrError(type_array, 'Array')
	return !isInTypes(value, type_array)
}

/**
 * 是否 Number 类型（不包含NaN）
 */
export const isNum = (value) => {
	return getType(value) === 'Number'
}

/**
 * 判断是否类数字(LikeNumber)
 * 类数字：123、"123"
 */
export const isLikeNum = (value) => {
	if (isNotInTypes(value, ['String', 'Number'])) return false
	if (value === '') return false
	let value_ = Number(value)
	if (Number.isNaN(value_)) return false
	return true
}

/**
 * 是否 Boolean 类型
 */
export const isBool = (value) => {
	return getType(value) === 'Boolean'
}

/**
 * 是否 String 类型
 */
export const isStr = (value) => {
	return getType(value) === 'String'
}

/**
 * 是否 Array 类型
 */
export const isArr = (value) => {
	return Array.isArray(value)
}

/**
 * 是否 Object 类型
 */
export const isObj = (value) => {
	return getType(value) === 'Object'
}

/**
 * 是否 null 类型
 */
export const isNul = (value) => {
	return value === null
}

/**
 * 是否 undefined 类型
 */
export const isUndef = (value) => {
	return value === undefined
}

/**
 * 是否是 NaN
 */
export const isNaN = (value) => {
	return Number.isNaN(value)
}

/**
 * 判断数据是否是 undefined, null, NaN 之一
 */
export const isInvalid = (value) => [undefined, null, NaN].includes(value)

/**
 * 判断数据是否是 undefined, null, NaN, '' 之一
 */
export const isVoid = (value) => [undefined, null, NaN, ''].includes(value)

/**
 * 判断数据是否是假植，包括：undefined, null, NaN, false, '', 0
 */
export const isLikeFalse = (value) =>
	[undefined, null, NaN, false, '', 0].includes(value)

/**
 * 判断数据的类型是否相同
 */
export const isTypeEqual = (value1, value2) =>
	getType(value1) === getType(value2)

/**
 * 判断传入数据与期望类型是否一致，若不一致，抛出异常
 */
export const checkTypeOrError = (value, expectedType) => {
	const gotType = getType(value)
	if (gotType !== expectedType)
		throw new Error(`Expected ${expectedType}, got ${gotType}`)
}

/**
 * 判断传入数据是期望类型之一，若不是，抛出异常
 */
export const checkTypesOrError = (value, expectedTypes) => {
	checkTypeOrError(expectedTypes, 'Array')
	if (isNotInTypes(value, expectedTypes)) {
		throw new Error(
			`Expected ${expectedTypes.toString()}, got ${getType(value)}`
		)
	}
}
