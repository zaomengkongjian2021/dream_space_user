<template>
	<view class="nav">
		<div class="nav-main">
			<goodsList ref="goodsList" v-if="activeNav=='goodsList'" @updateUser="updateUser" @submitUser="submitUser" :user="user"></goodsList>
			<task ref="task" v-else-if="activeNav=='task'" @updateUser="updateUser" @submitUser="submitUser" :user="user"></task>
			<vipPage ref="vipPage" v-else-if="activeNav=='vipPage'" @updateUser="updateUser" @submitUser="submitUser" :user="user"></vipPage>
			<myCenter ref="myCenter" v-else-if="activeNav=='myCenter'" @updateUser="updateUser" @submitUser="submitUser" :user="user"></myCenter>
		</div>
		<div class="nav-footer">
			<p
			 v-for="(item, index) in navList"
			 :class="activeNav==item.id ? 'active-nav' : ''"
			 @click="tabModel(item)">
				<i :class="item.icon"></i>
				<span>{{item.name}}</span>
			</p>
		</div>
	</view>
</template>

<script>
	const db = uniCloud.database();
	import goodsList from "../goodsList/goodsList";
	import vipPage from "../vipPage/vipPage";
	import myCenter from "../myCenter/myCenter";
	import task from "../task/task";
	export default{
		components: {
			goodsList,
			task,
			vipPage,
			myCenter
		},
		data(){
			return {
				navList: [
					{name: "商品",icon: "el-icon-goods",id: "goodsList"},
					{name: "任务",icon: "el-icon-tickets",id: "task"},
					{name: "会员",icon: "el-icon-setting",id: "vipPage"},
					{name: "我的",icon: "el-icon-menu",id: "myCenter"}
				],
				activeNav: "goodsList",
				user: ""
			}
		},
		methods:{
			tabModel(item){
				this.activeNav = item.id;
			},
			//更新用户信息到数据库
			submitUser(params){
				delete params.item._id;
				let item = {...this.user};
				delete item._id;
				Object.assign(item, params.item);
				if(this.$refs[params.children]){
					this.$refs[params.children].loading = true;
				}else{
					return
				}
				db.collection("user_list").doc(this.user._id).update(item).then(res=>{
					this.$refs[params.children].loading = false;
					if(res.result.updated){
						if(params.success){
							this.$message.success(params.success);
						}
						//关闭弹框
						if(params.close){
							params.close.forEach(ct => {
								this.$refs[params.children][ct] = false;
							})
						}
						this.updateUser(params);
					}else{
						if(params.error){
							this.$message.error(params.error);
						}
					}
				}).catch(err=>{
					this.$refs[params.children].loading = false;
					this.$message.error(params.error);
				})
			},
			//刷新前端用户信息
			updateUser(params){
				this.$refs[params.children].loading = true;
				db.collection('user_list')
					.where({_id: this.user._id})
					.get()
					.then(res=>{
						this.$refs[params.children].loading = false;
						const data = res.result.data;
						if(data.length > 0){
							this.setSessionStorage("user", JSON.stringify(data[0]));
							this.user = data[0];
							//回调
							this.$nextTick(()=>{
								if(params.backFun){
									params.backFun.forEach(ct => {
										this.$refs[params.children][ct]();
									})
								}
							})
						}else{
							this.$message.error("刷新失败，请重新登录");
						}
					}).catch(err=>{
						this.$refs[params.children].loading = false;
						this.$message.error("刷新失败，请重新登录");
					})
			}
		},
		created() {
			this.user = JSON.parse(this.getSessionStorage("user"));
			window.addEventListener("userChange", () => {
				this.user = JSON.parse(this.getSessionStorage("user"));
			})
		}
	}
</script>

<style>
</style>
