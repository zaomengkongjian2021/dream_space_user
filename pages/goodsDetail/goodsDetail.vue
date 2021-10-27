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
					<span style="color: #d01012;">{{"￥"+goodsData.prich}}</span>
				</el-col>
				<el-col :span="24">
					<span>体验：</span>
					<span style="color: #80e010;">{{"￥"+goodsData.rent+"积分/次"}}</span>
					<span>（联盟成员八折优惠）</span>
				</el-col>
				<el-col :span="24" style="margin-bottom: 10px;">
					<span>押金：</span>
					<span style="color: #ffc107;">{{"￥"+parseInt(goodsData.prich*0.95)}}</span>
					<span>（购买价 = 押金）</span>
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
			<el-col :span="12">
				<el-button style="background: #fb6600;color: #FFFFFF;">立即体验</el-button>
			</el-col>
			<el-col :span="12">
				<el-button>立即购买</el-button>
			</el-col>
		</el-row>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default{
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
				user: {}
			}
		},
		methods:{
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
			}
		},
		created() {
			this.user = JSON.parse(sessionStorage.getItem("user"));
			this.goodsId = this.$route.query.id;
			this.getGoodsDetail();
		},
		watch:{
			$route(){
				this.goodsId = this.$route.query.id;
				this.getGoodsDetail();
			}
		}
	}
</script>

<style>
</style>
