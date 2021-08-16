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
		console.clear()
		// Currency.setConfig({ decimalSeparator: '*' })
		console.log(Currency.parse(new Currency(-Infinity).format()))
		console.log(new Currency('-$Infinity'))
		console.log(new Currency('+Infinity'))
		console.log(new Currency('-0'))

		// console.clear()
		// console.log(new Decm('999,999,999'))
		console.log(new Currency('-.123456789123456789'))
		console.log(new Currency('123456789.12345.6789'))
		console.log(new Currency('123456789.'))
		console.log(new Currency('.123456789'))
		console.log(new Currency(NaN))
		console.log(Currency.config)
		console.log(Currency.setConfig({ prefix: '%' }).getInstance(123))
		console.log(Currency.getInstance(123))

		console.log('----------------------------')
		console.log(new currency('Infinity'))
		console.log(new currency(-Infinity).format())
		console.log(new currency('Infinity'))
		console.log(new currency(-0))
		console.log(new currency(+0))
	},
}
</script>
