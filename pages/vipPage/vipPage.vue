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
			<el-main>
				<vipWealText v-if="leftMenuActive == 'huiyuanfuli'"></vipWealText>
				<vipOpen v-else-if="leftMenuActive == 'kaitonghuiyuan'"></vipOpen>
				<vipAppointmenting v-else-if="leftMenuActive == 'woyaoyuyue'"></vipAppointmenting>
				<vipAppointmented v-else-if="leftMenuActive == 'woyiyuyue'"></vipAppointmented>
			</el-main>
		</el-container>
	</view>
</template>

<script>
	import pickRegions from "@/components/pick-regions/pick-regions.vue";
	import vipWealText from "@/pages/vipPage/vipWealText.vue";
	import vipOpen from "@/pages/vipPage/vipOpen.vue";
	import vipAppointmented from "@/pages/vipPage/vipAppointmented.vue";
	import vipAppointmenting from "@/pages/vipPage/vipAppointmenting.vue";
	const db = uniCloud.database();
	export default{
		components:{
			vipWealText,
			vipOpen,
			vipAppointmented,
			vipAppointmenting,
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
