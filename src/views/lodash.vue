<template>
	<strong>lodash</strong>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep' // 24.1kb
// import clone from 'lodash/clone' // 24.1kb
// import eq from 'lodash/eq' // 24.11kb
// import isEqual from 'lodash/isEqual' // 23.09kb
// import _ from 'lodash'
import { add, sub, mul, div, toFixed, dayjs, Decimal, Currency } from '@/utils'

export default {
	name: 'lodash',
	components: {},
	created() {
		console.clear()
		console.log(dayjs())
		console.log(dayjs('2021-02-8').format('DD/MM/YYYY'))
	},
}
</script>
