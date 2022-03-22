import { checkTypeOrError, getTypeOf } from './type' 

/**
 * 通过 object 数据生成 URL 查询字符串: "a=1&b=2&c=3"
 * @param {boolean} encode 是否对每个参数进行编码
 * @param {boolean} withPrefix 是否带?符号
 */
export const queryStringify = (objValue = {}, encode = true, withPrefix = true) => {
    checkTypeOrError(objValue, 'Object')
    let str = withPrefix ? '?': ''
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
		if(str === '' || str === '?'){
			str += `${key}=${value_}`
		}else{
			str += `&${key}=${value_}`
		}
    }
    return str
}

/**
 * 解析 URL 查询字符串，生成 object 数据
 */
export const parseQueryString = (queryString = '') => {
	checkTypeOrError(queryString, 'String')
	const arr1 = queryString.split('?')
	let queryStr;
	if(arr1.length === 1){
		queryStr = arr1[0]
	}else if(arr1.length === 2){
		queryStr = arr1[1]
	}else {
		return {}
	}
	const arr2 = decodeURIComponent(queryStr).split('&')
	const obj = {}
	arr2.forEach(item => {
		const arr3 = item.split('=')
		obj[arr3[0]] = arr3[1]
	})
	return obj
}
