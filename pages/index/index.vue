<template>
	<view class="content" v-loading.fullscreen.lock="loading">
		<div class="login-box" v-if="isLogin">
			<div class="login-row">
				<span>用户名：</span>
				<input type="text" placeholder="请输入手机号码" v-model.trim="userPhone"/>
			</div>
			<div class="login-row">
				<span>密<i style="opacity: 0;">密</i>码：</span>
				<input type="password" placeholder="请输入密码" v-model.trim="password"/>
			</div>
			<div class="login-row">
				<el-button class="login-btn" type="default" @click="login">登 录</el-button>
			</div>
			<div class="login-row">
				<a @click="openRegist">账号注册</a>
			</div>
		</div>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		components: {},
		data() {
			return {
				userPhone: "",
				password: "",
				isLogin: true,
				loading: false
			}
		},
		onLoad() {},
		methods: {
			login(){
				let reg_phone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;//校验手机的正则表达式
				let reg_password = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;//校验密码，必须由字母、数字组成，区分大小写，8~18位
				if(!this.userPhone){
					this.$message.error("用户名不能为空");
					return;
				}else if(!this.password){
					this.$message.error("密码不能为空");
					return;
				}else if(!reg_phone.test(this.userPhone)){
					this.$message.error("用户不存在");
					return;
				}else if(!reg_password.test(this.password)){
					this.$message.error("密码错误");
					return;
				}
				this.loading = true;
				uniCloud.callFunction({
				    name: 'check_login_passwork',
				    data: {
						phone: this.userPhone,
						passwork: this.$md5(this.password)
					}
				  }).then(res => {
					  this.loading = false;
					  if(res.result.success){
						this.setSessionStorage("user", JSON.stringify(res.result.data[0]));
						this.$router.push("/pages/nav/nav?page=rent_goodsList");
					  }else{
						  this.$message.error(res.result.message);
					  }
				  });
			},
			openRegist(){
				this.$router.push("/pages/regist/regist");
			}
		}
	}
</script>

<style lang="scss"></style>
