<template>
	<view class="vip-appointmenting">
		<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
			<input class="show-address" type="text" placeholder="请选择地址" v-model="searchAddress" :disabled="true">
		</pickRegions>
		<el-collapse class="collapse" v-model="activeNames" @change="handleChange">
		  <el-collapse-item v-for="(item,index) in resource_codes" :title="item.name" :name="item._id">
		    <div v-for="(item2,index2) in item.resources" class="resource-item" @click="appointSubmit(item,item2)">
				<p class="title">
					<span class="title-text">{{item2.name}}</span>
					<span class="remain">剩余数量：<a>{{item2.remain}}</a></span>
				</p>
				<p class="time">{{"单次使用时间："+item2.use_time+"小时"}}</p>
				<p class="cost">{{"消耗积分："+item2.cost_intergral+"（会员免费）"}}</p>
			</div>
		  </el-collapse-item>
		</el-collapse>
	</view>
</template>

<script>
	import pickRegions from "@/components/pick-regions/pick-regions.vue";
	const db = uniCloud.database();
	export default{
		components: {
			pickRegions
		},
		props:{
			user: {
				default: ()=>{return {}}
			}
		},
		data(){
			return{
				defaultRegion: ["广东省","东莞市","万江区"],
				searchAddress: "",
				activeNames: [],
				resource_codes: []
			}
		},
		methods:{
			//预约下单
			appointSubmit(item, item2){
				
			},
			//查询线下点
			getOfflineCodes(){
				this.resource_codes = [];
				db.collection("offline_codes").where({address: this.searchAddress}).get().then(res => {
					if(res.result.data.length){
						this.resource_codes = res.result.data;
					}else{
						this.$message.warning("对不起，此地尚未布置资源点");
					}
				}).catch(err => {
					this.$message.error("服务器错误");
				})
			},
			//展开、收缩折叠面板时
			handleChange(val){},
			//获取用户身份权限
			getUserPermission(){
				db.collection('permission')
					.where({phone: this.user.phone})
					.get()
					.then((res)=>{
						if(res.result.data.length){
							const permission = res.result.data[0];
							this.user.permission_id = permission._id;
							delete permission._id;
							Object.assign(this.user, permission);
							this.setDefaultAdrress();
						}
					}).catch((err) => {
						this.$message.error("服务器错误");
					})
			},
			//校验vip权限
			checkVip(userData){
				//校验vip权限
				uniCloud.callFunction({
					name: "check_vip",
					data: {
						phone: this.user.phone
					}
				}).then(res => {
					console.log(res);
					this.getUserPermission();
				}).catch(err => {
					console.log(err)
					this.$message.warning("权限校验失败，请重试");
				})
			},
			//如果是会员，则搜索默认地址的资源点
			setDefaultAdrress(){
				if(this.user.user_type == "vip"){
					this.defaultRegion = [];
					this.user.resident_address.forEach((item, index) => {
						this.defaultRegion.push(item.name);
						if(index == this.user.resident_address.length-1){
							this.searchAddress += item.name;
						}else{
							this.searchAddress += (item.name+"，")
						}
					})
					this.getOfflineCodes();
				}
			},
			//选择地址后回调
			chooseAddress(back){
				console.log(back)
				this.searchAddress = "";
				back.forEach((item, index) => {
					if(index == back.length-1){
						this.searchAddress += item.name;
					}else{
						this.searchAddress += (item.name+",")
					}
				})
				this.getOfflineCodes();
			},
			init(){
				this.checkVip();
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

<stylspan>
</stylspan>
