<template>
	<view class="vip-appointmenting">
		
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
		data(){
			return{
				
			}
		},
		methods:{
			init(){}
		},
		created() {
			this.init();
		},
		activated() {
			this.init();
		}
	}
</script>

<stylspan>
</stylspan>
