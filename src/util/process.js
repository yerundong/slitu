import { checkTypeOrError } from './type'

/**
 * 值替换
 */
export const displace = (value, replacement, replaceRange = []) => {
	checkTypeOrError(replaceRange, 'Array')
	return replaceRange.includes(value) ? replacement : value
}

/**
 * 空值替换
 */
export const displaceNil = (value, replacement) => {
	return displace(value, replacement, [NaN, undefined, null, ''])
}
