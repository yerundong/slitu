<template>
	<strong>lodash</strong>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep' // 24.1kb
// import clone from 'lodash/clone' // 24.1kb
// import eq from 'lodash/eq' // 24.11kb
// import isEqual from 'lodash/isEqual' // 23.09kb
// import _ from 'lodash'
import { Decm, add, sub, mul, div, Currency } from '@/util'
import Decimal from 'decimal.js'
import currency from 'currency.js'

export default {
	name: 'lodash',
	components: {},
	created() {
		// console.log(new Currency('-$19**99.9&&**&-9*9-.-99-*9'))

		Currency.setConfig({ decimalSeparator: '*' })
		console.log(Currency.parse('$-19**99.9&&**&-9*9-.-99-*9'))

		// console.clear()
		// console.log(new Decm('999,999,999'))
		console.log(new Currency(123456789.123456789))
		console.log(new Currency('123456789.123456789'))
		console.log(new Currency('123456789.12345.6789'))
		console.log(new Currency('123456789.'))
		console.log(new Currency('.123456789'))
		console.log(new Currency(NaN))
		console.log(Currency.config)
		console.log(Currency.setConfig({ prefix: '%' }).getInstance(123))
		console.log(Currency.getInstance(123))

		console.log('----------------------------')
		console.log(new currency('-12345-678-9').format())
		console.log(new currency('.123456789'))
		console.log(new currency('123,456,789*123'))
		console.log(
			currency('123456789.123456789', {
				symbol: '￥',
				precision: 9,
			}).format()
		)
		console.log(
			currency('123456789.12345.6789', {
				symbol: '￥',
				precision: 10,
			})
		)

		function fn(a) {
			a.b = 2
		}
		const obj = { b: 1 }
		fn(obj)
		console.log(obj)
	},
}
</script>
