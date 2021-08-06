import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'index',
		component: () =>
			import('../views/index.vue') /* webpackChunkName: "index" */,
	},
	{
		path: '/utils',
		name: 'utils',
		component: () =>
			import('../views/utils.vue') /* webpackChunkName: "utils" */,
	},
	{
		path: '/lodash',
		name: 'lodash',
		component: () =>
			import('../views/lodash.vue') /* webpackChunkName: "lodash" */,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
