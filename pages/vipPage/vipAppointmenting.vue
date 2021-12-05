<template>
	<view class="vip-appointmenting" v-loading.fullscreen.lock="loading">
		<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
			<input class="show-address" type="text" placeholder="请选择地址" v-model="searchAddress" :disabled="true">
		</pickRegions>
		<el-collapse class="collapse" v-model="activeNames" @change="handleChange">
		  <el-collapse-item v-for="(item,index) in resource_codes" :title="item.name" :name="item._id">
		    <div v-for="(item2,index2) in item.resources" class="resource-item" @click="openDateDialog(item,item2)">
				<p class="title">
					<span class="title-text">{{item2.name}}</span>
				</p>
				<p class="cost">{{"消耗积分："+item2.cost_intergral+"（会员免费）"}}</p>
			</div>
		  </el-collapse-item>
		</el-collapse>
		<el-dialog
		  title="请选择日期"
		  :visible.sync="dateDialogVisible"
		  width="80%">
			<el-date-picker
			 v-model="dateValue"
			 type="date"
			 placeholder="选择日期">
			</el-date-picker>
			<div class="time">
				<p>请选择时间段：</p>
				<p v-for="(item, index) in activeResource.use_time">
					<el-radio v-model="timeRadio" :label="item.index" @change="changeRadio(item)">
						{{item.start+"~"+item.end}}<span>{{" (剩余:"+item.remain+")"}}</span>
					</el-radio>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dateDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="clickAppoint()">确 定</el-button>
			</span>
		</el-dialog>
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
				loading: false,
				defaultRegion: ["广东省","东莞市","万江区"],
				searchAddress: "",
				activeNames: [],
				resource_codes: [],
				activeCode: {},
				activeResource: {},
				activeTime: {},
				timeRadio: 1,
				dateDialogVisible: false,
				dateValue: ""
			}
		},
		methods:{
			//点击时间段
			changeRadio(item){
				this.activeTime = item;
			},
			//点击项目卡片打开选择日期的弹框
			openDateDialog(item, item2){
				this.activeCode = item;
				this.activeResource = item2;
				this.activeTime = item2.use_time[0];
				this.timeRadio = 1;
				this.dateDialogVisible = true;
			},
			//点击下单
			clickAppoint(){
				this.loading = true;
				this.dateDialogVisible = false;
				this.checkVip(this.appointSubmit);
			},
			//校验预约下单
			appointSubmit(){
				this.$confirm('您将预约<span style="color: #007AFF">'+this.activeCode.name+'的'+this.activeResource.name+'</span>, 是否确定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					dangerouslyUseHTMLString: true,
					type: 'warning'
				}).then(() => {
					//区分vip和非vip
					let isVip = false;
					this.user.vip_list.forEach(t => {
						if(t._id == this.activeResource._id){
							isVip = true;
						}
					})
					if(!isVip){
						this.$confirm('您尚未开通此项目会员，需要支付积分预约，是否继续?', '提示', {
							confirmButtonText: '开通会员',
							cancelButtonText: '继续预约',
							distinguishCancelAndClose: true,
							type: 'warning'
						}).then(() => {
							//跳转开通会员页面
							this.$emit("tabLeftMenu", {id: "kaitonghuiyuan"});
						}).catch(action => {
							if(action == "cancel"){
								//生成订单
								this.createOrder();
							}
						})
					}else{
						//生成订单
						this.createOrder();
					}
				}).catch(action => {})
			},
			//生成预约单
			createOrder(){
				let params = {
					phone: this.user.phone,
					user_id: this.user._id,
					resource_name: this.activeResource.name,
					resource_id: this.activeResource._id,
					type: this.activeResource.type,
					address: this.activeCode.address,
					code_id: this.activeCode._id,
					code_name: this.activeCode.name,
					istatus: "wait_use",
					tips: "如不使用请提前30分钟取消订单，提前时间小于30分钟则从押金中扣减3元；超过预约的开始时间小于30分钟不会自动取消订单，但需从押金中扣减6元；超过预约的开始时间大于30分钟会自动取消订单，且从押金中扣减9元，请知悉！",
					create_time: (new Date()).getTime(),
					start_time: "",
					end_time: ""
				}
				//计算开始时间、结束时间
				params.start_time = (new Date(this.dateValue+" "+this.activeTime.start)).getTime();
				params.end_time = (new Date(this.dateValue+" "+this.activeTime.end)).getTime();
				//校验是否存在未完成的订单，有则为true，无则为flase
				uniCloud.callFunction({
					name: "check_appointed",
					data: {
						phone: this.user.phone,
						istatus1: "wait_use",
						istatus2: "useing"
					}
				}).then(res => {
					console.log(res);
					this.loading = false;
					if(!res.result){
						this.loading = true;
						db.collection("appointment_orders").add(params).then(res => {
							this.loading = false;
							this.$message.success("预约成功");
							//跳转我已预约页面
							this.$emit("tabLeftMenu", {id: "woyiyuyue"});
						}).catch(err => {
							this.loading = false;
							this.$message.error("服务器错误，预约失败");
						})
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//查询线下点
			getOfflineCodes(){
				this.resource_codes = [];
				console.log(this.searchAddress)
				this.loading = true;
				db.collection("offline_codes").where({address: this.searchAddress}).get().then(res => {
					console.log(res)
					this.loading = false;
					if(res.result.data.length){
						this.resource_codes = res.result.data;
						
					}else{
						this.$message.warning("对不起，此地尚未布置资源点");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//展开、收缩折叠面板时
			handleChange(val){},
			//获取用户身份权限
			getUserPermission(backFun){
				db.collection('permission')
					.where({phone: this.user.phone})
					.get()
					.then((res)=>{
						this.loading = false;
						if(res.result.data.length){
							const permission = res.result.data[0];
							this.user.permission_id = permission._id;
							delete permission._id;
							Object.assign(this.user, permission);
							backFun();
						}
					}).catch((err) => {
						this.loading = false;
						this.$message.error("服务器错误");
					})
			},
			//校验vip权限
			checkVip(backFun){
				//校验vip权限
				uniCloud.callFunction({
					name: "check_vip",
					data: {
						phone: this.user.phone
					}
				}).then(res => {
					console.log(res);
					this.getUserPermission(backFun);
				}).catch(err => {
					console.log(err)
					this.loading = false;
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
							this.searchAddress += (item.name+",")
						}
					})
					this.getOfflineCodes();
				}
			},
			//选择地址后回调
			chooseAddress(back){
				this.searchAddress = "";
				back.forEach((item, index) => {
					if(index == 0){
						this.searchAddress += (item.name+",")
					}else if(index == 1){
						this.searchAddress += item.name;
					}
				})
				this.getOfflineCodes();
			},
			init(){
				this.dateValue = (new Date()).getFullYear()+"-"+((new Date()).getMonth()+1)+"-"+(new Date()).getDate();
				console.log(this.dateValue)
				this.checkVip(this.setDefaultAdrress);
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
