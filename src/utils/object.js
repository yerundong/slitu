import extend from 'extend'

/**
 * 深拷贝
 * @param {object,array} obj
 */
export const deepClone = (obj) =>
	extend(true, Array.isArray(obj) ? [] : {}, obj)

/**
 * 获取数据类型
 */
export const getType = (value) =>
	Object.prototype.toString.call(value).slice(8, -1)

/**
 * 判断两个数组是否元素相同，无关顺序
 * arr1、arr2的元素只能是基本类型，若引用类型则结果判断不准确
 */
export const arraysEqualIgnoreOrder = (arr1, arr2) => {
	const type1 = getType(arr1)

	if (type1 !== 'Array')
		throw new Error(
			'arraysEqualIgnoreOrder: arr1 Expected Array, got ' + type1
		)

	const type2 = getType(arr2)
	if (type2 !== 'Array')
		throw new Error(
			'arraysEqualIgnoreOrder: arr2 Expected Array, got ' + type2
		)

	if (arr1 === [] && arr2 === []) return true

	if (arr1.length !== arr2.length) return false

	return arr1.sort().toString() === arr2.sort().toString()
}

/**
 * 给object数据的属性设置默认值，用于设置函数的object参数的属性默认值
 * @param {*} value object参数
 * @param {*} option 各属性默认值
 * @returns
 */
export const objectPropDefValue = (value, option = {}) => {
	const valueType = getType(value)
	if (!['Object', 'Undefined'].includes(valueType)) {
		throw new Error(
			'objectPropDefValue: value Expected Object, got ' + valueType
		)
	}

	const optionType = getType(option)
	if (optionType !== 'Object') {
		throw new Error(
			'objectPropDefValue: option Expected Object, got ' + optionType
		)
	}

	if (valueType === 'Undefined') return option

	for (let key in option) {
		if (value[key] === undefined) {
			value[key] = option[key]
		}
	}

	return value
}

/**
 * 值替换
 */
export const replaceValue = (
	value,
	rval = '',
	range = [null, undefined, '', NaN]
) => {
	const typeRange = getType(range)
	if (typeRange !== 'Array')
		throw new Error('replaceValue: range Expected Array, got ' + typeRange)

	return range.includes(value) ? rval : value
}
