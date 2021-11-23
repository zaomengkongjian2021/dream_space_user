<template>
	<view class="vip-weal-text">
		<el-row>
			<el-col class="title"><i class="el-icon-connection"></i>会员福利</el-col>
			<el-col>1、会员可<span>免费使用</span>线下资源，<span>免费参加</span>线下活动。</el-col>
			<el-col>2、会员可在<span>线下使用造梦积分</span>进行部分<span>消费</span>。</el-col>
			<el-col>3、会员购买造梦积分、任务获得<span>造梦积分，均为双倍</span>。</el-col>
			<el-col>4、会员可<span>参与抽奖</span>，抽奖可获得任务积分（2~3倍）券、线上资源体验费（5~9折）券。</el-col>
			<el-col>5、<span>推荐朋友</span>成功成为会员，推荐人是会员时<span>奖励造梦积分</span>。</el-col>
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
