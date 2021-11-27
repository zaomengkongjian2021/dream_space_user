<template>
	<view class="goods-list" v-loading.fullscreen.lock="loading">
		商城
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default{
		props:{
			user: {
				default: ()=>{return {}}
			}
		},
		data() {
			return {
				loading: false
			}
		},
		methods:{
			getGoods(val){
				
			},
			goSearch(){
				
			},
			openDetail(item){
				
			},
			openBuyDiaog(p, c){
				
			},
			submitBuy(){
				
			},
			saveIntegral(i){
				
			},
			init(){
				this.getGoods();
			}
		},
		created() {
			this.init();
		},
		activated() {
			this.init();
		}
	}
</script>

<style>
</style>
