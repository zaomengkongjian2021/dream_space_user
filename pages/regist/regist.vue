<template>
	<view class="content" v-loading.fullscreen.lock="loading">
		<div class="regist-box">
			<div class="regist-row">
				<span>*手机号码：</span>
				<input type="number" placeholder="请输入手机号码" v-model.trim="userPhone"/>
			</div>
			<div class="regist-row password-tips">
				<span>*密<i style="opacity: 0;">密密</i>码：</span>
				<input type="password" placeholder="请输入密码" v-model.trim="password"/>
			</div>
			<div class="regist-row">
				<span>*确认密码：</span>
				<input type="password" placeholder="请输入密码" v-model.trim="surePassword"/>
			</div>
			<div class="regist-row">
				<span>*验 证 码：</span>
				<input type="text" placeholder="请输入验证码" v-model.trim="verCode"/>
				<canvas :style="{width:'100px',height:'30px',marginLeft:'10px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback" @click="refresh"></canvas>
			</div>
			<div class="regist-row">
				<span>推 荐 人：</span>
				<input type="number" placeholder="请输入推荐人手机号码" v-model.trim="referrer.phone"/>
			</div>
			<div class="treaty">
				<el-checkbox v-model="treatyChecked">已阅并同意<a href="">《使用协议》</a>和<a href="">《隐私政策》</a></el-checkbox>
			</div>
			<div class="regist-row">
				<el-button class="regist-btn" type="default" @click="regist">确定注册</el-button>
			</div>
		</div>
	</view>
</template>
	
<script>
	const db = uniCloud.database();
	export default {
		data(){
			return {
				userPhone: "",
				password: "",
				surePassword: "",
				verCode: "",
				loading: false,
				treatyChecked: false,
				referrer: {
					phone: "",
					user_type: "visitor",
					id: ""
				}
			}
		},
		methods:{
			regist(){
				let reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;//校验手机的正则表达式
				let reg_password = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;//校验密码，必须由字母、数字组成，区分大小写，8~18位
				if(!this.treatyChecked){
					this.$message.error("请阅读《使用协议》和《隐私政策》");
					return;
				}else if(!this.userPhone){
					this.$message.error("手机号码不能为空");
					return;
				}else if(!this.password){
					this.$message.error("密码不能为空");
					return;
				}else if(!this.surePassword){
					this.$message.error("请输入确认密码");
					return;
				}else if(!reg_phone.test(this.userPhone)){
					this.$message.error("请正确填写手机号");
					return;
				}else if(!reg_password.test(this.password)){
					this.$message.error("请正确填写密码");
					return;
				}else if(this.password != this.surePassword){
					this.$message.error("两次输入的密码不一致");
					return;
				}else if (this.verCode.length != 4) {
					this.$message.error("验证码不正确");
					return;
				}else if (this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
					this.$message.error("验证码不正确");
					return;
				}else if(this.referrer.phone && !reg_phone.test(this.referrer.phone)){
					this.$message.error("请正确填写推荐人手机号码");
					return;
				}
				this.loading = true;
				//查询推荐人是否存在，及推荐人身份
				if(this.referrer.phone){
					db.collection("user_list")
						.where({phone: this.referrer.phone}).get().then(res => {
							this.loading = false;
							if(res.result.data.length > 0){
								//推荐人存在，继续查询推荐人是否会员
								db.collection("permission").where({phone: this.referrer.phone}).get().then(res => {
									if(res.result.data.length > 0){
										this.referrer.user_type = res.result.data[0].user_type;
										this.referrer.id = res.result.data[0]._id;
									}
									this.searchPhone();
								}).catch(err => {
									this.$message.error("服务器错误");
								})
							}else{
								this.$confirm('推荐人不存在, 是否继续?', '提示', {
									confirmButtonText: '继续',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
								  this.searchPhone();
								}).catch(() => {
									this.loading = false;
								});
							}
						}).catch(err => {
							this.loading = false;
							this.$message.error("服务器错误");
						})
				}else{
					this.searchPhone();
				}
			},
			//查询用户名是否存在
			searchPhone(){
				//查询用户名是否存在
				this.loading = true;
				db.collection("user_list")
					.where({phone: this.userPhone})
					.get()
					.then((res)=>{
						this.loading = false;
						if(res.result.data.length <= 0){
							//用户名不存在，保存用户名和密码
							this.save();
						}else{
							this.$message.error("注册失败，账号已存在");
						}
					}).catch((err) => {
						this.loading = false;
						this.$message.error("注册失败，请重新注册");
					})
			},
			//保存新增用户
			save(){
				this.loading = true;
				uniCloud.callFunction({
				    name: 'add_user',
				    data: {
						phone: this.userPhone,
						password: this.$md5(this.password),
						referrer: this.referrer
					}
				}).then(res => {
					this.loading = true;
					if(res.result.success){
						this.$message.success("恭喜您注册成功");
						this.$router.push("/pages/index/index");
					}else{
						this.$message.error(res.result.message);
					}
				});
			},
			//生成图形验证码
			initCanvas(){
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = 100,
					h = 30;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(26 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			canvasIdErrorCallback(e){
				console.error(e.detail.errMsg)
			},
			//刷新验证图形
			refresh(){
				this.initCanvas();
			}
		},
		created(){},
		onShow() {
			setTimeout(() => {
				this.initCanvas();
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.password-tips{
		&:after{
			display: block;
			content: "请输入8~18位密码，必须由字母、数字组成，区分大小写";
			font-size: 8px;
			color: #dddddd;
			padding-left: 80px;
		}
	}
</style>
