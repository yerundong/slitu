class Currency {
	constructor(value, config) {
		const type = getType(value)
		if (type === 'Number') {
			this.value = value

			if (Object.is(value, -0)) {
				// -0单独处理，因为-0.toString() 为 '0'
				this.exactValue = '-0'
			} else {
				this.exactValue = value.toString()
			}
		} else if (type === 'String') {
			const obj = strValParse(value)
			this.value = obj.value
			this.exactValue = obj.exactValue
		} else {
			this.value = NaN
			this.exactValue = 'NaN'
		}
		
		this.isNaN = Number.isNaN(this.value)

		// 设置实例的 config
		// config 优先于 Currency.config
		this.config = Object.assign({}, Currency.config, config)
	}

	// 类的 config
	// 是每个实例的初始化 config
	// 通过 Currency.setConfig() 修改
	static config = {
		prefix: '￥', // 前缀
		decimalSeparator: '.', // 小数符号
		groupSeparator: ',', // 数位分隔符
		groupSize: 4, // 数位分隔组的个数，默认每3位分隔，即千位分隔法
		suffix: '', // 后缀
		precision: 2,
		completion: true
	}

	// 设置实例的 config
	setConfig(config) {
		Object.assign(this.config, config)
		return this
	}

	/**
	 * 格式化
	 * @param {*} config
	 */
	format(config) {
		const config_ = Object.assign({}, this.config, config)
		const { exactValue } = this
		const {
			prefix,
			decimalSeparator,
			groupSeparator,
			groupSize,
			suffix,
		} = config_

		let sign = '',
			ev = exactValue
		if (/^-/.test(exactValue)) {
			sign = '-'
			ev = exactValue.replace(/^-/, '')
		}

		if (/\d/g.test(ev)) {// 数字类型的数字
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
		} else {// 字母类型的数字，如 Infinity
			return `${sign}${prefix}${ev}${suffix}`
		}
	}
	
	// 设置类的 config
	static setConfig(config) {
		Object.assign(Currency.config, config)
		return Currency
	}

	// 获取实例
	static getInstance(value) {
		return new Currency(value)
	}

	/**
	 * 将任意格式的值解析成 Currency 实例
	 * @param {*} value 需要解析的值
	 * @param {*} config value所遵循的格式规则，按此规则进行解析；如果是常规规则（如$100,000.00）则不需要传
	 * @returns 解析返回默认 config 的 Currency 实例
	 * 注意：不可解析特殊的数字常量的字符串，如'Number.MAX_VALUE'、'Math.PI'等
	 */
	static parse(value, config) {
		const type = getType(value)
		const config_ = Object.assign({}, Currency.config, config)
		let v
		if (type === 'Number') {
			v = value
		} else if (type === 'String') {
			v = strValParse(value, config_).exactValue
		} else {
			v = NaN
		}
		return new Currency(v)
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

function strValParse(value, config = {}) {
	let value_,
		isInfinity = /Infinity/.test(value)

	// 排除 Infinity 相关
	if (isInfinity) {
		if (/-.*(?=Infinity)/.test(value)) {
			return {
				value: -Infinity,
				exactValue: '-Infinity',
			}
		} else {
			return {
				value: Infinity,
				exactValue: 'Infinity',
			}
		}
	}

	const ds = config.decimalSeparator || '.'
	const reg_1 = new RegExp(
		`[^\\d\\${ds}-]|\\${ds}(?=.*\\${ds})`,
		'g'
	)
	const reg_2 = new RegExp(`\\${ds}`, 'g')
	value_ = value.replace(reg_1, '').replace(reg_2, '.')
	
	let sign = ''
	if (/^-/.test(value_)) {
		sign = '-'
		value_ = value_.replace(/-/g, '')
	}

	if (!isLikeNumber(value_)) {
		return {
			value: NaN,
			exactValue: 'NaN',
		}
	}

	value_ = value_.replace(/^0+(?=.)|\.+$/g, '').replace(/^\.+/, '0.')
	value_ = sign + value_

	return {
		value: Number(value_),
		exactValue: value_,
	}
}

export default Currency
