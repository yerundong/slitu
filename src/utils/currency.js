import Currency from 'light-currency'
import lightCurrencyPluginMath from 'light-currency-plugin-math'

Currency.extend(lightCurrencyPluginMath)

Currency.setConfig({
	prefix: '￥',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 4,
	suffix: '',
})

export default Currency

