class Currency {
	constructor(value, config) {
		const type = getType(value)
		if (type === 'Number') {
			this.value = value
			this.exactValue = value.toString()
		} else if (type === 'String') {
			const obj = strValParse(value)
			this.value = obj.value
			this.exactValue = obj.exactValue
		} else {
			this.value = NaN
			this.exactValue = 'NaN'
		}

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
	 * 格式化
	 * @param {*} config
	 */
	format(config) {
		const config_ = Object.assign({}, this.config, config)
		// exactValue.split('.')
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
	 * @param {*} config value所遵循的格式规则，按此规则进行解析，如果是常规规则（$100,000.00）则不需要传
	 * @returns 解析返回默认 config 的 Currency 实例
	 */
	static parse(value, config) {
		const type = getType(value)
		const config_ = Object.assign({}, Currency.config, config)
		let ev
		if (type === 'Number') {
			ev = value
		} else if (type === 'String') {
			ev = strValParse(value, config_).exactValue
		} else {
			ev = NaN
		}
		return new Currency(ev)
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
	const ds = config.decimalSeparator || '.'
	// let value_ = value.replace(/[^\d\.-]|(?<=\d+.*)-|\.(?=.*\.)/g, '')
	const reg_1 = new RegExp(
		`[^\\d\\${ds}-]|(?<=\\d+.*)-|\\${ds}(?=.*\\${ds})`,
		'g'
	)
	const reg_2 = new RegExp(`\\${ds}`, 'g')
	let value_ = value.replace(reg_1, '').replace(reg_2, '.')

	if (!isLikeNumber(value_)) {
		return {
			value: NaN,
			exactValue: 'NaN',
		}
	}

	let sign = ''
	if (/^-/.test(value_)) {
		sign = '-'
		value_ = value_.replace(/^-/, '')
	}

	value_ = value_.replace(/^0+|\.+$/g, '').replace(/^\.+/, '0.')
	value_ = sign + value_

	return {
		value: Number(value_),
		exactValue: value_,
	}
}

export default Currency
