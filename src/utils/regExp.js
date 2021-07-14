// 邮箱
export const validateEmail = (str) =>
	/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)

// 手机号码
export const validateTelphone = (str) => /^1[3456789]\d{9}$/.test(str)

// 特殊开票手机号码，11位数字
export const validate11Num = (str) => /^\d{11}$/.test(str)

// 固定电话
export const validateFixedphone = (str) =>
	/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)

// 身份证号（18位）
export const validateIdCard = (str) =>
	/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
		str
	)

// URL
export const validateUrl = (str) =>
	/^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(
		str
	)

// IPv4地址
export const validateIPv4 = (str) =>
	/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
		str
	)

// 金额
export const amount = /((^-?[1-9]\d*)|^-?0)(\.\d{0,4}){0,1}$/

// 用户名，4到16位（字母，数字，下划线，减号）
export const validateUserName = (str) => /^[a-zA-Z0-9_-]{2,50}$/.test(str)

// 密码强度，6-20位，数字，字母，特殊字符至少包含两种，不能包含中文和空格
export const validatePwd = (str) =>
	/(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,20}$/.test(
		str
	)

// 全中文校验
export const validateCNChar = (str) => /^[\u4e00-\u9fa5]*$/.test(str)

// 包含中文
export const validateContainsCNChar = (str) => /[\u4e00-\u9fa5]/.test(str)

// 只能包含数字
export const validateNum = (str) => /^[0-9]*\.?[0-9]*$/i.test(str)

// 只能包含字母字符
export const validateAlpha = (str) => /^[A-Z]*$/i.test(str)

// 只能包含字母字符或数字
export const validateAlphaNum = (str) => /^[0-9A-Z]*$/i.test(str)

// 只能包含字母字符或空格
export const validateAlphaSpaces = (str) => /^[A-Z\s]*$/i.test(str)

// 只能包含字母字符，数字，破折号或下划线
export const validateAlphaDash = (str) => /^[0-9A-Z_-]*$/i.test(str)

export const validateSimpleCode = (str) => /^[A-Za-z0-9:*_-]*$/.test(str)

// 只能包含中文、字母，数字
export const validateCNCharAlphaNum = (str) =>
	/^[\u4e00-\u9fa5a-zA-Z0-9]*$/i.test(str)
