<template>
	<view class="order-detail" v-loading.fullscreen.lock="loading">
		<el-row>
			<el-col class="part-title"><i class="el-icon-location-outline"></i>收货信息</el-col>
			<el-col class="receive-msg">
				<img :src="orderData.img" alt="">
				<div>
					<p>
						<span>{{orderData.receive_message.name}}</span>
						<span>{{orderData.receive_message.phone}}</span>
					</p>
					<p>{{orderData.receive_message.address}}</p>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col class="part-title" :span="24" style="margin-top: 30px;">
				<i class="el-icon-edit-outline"></i>
				订单信息
				<span :class="[istatusObj.color]">{{" ("+istatusObj.name+")"}}</span>
			</el-col>
			<el-col class="order-msg">
				<p>
					<span>订单编号：</span>
					<span>{{orderData.order_number}}</span>
				</p>
				<p>
					<span>商品名称：</span>
					<span>{{orderData.goods_name}}</span>
				</p>
				<p>
					<span>商品描述：</span>
					<span>{{orderData.goods_describe}}</span>
				</p>
				<p>
					<span>下单时间：</span>
					<span>{{orderData.create_time}}</span>
				</p>
				<p>
					<span>到期时间：</span>
					<span>{{orderData.overdue_time}}</span>
				</p>
				<p>
					<span style="font-size: 14px;font-weight: 700;">实付积分：</span>
					<span style="font-size: 14px;font-weight: 700; color: #fb6600;">{{orderData.pay_integral}}</span>
				</p>
			</el-col>
		</el-row>
		<el-row class="bottom-but">
			<el-button plain icon="el-icon-phone">联系客服</el-button>
			<el-button v-if="istatus == 'wait_send'" plain @click="cancelOrder()" :class="[istatusObj.color]">取消订单</el-button>
			<el-button v-else-if="istatus == 'wait_receiving'" plain @click="changeOrder('wait_back')" :class="[istatusObj.color]">确认收货</el-button>
			<el-button v-else-if="istatus == 'wait_back'" plain @click="changeOrder('applying_back')" :class="[istatusObj.color]">申请归还</el-button>
			<!-- <el-button v-else-if="istatus == 'applying_back'" plain @click="changeOrder('has_back')" :class="[istatusObj.color]" disabled>等待取货</el-button> -->
		</el-row>
	</view>
</template>
<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				loading: false,
				orderId: "",
				orderData: {
					receive_message: {}
				},
				istatus: "",
				istatusObj: {}
			}
		},
		methods: {
			//取消订单
			cancelOrder(){
				this.loading = true;
				this.$confirm('取消的订单将永久删除，是否确定？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						db.collection("user_orders").doc(this.orderData._id).remove().then(res => {
							this.loading = false;
							if(res.result.deleted){
								this.$message.success("删除成功");
								window.history.go(-1);
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
			changeOrder(isType){
				this.loading = true;
				this.$confirm('订单状态变更后将不可逆，是否继续？', '温馨提示', {
						type: 'warning',
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					})
					.then(() => {
						let item = {...this.orderData}
						const id = item._id;
						delete item._id;
						item.istatus = isType;
						db.collection("user_orders").doc(id).update(item).then(res => {
							console.log(res);
							this.loading = false;
							if(res.result.updated){
								this.$message.success("success");
								window.history.go(-1);
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
			//获取订单详情
			getOrderDetail(){
				this.orderData = {receive_message: {}};
				this.loading = true;
				db.collection("user_orders").where({_id: this.orderId}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						res.result.data.forEach(item => {
							item.create_time = this.handleTime(item.create_time);
							item.overdue_time = this.handleTime(item.overdue_time);
						})
						this.orderData = res.result.data[0];
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			init(){
				this.orderId = this.$route.query.orderId;
				this.istatus = this.$route.query.istatus;
				this.istatusObj = JSON.parse(this.$route.query.istatusObj);
				this.getOrderDetail();
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
