<template>
	<view class="vip-appointmented" v-loading.fullscreen.lock="loading">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="待使用" name="wait_use">
				<div v-if="orderList.wait_use.length > 0">
					<el-card v-for="(item,index) in orderList.wait_use">
						<p>订单编号：{{item._id}}</p>
						<p>项目：{{item.resource_name}}</p>
						<p>地点：{{item.code_name}}</p>
						<p>
							<span>开始时间：{{item.start_time}}</span>
							<span>结束时间：{{item.end_time}}</span>
						</p>
						<p>下单时间：{{item.create_time}}</p>
						<p>温馨提醒：{{item.tips}}</p>
						<el-button>开始使用</el-button>
						<el-button>取消订单</el-button>
						<el-button>联系客服</el-button>
					</el-card>
				</div>
				<p v-else class="no-data">暂无预约单</p>
			</el-tab-pane>
		    <el-tab-pane label="使用中" name="useing">
				<div v-if="orderList.useing.length > 0">
					<el-card v-for="(item,index) in orderList.useing">
						<p>订单编号：{{item._id}}</p>
						<p>项目：{{item.resource_name}}</p>
						<p>地点：{{item.code_name}}</p>
						<p>
							<span>开始时间：{{item.start_time}}</span>
							<span>结束时间：{{item.end_time}}</span>
						</p>
						<p>下单时间：{{item.create_time}}</p>
						<p>温馨提醒：{{item.tips}}</p>
						<el-button>申请结束</el-button>
						<el-button>联系客服</el-button>
					</el-card>
				</div>
				<p v-else class="no-data">暂无预约单</p>
			</el-tab-pane>
		    <el-tab-pane label="已完成" name="completed">
				<div v-if="orderList.completed.length > 0">
					<el-card v-for="(item,index) in orderList.completed">
						<p>订单编号：{{item._id}}</p>
						<p>项目：{{item.resource_name}}</p>
						<p>地点：{{item.code_name}}</p>
						<p>
							<span>开始时间：{{item.start_time}}</span>
							<span>结束时间：{{item.end_time}}</span>
						</p>
						<p>下单时间：{{item.create_time}}</p>
						<p>温馨提醒：{{item.tips}}</p>
						<el-button>联系客服</el-button>
					</el-card>
				</div>
				<p v-else class="no-data">暂无预约单</p>
			</el-tab-pane>
		</el-tabs>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default{
		props:{
			user: {
				default: ()=>{return {}}
			},
			outIstatus: {
				default: "wait_use"
			}
		},
		data(){
			return{
				loading: false,
				activeName: "wait_use",
				orderList: {
					wait_use: [],
					useing: [],
					completed: []
				}
			}
		},
		methods:{
			//切换
			handleClick(e){
				this.activeName = e.name;
				this.getOrder(e.name);
			},
			//重新查询
			getOrder(){
				this.orderList[this.activeName] = [];
				this.loading = true;
				db.collection("appointment_orders").where({
					phone: this.user.phone,
					istatus: this.activeName
				}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						this.orderList[this.activeName] = res.result.data;
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			init(){
				this.activeName = this.outIstatus;
				this.getOrder();
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
