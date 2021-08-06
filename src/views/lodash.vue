<template>
	<strong>lodash</strong>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep' // 24.1kb
// import clone from 'lodash/clone' // 24.1kb
// import eq from 'lodash/eq' // 24.11kb
// import isEqual from 'lodash/isEqual' // 23.09kb
import _ from 'lodash'
import { doubleNumber } from '@/util'

// import extend from 'extend'
export default {
	name: 'lodash',
	components: {},
	created() {
		console.clear()
		console.log(doubleNumber(null))
		// console.log(_.defaults(true, { a: 1 }))
	},
}
</script>
