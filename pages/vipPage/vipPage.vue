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
				<vipWealText v-if="leftMenuActive == 'huiyuanfuli'" :user="user"></vipWealText>
				<vipOpen v-else-if="leftMenuActive == 'kaitonghuiyuan'" :user="user"></vipOpen>
				<vipAppointmenting v-else-if="leftMenuActive == 'woyaoyuyue'" :user="user"></vipAppointmenting>
				<vipAppointmented v-else-if="leftMenuActive == 'woyiyuyue'" :user="user"></vipAppointmented>
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
				leftMenuActive: ""
			}
		},
		methods:{
			//切换左侧导航栏
			leftMenuTab(item){
				this.leftMenuActive = item.id;
			},
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
						this.judgeUser();
					}).catch((err) => {
						this.$message.error("服务器错误");
						this.judgeUser();
					})
			},
			judgeUser(){
				if(this.user.user_type == "visitor"){
					this.leftMenuActive = "huiyuanfuli";
				}else if(this.user.user_type=="vip"){
					this.leftMenuActive = "woyaoyuyue";
				}else{
					this.leftMenuActive = "kaitonghuiyuan";
				}
			},
			init(){
				this.getUserPermission();
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
