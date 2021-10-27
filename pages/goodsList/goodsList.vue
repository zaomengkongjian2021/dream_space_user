<template>
	<view class="goods-list" v-loading.fullscreen.lock="loading">
		<unicloud-db
			ref="udb"
			v-slot:default="{data, loading, error, options}"
			collection="goods"
			@load="handleLoad"
			>
			<view v-if="error">{{error.message}}</view>
			<view class="loading-tips" v-else-if="loading">正在加载...</view>
			<view v-else>
				<el-col :span="24" class="goods-search">
					<el-input placeholder="请输入内容" v-model="searchValue" @change="goSearch" suffix-icon="el-icon-search"/>
				</el-col>
				<el-row class="list-box">
					<el-col :span="12" v-for="(item,index) in goodsDatas" :key="item._id">
						<el-card class="goodsList-card">
							<img :src="item.img[0]" alt="" @click="openDetail(item)"/>
							<p class="goods-describe">{{item.describe}}</p>
							<p class="goods-name">{{item.name}}</p>
							<p class="goods-monny">
								<a class="buy-monny">
									<span>购买价：</span>
									<span>￥{{parseInt(item.prich*0.95)}}</span>
								</a>
								<a>
									<span>体验：</span>
									<span>{{item.rent+"积分/次(7天)"}}</span>
								</a>
							</p>
						</el-card>
					</el-col>
				</el-row>
			</view>
		</unicloud-db>
		<p class="integral-shop" @click="shopDialogVisible = true">
			<img src="../../static/shop.jpg" alt="">
			<span>购买积分</span>
		</p>
		<el-dialog
		  title="购买造梦积分"
		  :visible.sync="shopDialogVisible"
		  width="90%">
		  <el-row class="integral-shop-detail">
				<el-col :span="24" class="tips"><i class="el-icon-warning"></i>联盟成员购买可获得<span>1.5倍造梦积分</span></el-col>
				<el-col :span="11">
					<p class="top" @click="openBuyDiaog(1, 10)"><span>10</span><span>积分</span></p>
					<p class="bottom"><span>￥</span><span>1</span></p>
				</el-col>
				<el-col :span="11">
					<p class="top" @click="openBuyDiaog(19, 200)"><span>200</span><span>积分</span></p>
					<p class="bottom"><span>￥</span><span>19</span></p>
				</el-col>
				<el-col :span="11">
					<p class="top" @click="openBuyDiaog(178, 2000)"><span>2000</span><span>积分</span></p>
					<p class="bottom"><span>￥</span><span>178</span></p>
				</el-col>
				<el-col :span="11">
					<p class="top" @click="openBuyDiaog(1598, 20000)"><span>20000</span><span>积分</span></p>
					<p class="bottom"><span>￥</span><span>1598</span></p>
				</el-col>
			</el-row>
		</el-dialog>
		<el-dialog
		  title="购买数量"
		  :visible.sync="integralCountDialog"
		  width="80%">
			<el-row>
				<el-col :span="24" style="font-size: 12px;margin-bottom: 10px;"><i class="el-icon-warning" style="color: #d01012;"></i>单张卡面额{{integralCount}}积分</el-col>
				<el-col :span="24" style="text-align: center;">
					<el-input-number v-model="integralBuyNum" :min="1" label="购买数量"></el-input-number>
				</el-col>
				<el-col :span="24" style="text-align: center;margin-top: 25px;">
					<el-button type="primary" @click="submitBuy">购买</el-button>
				</el-col>
			</el-row>
		</el-dialog>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default{
		props:{
			user: {
				default: ()=>{return {}}
			}
		},
		data() {
			return {
				loading: false,
				searchValue: "",
				goodsDatas: [],
				shopDialogVisible: false,
				integralCountDialog: false,
				integralUnit: 1,
				integralCount: 10,
				integralBuyNum: 1
			}
		},
		methods:{
			handleLoad(){
				this.goodsDatas = this.$refs.udb.dataList;
			},
			goSearch(){
				this.goodsDatas = [];
				this.goodsDatas.length = 0;
				this.$refs.udb.dataList.forEach(item => {
					if(item.name.indexOf(this.searchValue) > -1){
						this.goodsDatas.push(item);
					}
				})
			},
			openDetail(item){
				this.$router.push("/pages/goodsDetail/goodsDetail?id=" + item._id);
			},
			openBuyDiaog(p, c){
				this.integralUnit = p;
				this.integralCount = c;
				this.integralCountDialog = true;
			},
			submitBuy(){
				const integral = this.integralCount*this.integralBuyNum;
				const monny = this.integralUnit*this.integralBuyNum;
				this.$confirm("您将购买"+integral+"造梦积分，共花费￥"+monny+"，是否确定？", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.saveIntegral(integral);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消购买'
					});          
				});
			},
			saveIntegral(i){
				let item = {...this.user};
				//区分vip和非vip，vip积分是1.5倍
				if(item.user_type=="vip" && item.isvip){
					item.zaomeng_integral = item.zaomeng_integral+i*1.5;
				}else{
					item.zaomeng_integral = item.zaomeng_integral+i;
				}
				const params = {
					item: item,
					success: "购买成功",
					error: "购买失败",
					children: "goodsList",
					close: ["integralCountDialog"]
				}
				this.$emit("submitUser", params);
			}
		},
		created() {}
	}
</script>

<style>
</style>
