<template>
	<div>123</div>
</template>

<script>
import {
	getType,
	isLegalNumber,
	replaceValue,
	deepClone,
	doubleNumber,
} from '@/utils'

export default {
	name: 'App',
	components: {},
	created() {
		console.log(getType(Infinity))
		console.log(isLegalNumber(true))
		console.log(replaceValue(null, 6))
		console.log(deepClone(null))
		console.log(doubleNumber(11))
	},
}
</script>

<style></style>
