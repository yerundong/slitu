import { throwTypeError } from './type'
// 数组元素个数
// 数组展平

/**
 * 值替换
 */
export const replaceValue = (
	value,
	reval = '',
	range = [null, undefined, NaN, '']
) => {
	throwTypeError(range, 'Array')
	return range.includes(value) ? reval : value
}
