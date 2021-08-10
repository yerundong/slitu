<template>
	<strong>lodash</strong>
</template>

<script>
// import cloneDeep from 'lodash/cloneDeep' // 24.1kb
// import clone from 'lodash/clone' // 24.1kb
// import eq from 'lodash/eq' // 24.11kb
// import isEqual from 'lodash/isEqual' // 23.09kb
import _ from 'lodash'
import {
	displace,
	displaceNil,
	add,
	chain,
	removeInvalidProp,
	removeInvalidPropDeep,
} from '@/util'
console.log(add)

export default {
	name: 'lodash',
	components: {},
	created() {
		console.clear()
		const obj = { a: 1, b: null, c: undefined, d: NaN, e: '', f: { g: '' } }
		Object.setPrototypeOf(obj, { ddd: null })
		console.log(removeInvalidPropDeep(obj))
		console.log(obj)
	},
}
</script>
