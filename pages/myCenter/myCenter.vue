<template>
	<view class="my-center" v-loading.fullscreen.lock="loading">
		<el-row class="my-deposit">
			<el-col :span="24" class="center-title">我的押金</el-col>
			<el-col :span="12" class="deposit-content">
				<a>余额：</a>
				<span>￥200</span>
			</el-col>
			<el-col :span="12" class="deposit-content">
				<a>可提现：</a>
				<span>￥100</span>
			</el-col>
			<el-col :span="24" class="deposit-bottom">
				<el-button>提现</el-button>
			</el-col>
		</el-row>
		<el-row class="my-order">
			<el-col :span="24" class="center-title">我的订单</el-col>
			<el-col :span="24" class="order-label">
				<p>
					<el-badge :value="1" :max="99">
						<i class="el-icon-tickets"></i>
					</el-badge>
					<span>待付</span>
				</p>
				<p>
					<el-badge :value="10" :max="99">
						<i class="el-icon-news"></i>
					</el-badge>
					<span>待发</span>
				</p>
				<p>
					<el-badge :value="0" :max="99">
						<i class="el-icon-document"></i>
					</el-badge>
					<span>待收</span>
				</p>
				<p>
					<el-badge :value="1" :max="99">
						<i class="el-icon-goods"></i>
					</el-badge>
					<span>待还</span>
				</p>
				<p>
					<el-badge :value="10" :max="99">
						<i class="el-icon-date"></i>
					</el-badge>
					<span>已还</span>
				</p>
			</el-col>
		</el-row>
		<el-row class="my-other">
			<el-col>
				<div>
					<span>我的代币券</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
			<el-col>
				<div @click="viewMyPrize">
					<span>我的奖品</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
			<el-col>
				<div @click="commendRecord">
					<span>推荐历史</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
			<el-col v-if="isVIP">
				<div @click="forwardUnionArea">
					<span>造梦联盟</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
			<el-col>
				<div @click="contactUs">
					<span>联系客服</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
			<el-col>
				<div @click="beforeLoginOut" style="border-bottom: none;">
					<span>退出登录</span><i class="el-icon-arrow-right"></i>
				</div>
			</el-col>
		</el-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},

			}
		},
		computed: {
			isVIP() {
				return this.user && this.user.user_type === 'vip'
			}
		},
		created() {
			this.user = this.getUserInfo()
		},
		methods: {
			getUserInfo () {
				return JSON.parse(sessionStorage.getItem("user") || {})
			},
			// 查看我的奖品
			viewMyPrize() {
				// 去我的奖品列表页面
				this.$router.push("/pages/myCommend/myCommend")
			},
			// 我的推荐
			commendRecord() {
				// 去我的推荐人页 
			},
			// 去联盟页面
			forwardUnionArea() {
				this.$router.push("/pages/unionArea/unionArea")
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
				sessionStorage.removeItem('user')
				this.$router.push("/pages/index/index")
			}
		}
	}
</script>

<style>
</style>
