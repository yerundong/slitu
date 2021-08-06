import { throwTypeError } from './type'

/**
 * 判断两个数组是否元素相同，无关顺序
 * array1、array2的元素只能是基本类型，若是引用类型则结果判断不准确
 */
export const arraysEqualIgnoreOrder = (array1, array2) => {
	throwTypeError(array1, 'Array')
	throwTypeError(array2, 'Array')

	if (array1 === [] && array2 === []) return true

	if (array1.length !== array2.length) return false

	return array1.sort().toString() === array2.sort().toString()
}
