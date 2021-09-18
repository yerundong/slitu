;(function(global, factory) {
	typeof module === 'object' && typeof module.exports === 'object'
		? (module.exports = factory())
		: (global.Currency = factory())
})(window, function() {
	class Currency {
		/**
		 * constructor
		 * @param {Number, String} value
		 * @param {Object} config
		 */
		constructor(value, config) {
			const parseObj = parse(value)
			this.number = parseObj.number
			this.value = parseObj.value
			this.isNaN = parseObj.isNaN

			/**
			 * Set the config of the instance
			 * config here takes precedence over Currency.config
			 */
			this.config = Object.assign({}, Currency.config, config)
		}

		/**
		 * Static config
		 * It is the default config for each instance
		 * Modify through currency. Setconfig()
		 */
		static config = {
			prefix: '$',
			decimalSeparator: '.',
			groupSeparator: ',',
			groupSize: 3,
			suffix: '',
		}

		/**
		 * Set the config of the instance
		 * @param {Object} config
		 * @returns instance
		 */
		setConfig(config) {
			Object.assign(this.config, config)
			return this
		}

		/**
		 * Set the new value of the instance
		 * @param {Number, String} value
		 * @returns instance
		 */
		setValue(value) {
			const parseObj = parse(value)
			this.number = parseObj.number
			this.value = parseObj.value
			this.isNaN = parseObj.isNaN
			return this
		}

		/**
		 * Format numbers as currency strings
		 * @param {Object} config
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
				// Number of numeric type
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
				// Alphanumeric, such as infinity
				return `${sign}${prefix}${ev}${suffix}`
			}
		}

		/**
		 * Set static config
		 * @param {Object} config
		 * @returns Currency
		 */
		static setConfig(config) {
			Object.assign(Currency.config, config)
			return Currency
		}

		/**
		 * Get instance
		 * @param {Number, String} value
		 * @param {Object} config
		 * @returns
		 */
		static getInstance(value, config) {
			return new Currency(value, config)
		}

		/**
		 * Parses a value in a specific format into a number
		 * @param {Number, String} value
		 * @param {Object} config Parsing rules; If undefined, only the regular amount format (such as $100000.00) can be parsed
		 * @returns instance（with static config）
		 * P.S: the string of special numeric constants, such as' number. Max ', cannot be parsed_ Value ',' math. Pi ', etc
		 */
		static parse(value, config) {
			return new Currency(parse(value, config).value)
		}

		/**
		 * Extended instance method
		 * @param {String} name
		 * @param {Function} handler
		 */
		static extend(name, handler) {
			Currency.prototype[name] = function(...params) {
				return handler.apply(this, params)
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
	 * parse
	 * @param {Number, String} value
	 * @param {Object} config
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
				// -0 is handled separately because -0.tostring() is' 0 '
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
	 * Parse string
	 * @param {String} value
	 * @param {Object} config
	 */
	function strValParse(value, config = {}) {
		let value_,
			isInfinity = /Infinity/.test(value)

		// Exclude infinity
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
