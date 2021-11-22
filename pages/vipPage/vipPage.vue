<template>
	<view class="vip-page" v-loading.fullscreen.lock="loading">
		<el-container>
			<el-aside width="100px">
				<p
				 v-for="(item,index) in leftMenu"
				 :class="leftMenuActive == item.id ? 'active' : ''"
				 @click="leftMenuTab(item)">
					<i :class="item.icon"></i>
					<span>{{item.name}}</span>
				</p>
			</el-aside>
			<el-main>Main</el-main>
		</el-container>
		
		<!-- <el-row>
			<el-col>
				<p class="visitor-title">会员福利</p>
			</el-col>
			<el-col style="height: auto;margin-top: 0;">
				<div class="vip-text">
					<p>1、会员可<span>免费使用</span>线下资源，<span>免费参加</span>线下活动。</p>
					<p>2、会员可在<span>线下使用造梦积分</span>进行部分<span>消费</span>。</p>
					<p>3、会员购买造梦积分、任务获得造梦积分，<span>均为双倍</span>。</p>
					<p>4、会员可<span>参与抽奖</span>，抽奖可获得任务积分（2~3倍）券、线上资源体验费（5~9折）券。</p>
					<p>5、<span>推荐朋友</span>成功成为会员，推荐人是会员时<span>可获得</span>一定的<span>造梦积分奖励</span>。</p>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<p class="visitor-title open-vip-title">开通会员</p>
			</el-col>
			<el-col style="height: auto;margin-top: 0;">
				<div class="open-vip">
					<p>
						<span class="type-tilte">室外项目：</span>
						<el-select v-model="outValue" multiple placeholder="请选择室外项目">
						    <el-option
						      v-for="item in outProjects"
						      :key="item._id"
						      :label="item.name"
						      :value="item._id">
						    </el-option>
						</el-select class="cost-text">
						<span class="cost-text">室外项目共计：<a>{{outTotalCost}}</a>元/月</span>
					</p>
					<p>
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
					</p>
					<p>
						<span class="type-tilte">共计：{{outTotalCost+inTotalCost}}元/月</span>
					</p>
					<p>
						<span class="type-tilte">请选择常住地址：</span>
						<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
							<input type="text" placeholder="请选择地址" v-model="userAddress">
						</pickRegions>
					</p>
				</div>
			</el-col>
		</el-row> -->
	</view>
</template>

<script>
	import pickRegions from "@/components/pick-regions/pick-regions.vue"
	const db = uniCloud.database();
	export default{
		components:{
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
				//左侧导航栏
				leftMenu: [
					{name: "会员福利",id: "huiyuanfuli",icon: "el-icon-connection"},
					{name: "开通会员",id: "kaitonghuiyuan",icon: "el-icon-thumb"},
					{name: "我要预约",id: "woyaoyuyue",icon: "el-icon-chat-line-round"},
					{name: "我已预约",id: "woyiyuyue",icon: "el-icon-tickets"},
				],
				leftMenuActive: "",
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
				defaultRegion: ["广东省","广州市","番禺区"],//默认地址
			}
		},
		methods:{
			//切换左侧导航栏
			leftMenuTab(item){
				this.leftMenuActive = item.id;
			},
			chooseAddress(back){
				this.userAddress = "";
				back.forEach(item => {
					this.userAddress += (item.name+"，")
				})
			},
			init(){
				if(this.user.user_type == "visitor"){
					this.leftMenuActive = "huiyuanfuli";
				}else if(this.user.user_type=="vip" && !this.user.no_overdue){
					this.leftMenuActive = "kaitonghuiyuan";
				}else{
					this.leftMenuActive = "woyaoyuyue";
				}
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
