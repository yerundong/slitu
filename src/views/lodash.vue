<template>
	<div>
		<strong>lodash</strong>
		<div>
			{{ a }}
		</div>
	</div>
</template>

<script>
import { add, sub, mul, div, toFixed, dayjs, Decimal, Currency } from '@/utils'

export default {
	name: 'lodash',
	components: {},
	data() {
		return {
			a: '',
		}
	},
	created() {
		// console.clear()
		// console.log(dayjs())
		// console.log(dayjs('2021-02-8').format('DD/MM/YYYY'))
		console.log(Currency.parse('-$-2021-kkk-'))
		console.log(new Currency('-$-2021-kkk-.123456').number)
	},
}
</script>
