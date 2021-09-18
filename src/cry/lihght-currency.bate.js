// TODO config 类型限制
;(function(global, factory) {
	typeof module === 'object' && typeof module.exports === 'object'
		? (module.exports = factory())
		: (global.Currency = factory())
})(window, function() {
	class Currency {
		/**
		 * @param {Number, String} value 值
		 * @param {Object} config 实例格式化规则配置
		 */
		constructor(value, config) {
			const parseObj = parse(value)
			this.number = parseObj.number
			this.value = parseObj.value
			this.isNaN = parseObj.isNaN

			// 设置实例的 config
			// config 优先于 Currency.config
			this.config = Object.assign({}, Currency.config, config)
		}

		// 类的 config
		// 是每个实例的初始化 config
		// 通过 Currency.setConfig() 修改
		static config = {
			prefix: '$', // 前缀
			decimalSeparator: '.', // 小数符号
			groupSeparator: ',', // 数位分隔符
			groupSize: 3, // 数位分隔组的个数，默认每3位分隔，即千位分隔法
			suffix: '', // 后缀
		}

		// 设置实例的 config
		setConfig(config) {
			Object.assign(this.config, config)
			return this
		}

		/**
		 * 设置value的新值
		 * @param {Number, String} value
		 * @returns 返回原实例
		 */
		setValue(value) {
			const parseObj = parse(value)
			this.number = parseObj.number
			this.value = parseObj.value
			this.isNaN = parseObj.isNaN
			return this
		}

		/**
		 * 格式化
		 * @param {*} config
		 */
		format(config) {
			const config_ = Object.assign({}, this.config, config)
			const {
				prefix,
				decimalSeparator,
				groupSeparator,
				groupSize,
				suffix,
			} = config_

			let sign = '',
				ev = this.value
			if (/^-/.test(ev)) {
				sign = '-'
				ev = ev.replace(/^-/, '')
			}

			if (/\d/g.test(ev)) {
				// 数字类型的数字
				const arr = ev.split('.')
				const intStr = arr[0]
				const decStr = arr[1]
				const intArr = intStr.split('').reverse()
				const spArr = []
				for (let i = groupSize; i < intArr.length; i += groupSize) {
					spArr.push(i)
				}
				for (let i = 0; i < spArr.length; i++) {
					const indx = spArr[i] + i
					intArr.splice(indx, 0, groupSeparator)
				}
				const intStr_ = intArr.reverse().join('')
				if (decStr) {
					return `${sign}${prefix}${intStr_}${decimalSeparator}${decStr}${suffix}`
				} else {
					return `${sign}${prefix}${intStr_}${suffix}`
				}
			} else {
				// 字母类型的数字，如 Infinity
				return `${sign}${prefix}${ev}${suffix}`
			}
		}

		// 设置类的 config
		static setConfig(config) {
			Object.assign(Currency.config, config)
			return Currency
		}

		// 获取实例
		static getInstance(value, config) {
			return new Currency(value, config)
		}

		/**
		 * 将任意格式的值解析成 Currency 实例
		 * @param {*} value 需要解析的值
		 * @param {*} config value所遵循的格式规则，按此规则进行解析；如果不传，则只能解析常规金额格式（如$100,000.00）
		 * @returns 解析返回默认 config 的 Currency 实例
		 * 注意：不可解析特殊的数字常量的字符串，如'Number.MAX_VALUE'、'Math.PI'等
		 */
		static parse(value, config) {
			return new Currency(parse(value, config).value)
		}

		/**
		 * 拓展实例方法
		 */
		static extend(name, fn) {
			Currency.prototype[name] = function(...params) {
				return fn.apply(this, params)
			}
		}
	}

	function getType(value) {
		return Object.prototype.toString.call(value).slice(8, -1)
	}

	function isLikeNumber(value) {
		if (!['String', 'Number'].includes(getType(value))) return false
		if (value === '') return false
		let value_ = Number(value)
		if (Number.isNaN(value_)) return false
		return true
	}

	/**
	 * 解析
	 * @param {Number, String} value 需要解析的值
	 * @param {Object} config String 类型 value 所遵循的格式规则，按传入的 config 的规则进行解析；如果不传，则只能解析常规金额格式（如$100,000.00）
	 * 注意：不可解析特殊的数字常量的字符串，如'Number.MAX_VALUE'、'Math.PI'等
	 */
	function parse(value, config) {
		const type = getType(value)
		const parseObj = {
			number: null,
			value: null,
			isNaN: null,
		}

		if (type === 'Number') {
			parseObj.number = value

			if (Object.is(value, -0)) {
				// -0单独处理，因为-0.toString() 为 '0'
				parseObj.value = '-0'
			} else {
				parseObj.value = value.toString()
			}
		} else if (type === 'String') {
			const obj = strValParse(value, config)
			parseObj.number = obj.number
			parseObj.value = obj.value
		} else {
			parseObj.number = NaN
			parseObj.value = 'NaN'
		}

		parseObj.isNaN = Number.isNaN(parseObj.number)

		return parseObj
	}

	/**
	 * 解析字符串值
	 * @param {String} value 需要解析的值
	 * @param {Object} config value 所遵循的格式规则，按传入的 config 的规则进行解析；如果不传，则只能解析常规金额格式（如$100,000.00）
	 * 注意：不可解析特殊的数字常量的字符串，如'Number.MAX_VALUE'、'Math.PI'等
	 */
	function strValParse(value, config = {}) {
		let value_,
			isInfinity = /Infinity/.test(value)

		// 排除 Infinity 相关
		if (isInfinity) {
			if (/-.*(?=Infinity)/.test(value)) {
				return {
					number: -Infinity,
					value: '-Infinity',
				}
			} else {
				return {
					number: Infinity,
					value: 'Infinity',
				}
			}
		}

		const ds = config.decimalSeparator || '.'
		const reg_1 = new RegExp(`[^\\d\\${ds}-]|\\${ds}(?=.*\\${ds})`, 'g')
		const reg_2 = new RegExp(`\\${ds}`, 'g')
		value_ = value.replace(reg_1, '').replace(reg_2, '.')

		let sign = /^-/.test(value_) ? '-' : ''
		value_ = value_.replace(/-/g, '')

		if (!isLikeNumber(value_)) {
			return {
				number: NaN,
				value: 'NaN',
			}
		}

		value_ = value_.replace(/^0+(?=.)|\.+$/g, '').replace(/^\.+/, '0.')
		value_ = sign + value_

		return {
			number: Number(value_),
			value: value_,
		}
	}
	return Currency
})
