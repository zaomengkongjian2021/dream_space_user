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
					<i class="el-icon-tickets"></i><span>待付</span><a>0</a>
				</p>
				<p>
					<i class="el-icon-news"></i><span>待发</span><a>0</a>
				</p>
				<p>
					<i class="el-icon-document"></i><span>待收</span><a>0</a>
				</p>
				<p>
					<i class="el-icon-goods"></i><span>待还</span><a>0</a>
				</p>
				<p>
					<i class="el-icon-date"></i><span>已还</span><a>0</a>
				</p>
			</el-col>
		</el-row>
		<el-row class="my-other">
			<el-col>
				<span>我的代币券</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col>
				<span>推荐历史</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col>
				<span>造梦联盟</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col>
				<span>联系客服</span><i class="el-icon-arrow-right"></i>
			</el-col>
			<el-col style="border-bottom: none;">
				<span>退出登录</span><i class="el-icon-arrow-right"></i>
			</el-col>
		</el-row>
	</view>
</template>

<script>
</script>

<style>
</style>
