<template>
	<view class="goods-detail" v-loading.fullscreen.lock="loading">
		<view class="detail-content">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item v-for="(item, index) in goodsData.img">
								<view>
									<img :src="item" alt=""/>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<p class="detail-title">{{goodsData.name}}</p>
			<p class="detail-describe">{{goodsData.describe}}</p>
			<el-row class="detail-message">
				<el-col :span="24">
					<span>专柜价格：</span>
					<span style="color: #d01012;">{{"￥"+(goodsData.prich || "")}}</span>
				</el-col>
				<el-col :span="24">
					<span>租赁：</span>
					<span style="color: #80e010;">{{(goodsData.rent || "")+"积分/次"}}</span>
				</el-col>
				<el-col :span="24" style="margin-bottom: 10px;">
					<span>押金：</span>
					<span style="color: #ffc107;">{{"￥"+(goodsData.deposit || "")}}</span>
				</el-col>
				<el-col :span="24" style="margin-bottom: 10px;">
					<span>商品详情：</span>
					<span style="color: #666666;font-size: 12px;">{{goodsData.detail}}</span>
				</el-col>
			</el-row>
		</view>
		<el-row class="bottom-btn">
			<el-col :span="24">
				<el-button style="background: #fb6600;color: #FFFFFF;" @click="experienceOrder">立即体验</el-button>
			</el-col>
		</el-row>
		<el-dialog
		  title="购买造梦积分"
		  :visible.sync="shopDialogVisible"
		  width="90%">
		  <el-row class="integral-shop-detail">
				<el-col :span="24" class="tips"><i class="el-icon-warning"></i>联盟成员购买可获得<span>2倍造梦积分</span></el-col>
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
		<el-dialog
		  title="请选择收货地址"
		  :visible.sync="addressDialogVisible"
		  width="80%"
		  class="address-list">
			<el-row
			 v-for="(item,index) in userAddress.addresses"
			 :class="['address-item', addressActive==item._id?'address-active':'']"
			 :gutter="15"
			 @click.native="addressActive=item._id; choiceAddress=item">
				<el-col :span="2"><a class="address-label-icon"></a></el-col>
				<el-col :span="18">{{item.name+" "+item.phone+" "+item.address}}</el-col>
				<el-col :span="4" v-if="addressActive==item._id" style="color: #007AFF;"><i class="el-icon-check"></i></el-col>
			</el-row>
			<el-button @click="createAddress()" class="add-adress">新增地址</el-button>
			<el-row class="address-bottom-btn" :gutter="15">
				<el-col :span="12"><el-button type="info" plain @click="addressDialogVisible = false">取消</el-button></el-col>
				<el-col :span="12"><el-button type="primary" plain @click="submitExperienceOrder()">确定</el-button></el-col>
			</el-row>
		</el-dialog>
		<el-dialog
		  title="新增地址"
		  :visible.sync="addAddressDialogVisible"
		  width="90%"
		  class="add-address">
		  <el-form :model="addAddressForm" :rules="rules" ref="addAddressForm" label-width="100px" class="add-address-form">
		    <el-form-item label="收货人:" prop="name">
				<el-input v-model="addAddressForm.name" placeholder="请输入收货人姓名"></el-input>
		    </el-form-item>
			<el-form-item label="手机号码:" prop="phone">
				<el-input v-model="addAddressForm.phone" placeholder="请输入手机号码"></el-input>
			</el-form-item>
			<el-form-item label="收获地址:" prop="address" class="user-address">
				<pickRegions :defaultRegion="defaultRegion" @getRegion="chooseAddress">
					<input type="text" placeholder="请选择地址" v-model="addAddressForm.address" :disabled="true">
				</pickRegions>
			</el-form-item>
			<el-form-item label="街道/社区:" prop="speAddress" placeholder="请输入街道、社区、楼栋号">
				<el-input v-model="addAddressForm.speAddress"></el-input>
			</el-form-item>
		  </el-form>
			<el-button plain @click="addAddressDialogVisible = false">取消</el-button>
			<el-button plain @click="newAddress('addAddressForm')">确定</el-button>
		</el-dialog>
	</view>
</template>

