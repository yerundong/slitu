import { checkTypeOrError } from './type'

/**
 * 判断值，值替换
 */
export const displace = (value, replacement, replaceRange = []) => {
	checkTypeOrError(replaceRange, 'Array')
	return replaceRange.includes(value) ? replacement : value
}

/**
 * 判断类型，值替换
 */
export const displaceByType = (value, replacement, replaceRange = []) => {
	
}

/**
 * 常用无效值替换
 */
export const displaceNil = (value, replacement) => {
	return displace(value, replacement, [undefined, null])
}
export const displaceInvalid = (value, replacement) => {
	return displace(value, replacement, [NaN, undefined, null])
}
export const displaceVoid = (value, replacement) => {
	return displace(value, replacement, [NaN, undefined, null, ''])
}

/**
 * 值映射
 */
export const valueMap = (value, list = []) => {
	checkTypeOrError(list, 'Array')
	for (let i = 0, item; item = list[i]; i++) {
		if(item.value === value)
			return item.name
	}
}
