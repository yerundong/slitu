import { checkTypeOrError, getTypeOf } from './type'

/**
 * 通过 object 数据生成 URL 查询字符串
 * @param {boolean} encode 是否对每个参数进行编码
 */
export const queryStringify = (objValue = {}, encode = true) => {
	checkTypeOrError(objValue, 'Object')
	let str = ''
	for (let key in objValue) {
		const value = objValue[key]
		let value_
		if (getTypeOf(value) === 'basic') {
			value_ = encode ? encodeURIComponent(value) : value
		} else {
			value_ = encode
				? encodeURIComponent(JSON.stringify(value))
				: JSON.stringify(value)
		}
		str += `&${key}=${value_}`
	}
	return str.slice(1)
}

/**
 * 通过 object 数据生成 URL 查询字符串
 * @param {boolean} encode 是否对每个参数进行编码
 */
export const parseQueryString = (queryString = '', encode = true) => {
	checkTypeOrError(queryString, 'String')
	const arr = queryString.split('&')
	arr
	debugger
	return
}
