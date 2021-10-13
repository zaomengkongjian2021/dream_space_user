<template>
	<view class="content" v-loading.fullscreen.lock="loading">
		<div class="regist-box">
			<div class="regist-row">
				<span>用 户 名：</span>
				<input type="number" placeholder="请输入手机号码" v-model.trim="userName"/>
			</div>
			<div class="regist-row password-tips">
				<span>密<i style="opacity: 0;">密密</i>码：</span>
				<input type="password" placeholder="请输入密码" v-model.trim="password"/>
			</div>
			<div class="regist-row">
				<span>确认密码：</span>
				<input type="password" placeholder="请输入密码" v-model.trim="surePassword"/>
			</div>
			<div class="regist-row">
				<span>验 证 码：</span>
				<input type="text" placeholder="请输入验证码" v-model.trim="verCode"/>
				<canvas :style="{width:'100px',height:'30px',marginLeft:'10px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback" @click="refresh"></canvas>
			</div>
			<div class="regist-row">
				<button class="regist-btn" type="default" @click="regist">注册</button>
			</div>
		</div>
	</view>
</template>
	
<script>
	const db = uniCloud.database();
	export default {
		data(){
			return {
				userName: "",
				password: "",
				surePassword: "",
				verCode: "",
				loading: false
			}
		},
		methods:{
			regist(){
				let reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;//校验手机的正则表达式
				let reg_password = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;//校验密码，必须由字母、数字组成，区分大小写，8~18位
				if(!this.userName){
					this.$message.error("用户名不能为空");
					return;
				}else if(!this.password){
					this.$message.error("密码不能为空");
					return;
				}else if(!this.surePassword){
					this.$message.error("请输入确认密码");
					return;
				}else if(!reg_phone.test(this.userName)){
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
				}
				this.loading = true;
				//查询用户名是否存在
				db.collection('user_list')
					.where({phone: this.userName})
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
			save(){
				this.loading = true;
				db.collection('user_list').add({
					phone: this.userName,
					password: this.$md5(this.password),
					user_type: "visitor",
					no_overdue: false
				}).then((res) => {
					this.loading = false;
					this.$message.success("注册成功");
					this.$router.push("/pages/index/index");
				}).catch((err)=>{
					this.loading = false;
					this.$message.error("注册失败，请重新注册");
				})
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
			content: "请输入8~18位密码，必须由字母、数字组成，区分大小写";
			font-size: 8px;
			color: #dddddd;
			padding-left: 80px;
		}
	}
</style>
