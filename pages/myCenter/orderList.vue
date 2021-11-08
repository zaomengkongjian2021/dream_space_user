<template>
	<view class="order-list" v-loading.fullscreen.lock="loading">
		<p class="no-data" v-if="orderData.length == 0">
			<i class="el-icon-tickets"></i>
			<span>暂无数据</span>
		</p>
		<el-card v-else class="box-card" v-for="item in orderData">
		  <p class="order-title">
			  <a>订单编号：</a>
			  <span>{{item.order_number}}</span>
		  </p>
		  <el-row class="order-content">
			  <el-col :span="5" class="left" @click.native="openDetail(item)">
				  <img :src="item.img" alt="">
			  </el-col>
			  <el-col :span="14" class="middle" @click.native="openDetail(item)">
				  <p class="name">{{item.goods_name}}</p>
				  <p class="describe">{{item.goods_describe}}</p>
				  <p class="time">
					  <span>{{"下单时间："+item.create_time}}</span>
					  <span>{{"到期时间："+item.overdue_time}}</span>
				  </p>
			  </el-col>
			  <el-col :span="5" class="right">
				  <p :class="['istatus', istatusName[item.istatus].color]">{{istatusName[item.istatus].name}}</p>
				  <el-button v-if="istatus == 'wait_send'" plain @click="cancelOrder(item)" :class="[istatusName[item.istatus].color]">取消订单</el-button>
				  <el-button v-else-if="item.istatus == 'wait_receiving'" plain @click="changeOrder(item,'wait_back')" :class="[istatusName[item.istatus].color]">确认收货</el-button>
				  <el-button v-else-if="item.istatus == 'wait_back'" plain @click="changeOrder(item,'applying_back')" :class="[istatusName[item.istatus].color]">申请归还</el-button>
				  <!-- <el-button v-else-if="item.istatus == 'applying_back'" plain @click="changeOrder(item,'has_back')" :class="[istatusName[item.istatus].color]" disabled>等待取货</el-button> -->
				  <el-button v-else-if="item.istatus == 'has_back'" plain @click="openDetail(item)" :class="[istatusName[item.istatus].color]">查看订单</el-button>
			  </el-col>
		  </el-row>
		</el-card>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				loading: false,
				user: {},
				orderData: [],
				istatus: "",
				istatusName: {
					wait_send: {
						name: "待发货",
						color: "wait-send"
					},
					wait_receiving: {
						name: "待收货",
						color: "wait-receiving"
					},
					wait_back: {
						name: "待归还",
						color: "wait-back"
					},
					applying_back: {
						name: "待取货",
						color: "applying-back"
					},
					has_back: {
						name: "已归还",
						color: "has-back"
					}
				}
			}
		},
		methods: {
			//获取订单
			getOrderData(){
				this.orderData = [];
				this.loading = true;
				let istatus = [this.istatus];
				if(istatus[0] == "wait_back"){
					istatus =["wait_back", "applying_back"]
				}
				const dbCmd = db.command;
				db.collection("user_orders").where({user_id: this.user._id,istatus: dbCmd.in(istatus)}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						res.result.data.forEach(item => {
							item.create_time = this.handleTime(item.create_time);
							item.overdue_time = this.handleTime(item.overdue_time);
						})
						this.orderData = res.result.data;
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//打开详情
			openDetail(item){
				this.$router.push("/pages/myCenter/orderDetail?orderId="+item._id+"&istatusObj="+JSON.stringify(this.istatusName[item.istatus])+"&istatus="+item.istatus);
			},
			//取消订单
			cancelOrder(item){
				this.loading = true;
				this.$confirm('取消的订单将永久删除，是否确定？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						db.collection("user_orders").doc(item._id).remove().then(res => {
							this.loading = false;
							if(res.result.deleted){
								this.$message.success("删除成功");
								this.getOrderData();
							}else{
								this.$message.error("删除失败");
							}
						}).catch(action => {
							this.loading = false;
							this.$message.error("删除失败");
						})
					}).catch(() => {
						this.loading = false;
					});
			},
			//确认收货
			changeOrder(item,isType){
				this.loading = true;
				this.$confirm('订单状态变更后将不可逆，是否继续？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						const id = item._id;
						delete item._id;
						item.istatus = isType;
						db.collection("user_orders").doc(id).update(item).then(res => {
							console.log(res);
							this.loading = false;
							if(res.result.updated){
								this.$message.success("success");
								this.getOrderData();
							}else{
								this.$message.error("error");
							}
						}).catch(action => {
							this.loading = false;
							this.$message.error("error");
						})
					}).catch(() => {
						this.loading = false;
					});
			},
			//时间转换
			handleTime(t){
				let tt = new Date(t),
					y = tt.getFullYear(),
					m = tt.getMonth()+1,
					d = tt.getDate();
				if(m < 10){
					m = "0" + m;
				}
				if(d < 10){
					d = "0" + d;
				}
				return y+"-"+m+"-"+d;
			},
			init(){
				this.istatus = this.$route.query.istatus;
				this.user = JSON.parse(this.getSessionStorage("user"));
				window.addEventListener("userChange", () => {
					this.user = JSON.parse(this.getSessionStorage("user"));
				})
				this.getOrderData();
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
