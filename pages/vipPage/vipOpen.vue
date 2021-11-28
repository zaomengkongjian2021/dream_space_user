<template>
	<view class="vip-open" v-loading.fullscreen.lock="loading">
		<el-row>
			<el-col class="title"><i class="el-icon-thumb"></i>开通会员</el-col>
			<el-col>
				<p class="type-tilte">室外项目：</p>
				<el-select v-model="outValue" multiple placeholder="请选择室外项目" @change="computeOut">
				    <el-option
				      v-for="item in outProjects"
				      :key="item._id"
				      :label="item.name"
				      :value="item._id">
					  <span style="float: left;">{{item.name}}</span>
					  <span style="float: right;color: #FF5A5F;">{{item.month_fee+"元/月"}}</span>
				    </el-option>
				</el-select>
				<p class="cost-text">室外项目共计：<a>{{outTotalCost}}</a>元/月</p>
			</el-col>
			<el-col>
				<p class="type-tilte">室内项目：</p>
				<el-select v-model="inValue" multiple placeholder="请选择室内项目" @change="computeIn">
				    <el-option
				      v-for="item in inProjects"
				      :key="item._id"
				      :label="item.name"
				      :value="item._id">
					  <span style="float: left;">{{item.name}}</span>
					  <span style="float: right;color: #FF5A5F;">{{item.month_fee+"元/月"}}</span>
				    </el-option>
				</el-select>
				<p class="cost-text">室内项目共计：<a>{{inTotalCost}}</a>元/月</p>
			</el-col>
			<el-col>
				<p class="type-tilte">*选择时长：</p>
				<el-radio-group v-model="monthLength" @change="computeRadio">
					<el-radio :label="1">1个月</el-radio>
					<el-radio :label="3">3个月(9.5折)</el-radio>
					<el-radio :label="6">6个月(9折)</el-radio>
					<el-radio :label="12">12个月(8.5折)</el-radio>
				</el-radio-group>
			</el-col>
			
			<el-col>
				<p class="type-tilte">共计：<a>{{totalCost}}</a>元/月</p>
			</el-col>
			<el-col class="address">
				<p class="type-tilte">*请选择常住地址：</p>
				<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
					<input type="text" placeholder="请选择地址" v-model="userAddress.name" :disabled="true">
				</pickRegions>
			</el-col>
			<el-col class="submit-btn">
				<el-button plain @click="submit">确定</el-button>
			</el-col>
		</el-row>
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
				outValue: [],
				outProjects: [],
				outTotalCost: 0,
				inValue: [],
				inProjects: [],
				inTotalCost: 0,
				userAddress: {
					back: [],
					name: ""
				},
				monthLength: 1,//默认开通时长为1个月
				totalCost: 0,
				defaultRegion: ["广东省","广州市","番禺区"]//默认地址
			}
		},
		methods:{
			//获取用户身份权限
			getUserPermission(){
				db.collection('permission')
					.where({phone: this.user.phone})
					.get()
					.then((res)=>{
						if(res.result.data.length > 0){
							const permission = res.result.data[0];
							this.user.permission_id = permission._id;
							delete permission._id;
							Object.assign(this.user, permission);
						}
					}).catch((err) => {
						this.$message.error("服务器错误");
					})
			},
			//计算室外项目费用
			computeOut(){
				this.outTotalCost = 0;
				this.outProjects.forEach(item => {
					if(this.outValue.includes(item._id)){
						this.outTotalCost += item.month_fee;
					}
				})
				this.computeTotal();
			},
			//计算室内项目费用
			computeIn(){
				this.inTotalCost = 0;
				this.inProjects.forEach(item => {
					if(this.inValue.includes(item._id)){
						this.inTotalCost += item.month_fee;
					}
				})
				this.computeTotal();
			},
			//选择开通时长时，计费费用
			computeRadio(){
				this.computeTotal();
			},
			//计算总费用
			computeTotal(){
				let aa = 1;
				if(this.monthLength == 3){
					aa = 0.95;
				}else if(this.monthLength == 6){
					aa = 0.9;
				}else if(this.monthLength == 12){
					aa = 0.85;
				}
				this.totalCost = ((this.outTotalCost+this.inTotalCost)*this.monthLength*aa).toFixed(2);
			},
			//获取室内室外项目
			getProjects(){
				this.outProjects = [];
				this.inProjects = [];
				db.collection("offline_resources").get().then(res => {
					if(res.result.data.length){
						const data = res.result.data;
						data.forEach(item => {
							if(item.type == "out"){
								this.outProjects.push(item);
							}else if(item.type == "in"){
								this.inProjects.push(item);
							}
						})
					}
				}).catch(err => {
					this.$message.error("服务器错误")
				})
			},
			//选择地址后回调
			chooseAddress(back){
				this.userAddress = {
					back: [],
					name: ""
				};
				back.forEach((item, index) => {
					if(index == back.length-1){
						this.userAddress.name += item.name;
					}else{
						this.userAddress.name += (item.name+"，")
					}
					this.userAddress.back.push({
						code: item.code,
						name: item.name
					})
				})
			},
			//点击确定按钮
			submit(){
				//校验
				if(this.outValue.length==0 && this.inValue.length==0){
					this.$message.warning("至少选择一个项目");
					return;
				}else if(!this.userAddress.name){
					this.$message.warning("请填写常住地址");
					return;
				}
				//校验通过
				let vip_list = [];
				this.outProjects.forEach(item => {
					if(this.outValue.includes(item._id)){
						vip_list.push(item);
					}
				})
				this.inProjects.forEach(item => {
					if(this.inValue.includes(item._id)){
						vip_list.push(item);
					}
				})
				//已开通了会员且未到期的项目，需要在原来的时间上延长
				if(this.user.vip_list.length){
					const hasVip = this.user.vip_list;
					for(let i=0; i<vip_list.length; i++){
						//vip开始时间为当前时间即可
						vip_list[i].start_time = (new Date()).getTime();
						vip_list[i].end_time = vip_list.start_time + this.monthLength*30*24*60*60*1000;
						for(let j=0; j<hasVip.length; j++){
							if(vip_list[i]._id == hasVip[j]._id){
								vip_list[i].end_time = hasVip[j].end_time + this.monthLength*30*24*60*60*1000;
							}
						}
					}
					//原来有的vip项目，这次没选，需要加入到提交数据内
					hasVip.forEach(item => {
						if(!this.outValue.includes(item._id) && !this.inValue.includes(item._id)){
							vip_list.push(item);
						}
					})
				}else{
					vip_list.forEach(item => {
						item.start_time = (new Date()).getTime();
						item.end_time = item.start_time + this.monthLength*30*24*60*60*1000;
					})
				}
				//生成参数
				let updateData = {
					phone: this.user.phone,
					_id: this.user.permission_id,
					vip_list: vip_list,
					user_type: "vip",
					new_user: "false",
					resident_address: this.userAddress.back
				}
				//新用户可免费开通3个项目的vip，1个月
				if(this.user.new_user=="true" && this.user.vip_list.length<=0){
					updateData.new_user = "false";
					this.$confirm('新用户可免费开通3个项目的会员，会员有效期1个月，请选择开通方式', '提示', {
						confirmButtonText: '免费开通',
						cancelButtonText: '支付开通',
						type: 'warning'
					}).then(() => {
						if(vip_list.length > 3){
							this.$alert('项目数量大于3个，开通失败', '提示', {
							  confirmButtonText: '确定',
							  type: 'warning',
							  callback: action => {}
							});
						}else if(this.monthLength != 1){
							this.$alert('选择时长大于1个月，开通失败', '提示', {
							  confirmButtonText: '确定',
							  type: 'warning',
							  callback: action => {}
							});
						}else{
							this.updatePermission(updateData, 0);
						}
					}).catch(() => {
						this.updatePermission(updateData, this.totalCost);
					});
				}else{
					this.updatePermission(updateData, this.totalCost);
				}
			},
			//更新vip数据
			updatePermission(params, cost){
				//确定支付
				this.loading = true;
				this.$confirm('您将支付'+cost+'元, 请确定?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(params)
					uniCloud.callFunction({
						name: "update_permission",
						data: params
					}).then(res => {
						this.loading = false;
						console.log(res);
						if(res.result.updated){
							this.$message.success("开通会员成功");
							//如果是新用户开通会员，应该给推荐人送押金、积分
							if(this.user.new_user=="true" && this.user.vip_list.length<=0 && this.user.referrer){
								this.updateReferrer();
							}
						}else{
							this.$message.error("开通会员失败");
						}
						this.init();
					}).catch(err => {
						this.loading = false;
						this.$message.error("开通会员失败");
					})
				}).catch(() => {});
			},
			//新用户开通会员时，给推荐人送押金和积分
			updateReferrer(){
				db.collection("permission").where({phone: this.user.referrer}).get().then(res => {
					if(res.result.data.length){
						uniCloud.callFunction({
							name: "update_permission",
							data: {
								phone: res.result.data[0].phone,
								_id: res.result.data[0]._id,
								integration: 30,
								total_deposit: 3,
								usable_deposit: 3
							}
						}).then(res => {
							console.log(res);
						}).catch(err => {})
					}else{
						this.$message.warning("推荐人不存在");
					}
				}).catch(err => {
					this.$message.warning("推荐人查询失败");
				})
			},
			//进入页面时，显示会员须知
			showVipKnow(){
				this.$alert('项目开通会员后，当月未使用过此项目的线下资源，则该项目的会员期限延长1个月，仅可延长1次。', '重要提示', {
					confirmButtonText: '确定',
					callback: action => {}
				});
			},
			init(){
				this.getUserPermission();
				this.getProjects();
			}
		},
		created() {
			this.showVipKnow();
			this.init();
		},
		activated() {
			this.showVipKnow();
			this.init();
		}
	}
</script>

<stylspan>
</stylspan>
