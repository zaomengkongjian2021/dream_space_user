<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item, index) in list" :key="index" :title="item.title" :note="item.note" @click="handleItem" :link="item.isLink" :to="item.to">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		name: "list",
		props: {
			list: {
				type: Array,
				required: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleItem (...rest) {
				console.log('@@@@@@@@@@', rest);
			}
		}
	}
</script>

<style>

</style>
