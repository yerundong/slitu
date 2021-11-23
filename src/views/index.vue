<template>
	<div>
		<strong>utils测试</strong>
	</div>
</template>

<script>
import * as utils from '@/utils'
import {
	objectToFormData,
	isArr,
	isObj,
	isNul,
	isUndef,
	isNaN,
	isLikeNum,
} from '@/utils'

export default {
	name: 'index',
	components: {},
	mounted() {
		console.log(utils)
		const value = 1
		console.log(isLikeNum(value))
	},
}
</script>
