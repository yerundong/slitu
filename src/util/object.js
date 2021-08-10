import { checkTypeOrError, isVoid } from './type'
import isPlainObject from 'lodash/isPlainObject'
import cloneDeep from 'lodash/cloneDeep'

/**
 * 移除对象无效属性
 * 注意：只处理自身属性；返回新对象，不影响原对象
 */
export const removeInvalidProp = (obj) => {
	checkTypeOrError(obj, 'Object')
	const obj_ = cloneDeep(obj)
	Object.keys(obj_).forEach((key) => {
		isVoid(obj_[key]) && delete obj_[key]
	})
	return obj_
}

/**
 * 递归移除对象无效属性
 * 注意：只处理自身属性；返回新对象，不影响原对象
 */
export const removeInvalidPropDeep = (obj) => {
	checkTypeOrError(obj, 'Object')
	const obj_ = cloneDeep(obj)
	Object.keys(obj_).forEach((key) => {
		if (isPlainObject(obj_[key])) {
			obj_[key] = removeInvalidPropDeep(obj_[key])
		} else {
			isVoid(obj_[key]) && delete obj_[key]
		}
	})
	return obj_
}
