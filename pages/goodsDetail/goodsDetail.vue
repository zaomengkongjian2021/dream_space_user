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
			<el-row class="type-lable">
				<el-button v-for="(item,index) in goodsData.lable" type="info" round>{{item}}</el-button>
			</el-row>
			<el-row class="detail-message">
				<el-col :span="24">
					<span>专柜价格：</span>
					<span style="color: #d01012;">{{"￥"+(goodsData.prich || "")}}</span>
				</el-col>
				<el-col :span="24">
					<span>体验：</span>
					<span style="color: #80e010;">{{(goodsData.rent || "")+"积分/次"}}</span>
				</el-col>
				<el-col :span="24" style="margin-bottom: 10px;">
					<span>押金：</span>
					<span style="color: #ffc107;">{{"￥"+(goodsData.deposit || "")}}</span>
					<!-- <span>（购买价 = 押金）</span> -->
				</el-col>
				<el-col :span="12">
					<span>适合年龄：</span>
					<span>{{goodsData.age}}</span>
				</el-col>
				<el-col :span="12">
					<span>颗粒数：</span>
					<span>{{goodsData.particles}}</span>
				</el-col>
				<el-col :span="12">
					<span>发行年份：</span>
					<span>{{goodsData.issue_year+"年"}}</span>
				</el-col>
				<el-col :span="12" v-if="this.user.user_type == 'visitor'">
					<el-button class="add-union">加入联盟</el-button>
				</el-col>
			</el-row>
		</view>
		<el-row class="bottom-btn">
			<el-col :span="24">
				<el-button style="background: #fb6600;color: #FFFFFF;" @click="experienceOrder">立即体验</el-button>
			</el-col>
			<!-- <el-col :span="12">
				<el-button>立即购买</el-button>
			</el-col> -->
		</el-row>
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
			<el-form-item label="收获地址:" prop="address">
				<shopwind @confirm="chooseAddress"></shopwind>
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
	import shopwind from "../../components/shopwind-multpicker/shopwind-multpicker.vue"
	const db = uniCloud.database();
	export default{
		components:{
			shopwind: shopwind
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
					speAddress: [{ required: true, message: '请输入街道、社区、楼栋号', trigger: 'blur' }]
				},
				choiceAddress: {},
				experience: ""
			}
		},
		methods:{
			//获取商品详情
			getGoodsDetail(){
				this.loading = true;
				db.collection('goods')
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
			//获取用户信息
			getUserMessage(){
				db.collection("user_list")
					.where({_id: this.user._id})
					.get()
					.then((res)=>{
						if(res.result.data.length > 0){
							this.user = res.result.data[0];
						}
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
				this.addAddressForm.address = back.label.replace(/，/g, " ");
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
				if((this.experience && this.user.zaomeng_integral<this.goodsData.rent*this.experience.discount)||
					(!this.experience && this.user.zaomeng_integral<this.goodsData.rent)){
					this.$message.warning("造梦积分不足，可购买");
					let timeout = setTimeout(() => {
						this.shopDialogVisible = true;
						clearTimeout(timeout);
					}, 1000)
				}else if(!this.user.deposit || this.user.deposit<this.goodsData.deposit){
					//支付押金
					this.$confirm("您的押金余额不足，将支付押金"+this.goodsData.deposit+"元，是否确定？", '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let item = {...this.user};
						item.deposit = (item.deposit || 0) + this.goodsData.deposit;//支付成功，可用押金增加
						item.freeze_deposit = item.freeze_deposit || 0;//冻结押金不变
						delete item._id;
						this.loading = true;
						db.collection("user_list").doc(this.user._id).update(item).then(res=>{
							this.loading = false;
							if(res.result.updated){
								this.$message.success("支付成功");
								this.user.deposit = item.deposit;
								this.user.freeze_deposit = item.freeze_deposit;
								this.setSessionStorage("user", JSON.stringify(this.user));
							}else{
								this.$message.error("支付失败");
							}
						}).catch(err => {
							this.loading = false;
							this.$message.error("支付失败");
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消支付'
						});          
					});
				}else{
					this.addressDialogVisible = true;
				}
			},
			//确定体验，并支付积分
			submitExperienceOrder(){
				let costRent = this.goodsData.rent;
				if(this.experience){
					costRent = this.goodsData.rent*this.experience.discount;
				}
				this.$confirm("您将消耗"+costRent+"积分体验此商品，体验时长为7天，是否确定？", '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let item = {...this.user};
					item.zaomeng_integral = item.zaomeng_integral - costRent;
					item.freeze_deposit = item.freeze_deposit + this.goodsData.deposit;//冻结押金增加
					item.deposit = item.deposit - this.goodsData.deposit;//可用押金减少
					delete item._id;
					this.loading = true;
					db.collection("user_list").doc(this.user._id).update(item).then(res=>{
						this.loading = false;
						this.addressDialogVisible = false;
						if(res.result.updated){
							this.$message.success("支付成功");
							this.user.zaomeng_integral = item.zaomeng_integral;
							this.user.freeze_deposit = item.freeze_deposit;
							this.user.deposit = item.deposit;
							this.setSessionStorage("user", JSON.stringify(this.user));
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
								overdue_time: (new Date()).getTime()+7*24*60*60*1000,
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
							//如果使用了体验券，则需要删除体验券
							if(this.experience){
								db.collection("user_source").doc(this.experience.source_id).remove().then(res => {
									if(res.result.deleted){
										this.$router.push("/pages/myCenter/orderList?istatus=wait_send");
									}
								})
							}else{
								this.$router.push("/pages/myCenter/orderList?istatus=wait_send");
							}
						}else{
							this.$message.error("支付失败");
						}
					}).catch(err => {
						this.loading = false;
						this.addressDialogVisible = false;
						this.$message.error("支付失败");
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消体验'
					});          
				});
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
				if(item.user_type=="vip" && item.no_overdue){
					item.zaomeng_integral = item.zaomeng_integral+i*1.5;
				}else{
					item.zaomeng_integral = item.zaomeng_integral+i;
				}
				delete item._id;
				this.loading = true;
				db.collection("user_list").doc(this.user._id).update(item).then(res=>{
					this.loading = false;
					this.integralCountDialog = false;
					if(res.result.updated){
						this.$message.success("购买成功");
						this.user.zaomeng_integral = item.zaomeng_integral;
						this.setSessionStorage("user", JSON.stringify(this.user));
					}else{
						this.$message.error("购买失败");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("购买失败");
				})
			},
			//使用体验券时，核实是否存在此体验券
			checkExperience(){
				db.collection("user_source").where({_id: this.experience.source_id}).get().then(res => {
					if(res.result.data.length == 0){
						this.experience = "";
					}
					this.getGoodsDetail();
					this.getUserAddress();
				}).catch(err => {
					this.$message.error("服务器错误");
					this.experience = "";
				})
			},
			init(){
				this.user = JSON.parse(this.getSessionStorage("user"));
				window.addEventListener("userChange", () => {
					console.log("这是商品详情")
					this.user = JSON.parse(this.getSessionStorage("user"));
				})
				this.goodsId = this.$route.query.id;
				if(this.$route.query.experience){
					this.experience = JSON.parse(this.$route.query.experience);
					this.checkExperience();
				}else{
					this.getGoodsDetail();
					this.getUserAddress();
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

<style>
</style>
