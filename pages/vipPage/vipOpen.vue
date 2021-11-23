<template>
	<view class="vip-open">
		<el-row>
			<el-col class="title"><i class="el-icon-thumb"></i>开通会员</el-col>
			<el-col>
				<span class="type-tilte">室外项目：</span>
				<el-select v-model="outValue" multiple placeholder="请选择室外项目">
				    <el-option
				      v-for="item in outProjects"
				      :key="item._id"
				      :label="item.name"
				      :value="item._id">
				    </el-option>
				</el-select>
				<span class="cost-text">室外项目共计：<a>{{outTotalCost}}</a>元/月</span>
			</el-col>
			<el-col>
				<span class="type-tilte">室内项目：</span>
				<el-select v-model="inValue" multiple placeholder="请选择室内项目">
				    <el-option
				      v-for="item in inProjects"
				      :key="item._id"
				      :label="item.name"
				      :value="item._id">
				    </el-option>
				</el-select>
				<span class="cost-text">室内项目共计：<a>{{inTotalCost}}</a>元/月</span>
			</el-col>
			<el-col>
				<span class="type-tilte">共计：<a>{{outTotalCost+inTotalCost}}</a>元/月</span>
			</el-col>
			<el-col class="address">
				<span class="type-tilte">请选择常住地址：</span>
				<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
					<input type="text" placeholder="请选择地址" v-model="userAddress" :disabled="true">
				</pickRegions>
			</el-col>
			<el-col class="submit-btn">
				<el-button plain>确定开通</el-button>
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
				outProjects: [
					{name: "足球",_id: "11"},
					{name: "篮球",_id: "22"},
					{name: "排球",_id: "33"},
					{name: "羽毛球",_id: "44"},
					{name: "乒乓球",_id: "55"},
					{name: "水球",_id: "66"}
				],
				outTotalCost: 0,
				inValue: [],
				inProjects: [
					{name: "乐高",_id: "11"},
					{name: "游乐园",_id: "22"},
					{name: "vr眼镜",_id: "33"},
					{name: "读书会",_id: "44"},
					{name: "科学实验",_id: "55"},
					{name: "手游馆",_id: "66"}
				],
				inTotalCost: 0,
				userAddress: "",
				defaultRegion: ["广东省","广州市","番禺区"]//默认地址
			}
		},
		methods:{
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
