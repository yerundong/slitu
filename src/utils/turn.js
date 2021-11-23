import { checkTypeOrError } from './type'

/**
 * object 转 formData
 * @param {Object} obj
 */
export const objectToFormData = (obj) => {
	checkTypeOrError(obj, 'Object')
	const fd = new FormData()
	Object.keys(obj).forEach((key) => {
		fd.append(key, obj[key])
	})
	return fd
}

/**
 * formData 转 object
 * @param {Object} obj
 */
export const formDataToObject = (fd) => {
	checkTypeOrError(fd, 'FormData')
	const obj = {}
	fd.forEach((value, key) => (obj[key] = value))
	return obj
}
