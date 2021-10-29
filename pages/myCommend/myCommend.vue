<template>
	<view>
		<List :list="listArr"></List>
	</view>
</template>

<script>
	import List from '../../components/list.vue'
	export default {
		components: {
			List
		},
		data() {
			return {
				listArr: [
					{
						title: '标题1',
						note: '描述内容1',
						isLink: true,
						to: '/pages/nav/nav'
					},
					{
						title: '标题1',
						note: '描述内容1'
					},
					{
						title: '标题1',
						note: '描述内容1'
					},
					{
						title: '标题1',
						note: '描述内容1'
					},
				]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
