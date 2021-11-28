<template>
	<view class="vip-weal-text">
		<el-row :gutter="10">
			<el-col class="title"><i class="el-icon-connection"></i>会员福利</el-col>
			<el-col :span="12" style="height: 30px;line-height: 30px;color: #000000;text-align: center;font-size: 14px;">会员</el-col>
			<el-col :span="12" style="height: 30px;line-height: 30px;color: #000000;text-align: center;font-size: 14px;">非会员</el-col>
			<el-col :span="12" style="height: 75px;"><span>免费</span>使用线下资源，<span>不消耗</span>造梦积分</el-col>
			<el-col :span="12" style="height: 75px;">使用线下资源<span>需要支付</span>造梦积分</el-col>
			<el-col :span="12">购买造梦积分比例为<span>1：20</span></el-col>
			<el-col :span="12">购买造梦积分比例为<span>1：10</span></el-col>
			<el-col :span="12">完成任务获得<span>200%</span>造梦积分</el-col>
			<el-col :span="12">完成任务获得<span>100%</span>造梦积分</el-col>
			<el-col :span="24" style="height: 100px;">推荐朋友注册成功可<span>获得2元押金</span>和<span>20点积分</span>奖励，推荐朋友成功加入会员可<span>再获得3元押金</span>和<span>30点积分</span>奖励，<span>可提现</span>。</el-col>
		</el-row>
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
		data(){
			return{}
		},
		methods:{
			init(){}
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
