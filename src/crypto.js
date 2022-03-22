import CryptoJS from 'crypto-js'

/**
 * @description 生成uuid，根据随机数，或者伪随机数生成UUID，有一定的重复概率
 * @param { Number } len 长度
 * @param { Number } radix 基数 
 */
export const uuid = (len, radix) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []; let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**  
 * @description: base64加密
 * @param {String} word 需要加密的字符串
 */
export const base64Encrypt = (word) => {
  const wordArray = CryptoJS.enc.Utf8.parse(word)
  const base64 = CryptoJS.enc.Base64.stringify(wordArray)
  return base64
}

/**
 * @description: base64解密
 * @param {String} word 需要解密的字符串
 */
export const base64Decrypt = (word) => {
  const wordArray = CryptoJS.enc.Base64.parse(word)
  const deBase64 = wordArray.toString(CryptoJS.enc.Utf8)
  return deBase64
}
