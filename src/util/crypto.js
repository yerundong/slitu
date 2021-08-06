import MD5 from 'md5'

const Base64 = require('js-base64').Base64

/**
 * Base64加密
 * @param {string} str 待加密字符串
 */
export const encrypt = str => Base64.encode(str)

/**
 * Base64解密
 * @param {string} str 待解密的字符串
 * @return {string}
 */
export const decrypt = str => Base64.decode(str)

/**
 * MD5加密
 * @param {string} str 待加密字符串
 */
export const md5 = str => MD5(str)
