module.exports = {
	root: true,
	parserOptions: {
		sourceType: 'module',
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2017,
		sourceType: 'module',
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'vue/no-v-html': 'off',
		'vue/require-default-prop': 'off',
		'space-before-function-paren': 'off',
	},
}
