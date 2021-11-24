<template>
	<view class="vip-open">
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
				<p class="type-tilte">选择时长：</p>
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
				<p class="type-tilte">请选择常住地址：</p>
				<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
					<input type="text" placeholder="请选择地址" v-model="userAddress" :disabled="true">
				</pickRegions>
			</el-col>
			<el-col class="submit-btn">
				<el-button plain>确定</el-button>
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
				outValue: [],
				outProjects: [],
				outTotalCost: 0,
				inValue: [],
				inProjects: [],
				inTotalCost: 0,
				userAddress: "",
				monthLength: 1,//默认开通时长为1个月
				totalCost: 0,
				defaultRegion: ["广东省","广州市","番禺区"]//默认地址
			}
		},
		methods:{
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
				this.userAddress = "";
				back.forEach((item, index) => {
					if(index == back.length-1){
						this.userAddress += item.name;
					}else{
						this.userAddress += (item.name+"，")
					}
				})
			},
			init(){
				this.getProjects();
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
