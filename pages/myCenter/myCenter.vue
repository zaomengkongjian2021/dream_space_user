<template>
	<view class="my-center" v-loading.fullscreen.lock="loading">
		<el-row class="my-deposit">
			<el-col :span="24" class="center-title">我的押金</el-col>
			<el-col :span="12" class="deposit-content">
				<a>可用金额：</a>
				<span>{{"￥"+user.deposit}}</span>
			</el-col>
			<el-col :span="12" class="deposit-content">
				<a>冻结金额：</a>
				<span>{{"￥"+user.freeze_deposit}}</span>
			</el-col>
			<el-col :span="12" class="deposit-content">
				<a>可提现金额：</a>
				<span>{{"￥"+(user.deposit)}}</span>
			</el-col>
			<el-col :span="12" class="deposit-bottom">
				<el-button @click="withdraw()">提现</el-button>
			</el-col>
		</el-row>
		<el-row class="my-order">
			<el-col :span="24" class="center-title">我的订单</el-col>
			<el-col :span="24" class="order-label">
				<p @click="openOrderList('wait_send')">
					<el-badge :value="orderCount.wait_send" :max="99">
						<i class="el-icon-news"></i>
					</el-badge>
					<span>待发</span>
				</p>
				<p @click="openOrderList('wait_receiving')">
					<el-badge :value="orderCount.wait_receiving" :max="99">
						<i class="el-icon-document"></i>
					</el-badge>
					<span>待收</span>
				</p>
				<p @click="openOrderList('wait_back')">
					<el-badge :value="orderCount.wait_back+orderCount.applying_back" :max="99">
						<i class="el-icon-goods"></i>
					</el-badge>
					<span>待还</span>
				</p>
				<p @click="openOrderList('has_back')">
					<el-badge :value="orderCount.has_back" :max="99">
						<i class="el-icon-date"></i>
					</el-badge>
					<span>已还</span>
				</p>
			</el-col>
		</el-row>
		<el-row class="my-other">
			<el-col>
				<span>我的造梦积分</span><span style="font-size: 16px;color: #fb6600;">{{user.zaomeng_integral}}</span>
			</el-col>
			<el-col @click.native="drawer1.drawerkey = true">
				<span>我的体验券</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col @click.native="drawer2.drawerkey=true">
				<span>任务积分券</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col @click.native="drawer3.drawerkey=true">
				<span>推荐朋友</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col>
				<span>联系客服</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col @click.native="beforeLoginOut()">
				<span>退出登录</span><i class="el-icon-arrow-right"></i>
			</el-col>
		</el-row>
		<el-drawer
		  title="我的体验券"
		  :visible.sync="drawer1.drawerkey"
		  :direction="drawer1.directionkey"
		  size="100%">
		  <el-row class="drawer-item" :gutter="15" v-for="(item, index) in prizes.OTHER">
			<el-col :span="2">
				<i v-if="item.type=='DCFEPG' || item.type=='FECFPG'" class="el-icon-star-on"></i>
				<i v-else-if="item.type=='FECFGM'" class="el-icon-star-off"></i>
				<i v-else style="color: transparent;">11</i>
			</el-col>
			<el-col :span="16">
				<p>{{item.name}}</p>
				<p>{{"使用说明："+item.describe}}</p>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click="useExperience(item)">立即使用</el-button>
			</el-col>
		  </el-row>
		</el-drawer>
		<el-drawer
		  title="任务积分券"
		  :visible.sync="drawer2.drawerkey"
		  :direction="drawer2.directionkey"
		  size="100%">
		  <el-row class="drawer-item" :gutter="15" v-for="(item, index) in prizes.TIMC">
			<el-col :span="2">
				<i v-if="item.multiple*item.time_limit > 14" class="el-icon-star-on"></i>
				<i v-else-if="7<item.multiple*item.time_limit && item.multiple*item.time_limit<=14" class="el-icon-star-off"></i>
				<i v-else style="color: transparent;">11</i>
			</el-col>
			<el-col :span="16">
				<p>{{item.name}}</p>
				<p>{{"使用说明："+item.describe}}</p>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click="useTask(item)">立即使用</el-button>
			</el-col>
		  </el-row>
		</el-drawer>
		<el-drawer
		  title="推荐朋友"
		  :visible.sync="drawer3.drawerkey"
		  :direction="drawer3.directionkey"
		  size="100%">
		  <span>我来啦!</span>
		</el-drawer>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		props: {
			user: {
				default: ()=>{return {}}
			}
		},
		data() {
			return {
				loading: false,
				orderCount: {
					wait_send: 0,
					wait_receiving: 0,
					wait_back: 0,
					applying_back: 0,
					has_back: 0
				},
				drawer1: {
					drawerkey: false,
					directionkey: "rtl"
				},
				drawer2: {
					drawerkey: false,
					directionkey: "rtl"
				},
				drawer3: {
					drawerkey: false,
					directionkey: "rtl"
				},
				prizes: {
					TIMC: [],
					OTHER: [],
					FP: []
				}
			}
		},
		methods: {
			//提现
			withdraw(){
				let item = {...this.user};
				this.$confirm('提现金额为'+item.deposit+'元，是否确定？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						item.deposit = 0;
						const params = {
							item: item,
							success: "申请提交成功",
							error: "申请提交失败",
							children: "myCenter",
							backFun: ["init"]
						}
						this.$emit("submitUser", params);
					})
					.catch(action => {})
			},
			//获取订单数量
			getOrderData(){
				this.orderCount = {
					wait_send: 0,
					wait_receiving: 0,
					wait_back: 0,
					applying_back: 0,
					has_back: 0
				}
				this.loading = true;
				db.collection("user_orders").where({user_id: this.user._id}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						res.result.data.forEach(item => {
							this.orderCount[item.istatus] = this.orderCount[item.istatus]+1;
						})
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//去订单中心
			openOrderList(istatus){
				this.$router.push("/pages/myCenter/orderList?istatus="+istatus);
			},
			//获取我的体验券和任务券
			getPrize(){
				this.prizes = {
					TIMC: [],
					OTHER: [],
					FP: []
				}
				this.loading = true;
				db.collection("user_source").where({user_id: this.user._id}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						res.result.data.forEach(item => {
							if(item.type!="FP" && item.type!="TIMC"){
								this.prizes.OTHER.push(item);
							}else{
								this.prizes[item.type].push(item);
							}
						})
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//立即使用体验券
			useExperience(item){
				this.drawer1.drawerkey = false;
				let type="normal", discount=item.discount;
				if(item.type=="FECFPG" || item.type=="DCFEPG"){
					type = "valuable";
				}
				if(item.type=="FECFPG" || item.type=="FECFGM"){
					discount = 0;
				}
				const obj = {
					source_id: item._id,
					type: type,
					discount: discount
				}
				this.$router.push("/pages/goodsList/goodsList?experience="+JSON.stringify(obj));
			},
			//立即使用任务倍数券
			useTask(item){
				//先查询是否有正在使用的券，不可叠加使用
				//再将任务积分倍数存入user_list
				this.$confirm('您将使用'+item.multiple+'倍任务积分券，有效期'+item.time_limit+'天，是否确定？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						this.loading = true;
						db.collection("user_list").where({_id: this.user._id}).get().then(res => {
							if(res.result.data.length){
								const data = res.result.data[0];
								const nowTime = (new Date()).getTime();
								if(data.task_integral_multiple==1 && data.task_integral_time<=nowTime){
									//删除此任务积分倍数券
									db.collection("user_source").doc(item._id).remove().then(res => {
										this.loading = false;
										if(res.result.deleted){
											//刷新用户信息
											data.task_integral_multiple = item.multiple;
											data.task_integral_time = nowTime+item.time_limit*24*60*60*1000;
											const params = {
												item: data,
												success: "使用成功",
												error: "使用失败",
												children: "myCenter",
												backFun: ["init"]
											}
											this.$emit("submitUser", params);
											this.drawer2.drawerkey = false;
										}else{
											this.$message.error("使用失败");
										}
									}).catch(err => {
										this.loading = false;
										this.$message.error("服务器错误");
									})
								}
							}else{
								this.loading = false;
							}
						}).catch(err => {
							this.loading = false;
						})
						
					})
					.catch(action => {})
				
			},
			// 联系我们
			contactUs() {
				console.log('拉起微信？')
				// plus.runtime.openURL("weixin://");
			},
			// 登出前提示
			beforeLoginOut() {
				// 退出登录前做下提示
				this.$confirm('是否确认退出应用', '温馨提示', {
						distinguishCancelAndClose: true,
						confirmButtonText: '退出',
						cancelButtonText: '取消'
					})
					.then(() => {
						this.loginOut();
					})
					.catch(action => {})
			},
			// 退出登录
			loginOut() {
				this.removeSessionStorage("user");
				this.$nextTick(() => {
					window.location.reload();
				})
			},
			init(){
				this.getOrderData();
				this.getPrize();
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

<style>
</style>