<script>
	import pickRegions from "@/components/pick-regions/pick-regions.vue"
	const db = uniCloud.database();
	export default{
		components:{
			pickRegions
		},
		data(){
			return {
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				goodsId: "",
				loading: false,
				goodsData: {
					img: []
				},
				user: {},
				shopDialogVisible: false,
				integralCountDialog: false,
				integralUnit: 1,
				integralCount: 10,
				integralBuyNum: 1,
				userAddress: {
					addresses: []
				},
				addressDialogVisible: false,
				addressActive: "",
				newAddressData: {},
				addAddressDialogVisible: false,
				addAddressForm: {
					name: "",
					phone: "",
					address: "",
					speAddress: ""
				},
				rules: {
					name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
					phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
					address: [{ required: true, message: '请选择地址', trigger: 'blur' }],
					speAddress: [{ required: true, message: '请输入街道、社区、楼栋号', trigger: 'blur' }]
				},
				defaultRegion: ["广东省","广州市","番禺区"],//默认地址
				choiceAddress: {}
			}
		},
		methods:{
			//获取用户身份权限
			getUserPermission(){
				db.collection('permission')
					.where({phone: this.user.phone})
					.get()
					.then((res)=>{
						this.loading = false;
						if(res.result.data.length > 0){
							const permission = res.result.data[0];
							this.user.permission_id = permission._id;
							delete permission._id;
							Object.assign(this.user, permission);
						}
					}).catch((err) => {
						this.loading = false;
						this.$message.error("服务器错误");
					})
			},
			//获取商品详情
			getGoodsDetail(){
				this.loading = true;
				db.collection('rent_goods')
					.where({_id: this.goodsId})
					.get()
					.then((res)=>{
						this.loading = false;
						if(res.result.data.length > 0){
							this.goodsData = res.result.data[0];
						}
					}).catch((err) => {
						this.loading = false;
						this.$message.error("服务器错误");
					})
			},
			//获取用户地址簿
			getUserAddress(){
				this.userAddress = {addresses: []};
				db.collection("user_address")
					.where({user_id: this.user._id})
					.get()
					.then((res)=>{
						if(res.result.data.length > 0){
							this.userAddress = res.result.data[0];
						}
					})
			},
			//创建新增地址
			createAddress(){
				this.addAddressDialogVisible = true;
			},
			//城市三级联动回调函数
			chooseAddress(back){
				this.addAddressForm.address = "";
				back.forEach((item, index) => {
					if(index == back.length-1){
						this.addAddressForm.address += item.name;
					}else{
						this.addAddressForm.address += (item.name+"，")
					}
				})
			},
			//保存新增地址
			newAddress(formName){
				this.$refs[formName].validate((valid) => {
					if (!valid) {
						return false;
					}else{
						let newDress = {
							user_id: this.user._id,
							user_phone: this.user.phone,
							addresses: []
						}
						newDress.addresses = JSON.parse(JSON.stringify(this.userAddress.addresses));
						newDress.addresses.push({
							name: this.addAddressForm.name,
							phone: this.addAddressForm.phone,
							address: this.addAddressForm.address+" "+this.addAddressForm.speAddress,
							_id: Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2)
						})
						console.log(this.userAddress.addresses)
						if(!this.userAddress.addresses.length){
							db.collection("user_address").add(newDress).then(res => {
								this.$message.success("新增地址成功");
								this.addAddressDialogVisible = false;
								this.getUserAddress();
							}).catch(err => {
								this.$message.error("新增地址失败");
							})
						}else{
							db.collection("user_address").doc(this.userAddress._id).update(newDress).then(res => {
								this.$message.success("新增地址成功");
								this.addAddressDialogVisible = false;
								this.getUserAddress();
							}).catch(err => {
								this.$message.error("新增地址失败");
							})
						}
					}
				});
			},
			//点击“立即体验”
			experienceOrder(){
				if(this.user.integration < this.goodsData.rent){
					this.$message.warning("造梦积分不足，可购买");
					let timeout = setTimeout(() => {
						this.shopDialogVisible = true;
						clearTimeout(timeout);
					}, 1000)
				}else if(this.user.usable_deposit < this.goodsData.deposit){
					//支付押金
					this.$confirm("您的押金余额不足，将支付押金"+this.goodsData.deposit+"元，是否确定？", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.loading = true;
						uniCloud.callFunction({
							name: "update_permission",
							data: {
								phone: this.user.phone,
								total_deposit: this.goodsData.deposit,
								usable_deposit: this.goodsData.deposit,
								_id: this.user.permission_id
							}
						}).then(res => {
							this.loading = false;
							console.log(res);
							if(res.result.updated){
								this.$message.success("支付成功");
								this.user.total_deposit = this.user.total_deposit + this.goodsData.deposit;
								this.user.usable_deposit = this.user.usable_deposit + this.goodsData.deposit;
							}else{
								this.$message.error("支付失败");
							}
						}).catch(err => {
							this.loading = false;
							this.$message.error("支付失败");
						})
					}).catch(() => {});
				}else{
					this.addressDialogVisible = true;
				}
			},
			//确定体验，并支付积分
			submitExperienceOrder(){
				let costRent = this.goodsData.rent;
				let costDeposit = this.goodsData.rent;
				this.$confirm("您将消耗"+costRent+"积分体验此商品，体验时长为7天，是否确定？", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true;
					uniCloud.callFunction({
						name: "update_permission",
						data: {
							phone: this.user.phone,
							_id: this.user.permission_id,
							usable_deposit: -(this.goodsData.deposit),
							freeze_deposit: this.goodsData.deposit,
							integration: -(this.goodsData.rent)
						}
					}).then(res => {
						this.loading = false;
						this.addressDialogVisible = false;
						console.log(res);
						if(res.result.updated){
							this.$message.success("支付成功");
							this.user.usable_deposit = this.user.usable_deposit - this.goodsData.deposit;
							this.user.freeze_deposit = this.user.freeze_deposit + this.goodsData.deposit;
							this.user.integration = this.user.integration - this.goodsData.rent;
							//生成订单
							const order = {
								user_id: this.user._id,
								user_phone: this.user.phone,
								goods_id: this.goodsData._id,
								goods_name: this.goodsData.name,
								goods_describe: this.goodsData.describe,
								pay_integral: costRent,
								deposit: this.goodsData.deposit,
								create_time: (new Date()).getTime(),
								istatus: "wait_send",
								order_number: Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2),
								img: this.goodsData.img[0],
								receive_message: {
									name: this.choiceAddress.name,
									phone: this.choiceAddress.phone,
									address: this.choiceAddress.address
								}
							}
							db.collection("user_orders").add(order).then(res => {
								this.$message.success("生成订单成功");
							}).catch(err => {
								this.$message.error("生成订单失败");
							})
							this.$router.push("/pages/myCenter/orderList?istatus=wait_send");
						}else{
							this.$message.error("支付失败");
						}
					}).catch(err => {
						this.loading = false;
						this.addressDialogVisible = false;
						this.$message.error("支付失败");
					})
				}).catch(() => {});
			},
			//打开积分商店
			openBuyDiaog(p, c){
				this.integralUnit = p;
				this.integralCount = c;
				this.integralCountDialog = true;
			},
			//确定购买积分
			submitBuy(){
				const integral = this.integralCount*this.integralBuyNum;
				const monny = this.integralUnit*this.integralBuyNum;
				this.$confirm("您将购买"+integral+"造梦积分，共花费￥"+monny+"，是否确定？", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.saveIntegral(integral);
				}).catch(() => {});
			},
			saveIntegral(i){
				this.loading = true;
				uniCloud.callFunction({
					name: "update_permission",
					data: {
						phone: this.user.phone,
						_id: this.user.permission_id,
						integration: this.user.user_type=="vip" ? i*2 : i
					}
				}).then(res => {
					this.loading = false;
					this.integralCountDialog = false;
					console.log(res);
					if(res.result.updated){
						this.$message.success("购买成功");
						if(this.user.user_type == "vip"){
							this.user.integration = this.user.integration + i*2;
						}else{
							this.user.integration = this.user.integration + i;
						}
					}else{
						this.$message.error("购买失败");
					}
				}).catch(err => {
					console.log(err);
					this.loading = false;
					this.$message.error("购买失败");
				})
			},
			init(){
				this.user = JSON.parse(this.getSessionStorage("user"));
				this.goodsId = this.$route.query.id;
				this.getUserPermission();
				this.getGoodsDetail();
				this.getUserAddress();
				
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
