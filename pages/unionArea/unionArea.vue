<template>
	<view :class="['union-area', (isVisitor?'union-bg':'')]" v-loading.fullscreen.lock="loading">
		<!-- 非联盟成员页面 -->
		<el-row class="union-box visitor-model" v-if="isVisitor">
			<el-col class="visitor-title">造梦联盟成员福利</el-col>
			<el-col>
				<p>1、联盟成员可开启<span>联盟任务</span>。</p>
				<p>2、联盟成员完成普通任务获得的“造梦积分”均为<span>双倍，购买积分可获得1.5倍</span>。</p>
				<p>3、联盟成员可<span>参与造梦积分抽奖</span>，<a @click="oneYuanDetail">查看详情</a></p>
				<p>4、联盟成员可<span>参与造梦积分盲选</span>，<a @click="BlindChooseDetail">查看详情</a></p>
				<p>5、联盟成员可参与“置换商品”竞拍，每月都会有一批商品进行<span>超低价竞拍</span>。</p>
				<p>6、联盟成员可体验、购买、竞拍<span>珍藏版和限量版商品</span>。</p>
				<p>7、联盟成员身份<span>有效期一年</span>。</p>
			</el-col>
			<el-col class="visitor-title">怎样加入造梦联盟</el-col>
			<el-col>
				<p><span>购买联盟令牌</span>即可加入联盟。</p>
			</el-col>
		</el-row>
		<!-- 联盟成员页面 -->
		<el-row class="union-box vip-model" v-if="isVip">
			<div class="vip-box">
				<el-col class="vip-title" :span="24">成员信息：<i class="el-icon-question" @click="unionAreaCountDialogVisible=true;"></i></el-col>
				<el-col :span="24">
					<a>令牌到期时间：</a><span>{{dueToTime}}</span>
				</el-col>
				<el-col :span="24">
					<a>造梦积分：</a><span>{{user.zaomeng_integral}}</span>
				</el-col>
			</div>
			<div class="vip-box">
				<el-col class="vip-title" :span="24">抽奖<i class="el-icon-question" @click="oneYuanDetailDialogVisible=true;"></i></el-col>
				<el-col :span="12" style="justify-content: space-between;">
					<a plain>我的奖品：</a><el-button plain>查看奖品</el-button>
				</el-col>
				<el-col :span="12" style="justify-content: flex-end;">
					<el-button plain @click="openLuckyDraw">去抽奖</el-button>
				</el-col>
				<!-- <el-col :span="12">
					<a>今日可抽奖次数：</a><span>{{user.today_lucky_times}}</span>
				</el-col> -->
				<el-col :span="24">
					<a>幸运值：</a><span>{{user.lucky_integral}}</span>
				</el-col>
			</div>
			<div class="vip-box">
				<el-col class="vip-title" :span="24">盲选<i class="el-icon-question" @click="blindChooseDetailDialogVisible=true;"></i></el-col>
				<el-col :span="15">
					<a>我的商品券：</a><el-button plain>查看</el-button>
				</el-col>
				<el-col :span="9" style="justify-content: flex-end;">
					<el-button plain @click="openBlindChoose">去盲选</el-button>
				</el-col>
				<el-col :span="24">
					<a>能量值：</a><span>{{user.energy_integral}}</span>
				</el-col>
			</div>
			<div class="vip-box">
				<el-col class="vip-title" :span="24">好运速递</el-col>
				<el-col class="goodLuck-message">
					<p>
						<a>名字：</a>
						<span>恭喜XXX获得免费体验券一张</span>
					</p>
				</el-col>
			</div>
		</el-row>
		<!-- 按钮 -->
		<el-row v-if="isVisitor || !user.no_overdue" class="bottom-btn">
			<el-button plain class="ad-union-btn" @click="openRecharge">{{btnName}}</el-button>
		</el-row>
		<!-- 造梦积分抽奖规则介绍 -->
		<el-dialog
		  title="造梦积分抽奖介绍"
		  :visible.sync="oneYuanDetailDialogVisible"
		  width="90%">
		  <el-row class="dialog-detail">
				<el-col>
					1、<span>消耗20点造梦积分</span>可进行一次抽奖。
				</el-col>
				<el-col>
					2、惊喜奖品：免费体验券（只需押金），体验折扣券（3~9折），造梦积分（20~100点），超低价竞拍直拍券（出价后可立即支付获得拍卖商品），免费盲选券，广告跳过券，任务完成券。
				</el-col>
				<el-col>
					3、未抽中任何奖品时，可获得<span>幸运值</span>，<span>满幸运值</span>则下一次抽奖<span>必定中奖</span>。
				</el-col>
				<el-col>
					4、使用免费体验券时，可自由选择一个商品，<span>体验3天</span>，<span>超出的时间</span>则直接从该商品的押金中<span>扣除一定的费用</span>（商品的每日体验价 X 超出天数）。
				</el-col>
			</el-row>
		</el-dialog>
		<!-- 造梦积分盲选规则介绍 -->
		<el-dialog
		  title="造梦积分盲选介绍"
		  :visible.sync="blindChooseDetailDialogVisible"
		  width="90%">
		  <el-row class="dialog-detail">
				<el-col>
					1、<span>消耗200点造梦积分</span>，<span>100%</span>随机获得一张商品免费体验券。
				</el-col>
				<el-col>
					2、<span>所有商品</span>均在盲选范围内。
				</el-col>
				<el-col>
					3、可使用<span>“免费盲选券”</span>进行盲选，不消耗造梦积分。
				</el-col>
				<el-col>
					4、随机选中的商品，选择不体验时可获得<span>能量值，满能量值可自由选择一张商品免费体验券</span>，不返还消耗的造梦积分和“免费盲选券”。
				</el-col>
				<el-col>
					5、使用商品免费体验券时，系统随机指定一个商品，可<span>体验3天</span>，<span>超出的时间</span>则直接从该商品的押金中<span>扣除一定的费用</span>（商品的每日体验价 X 超出天数）。
				</el-col>
			</el-row>
		</el-dialog>
		<!-- 联盟福利介绍 -->
		<el-dialog
			title="联盟福利"
			:visible.sync="unionAreaCountDialogVisible"
			width="90%">
			<el-row class="dialog-detail">
				<el-col>1、联盟成员可开启<span>联盟任务</span>。</el-col>
				<el-col>2、联盟成员完成普通任务获得的“造梦积分”均为<span>双倍</span>。</el-col>
				<el-col>3、联盟成员可<span>参与造梦积分抽奖</span>，<a @click="oneYuanDetail">查看详情</a></el-col>
				<el-col>4、联盟成员可<span>参与造梦积分盲选</span>，<a @click="BlindChooseDetail">查看详情</a></el-col>
				<el-col>5、联盟成员可参与“置换商品”竞拍，每月都会有一批商品进行<span>超低价竞拍</span>。</el-col>
				<el-col>6、联盟成员可体验、购买、竞拍<span>珍藏版和限量版商品</span>。</el-col>
				<el-col>7、联盟成员身份<span>有效期一年</span>。</el-col>
			</el-row>
		</el-dialog>
		<!-- 积分抽奖页面 -->
		<el-dialog
			title=""
			:visible.sync="luckyDraw.dialogVisible"
			width="100%"
			class="lucky-draw">
			<div class="bg-video">
				<video src="../../static/video/lucky_draw.mp4" autoplay loop object-fit="fill"></video>
			</div>
			<el-row class="lucky-draw-content">
				<el-col>
					<el-button plain @click="createLucky1(1)">抽奖1次</el-button>
					<el-button plain @click="createLucky1(10)">抽奖10次</el-button>
				</el-col>
			</el-row>
			<div class="lucky-draw-results"></div>
		</el-dialog>
		<!-- 盲选页面 -->
		<el-dialog
			title=""
			:visible.sync="blindChoose.dialogVisible"
			width="100%"
			class="blind-choose">
			<div class="bg-video">
				<video src="../../static/video/lucky_draw.mp4" autoplay loop object-fit="fill"></video>
			</div>
			<el-row class="blind-choose-content">
				<el-col>
					<el-button plain @click="createBlindChoose(10)">开始</el-button>
				</el-col>
			</el-row>
			<div class="blind-choose-results"></div>
		</el-dialog>
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
			return{
				isVisitor: true,
				isVip: false,
				isAdmin: false,
				loading: false,
				btnName: "购买联盟令牌（￥399）",
				oneYuanDetailDialogVisible: false,
				blindChooseDetailDialogVisible: false,
				unionAreaCountDialogVisible: false,
				dueToTime: 0,
				luckyDraw: {
					dialogVisible: false,
					count: 1
				},
				blindChoose: {
					dialogVisible: false,
					count: 1
				}
			}
		},
		methods:{
			//盲选生成选项
			createBlindChoose(num){
				this.blindChoose.count = num;
				let ul = $(".blind-choose-results");
				ul.html("");
				this.animateFun(num, 0, ul);
			},
			//积分抽奖生成奖项
			createLucky1(num){
				this.luckyDraw.count = num;
				let ul = $(".lucky-draw-results");
				ul.html("");
				this.animateFun(num, 0, ul);
			},
			//生成奖项的动画
			animateFun(num, i, box){
				if(i < num){
					let li = $("<li></li>");
					li.html(i+11);
					li.appendTo(box);
					li.animate({}, ()=>{
						li.css({transform: "scale(1)"});
						let top = 0, left = 0, bottom = 0;
						if(i > 4){
							bottom = 0;
							left = ((i-5)*20.4)+"%";
							li.animate({bottom: bottom,left: left,"margin-top": 0,"margin-left": 0}, 300, ()=>{
								this.animateFun(num, i+1, box);
							})
						}else if(i<=4 && num>1){
							top = 0;
							left = (i*20.4)+"%";
							li.animate({top: top,left: left,"margin-top": 0,"margin-left": 0}, 300, ()=>{
								this.animateFun(num, i+1, box);
							})
						}
					})
				}
			},
			//打开抽奖框
			openLuckyDraw(){
				$(".lucky-draw-results").html("");
				this.luckyDraw.dialogVisible=true;
			},
			//打开盲选框
			openBlindChoose(){
				$(".blind-choose-results").html("");
				this.blindChoose.dialogVisible=true;
			},
			//积分抽奖
			oneYuanDetail(){
				this.oneYuanDetailDialogVisible = true;
			},
			//盲选活动
			BlindChooseDetail(){
				this.blindChooseDetailDialogVisible = true;
			},
			//打开充值框
			openRecharge(){
				this.$confirm('您将支付399元购买联盟令牌，是否确定？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(({ value }) => {
					let item = {...this.user};
					item.due_to = (new Date()).getTime() + 365*24*60*60*1000;
					if(this.isVisitor){
						// item.today_lucky_times = 3;
						item.user_type = "vip";
						item.lucky_integral = 0;
						item.energy_integral = 0;
						item.zaomeng_integral = 0;
						item.no_overdue = true;
					}else if(this.isVip){
						// item.today_lucky_times = item.today_lucky_times;
						item.lucky_integral = item.lucky_integral;
						item.energy_integral = item.energy_integral;
						item.zaomeng_integral = item.zaomeng_integral;
						item.no_overdue = true;
					};
					const params = {
						item: item,
						success: "欢迎加入造梦联盟",
						error: "加入失败",
						children: "unionArea",
						backFun: ["init"]
					}
					this.$emit("submitUser", params);
				}).catch(() => {});
			},
			//初始化
			init(){
				if(this.user.due_to){
					this.dueToTime = this.handleTime(this.user.due_to);
					this.judgeVip();
				}
				if(this.user.user_type == "visitor"){//游客
					this.isVisitor = true;
					this.isVip = false;
					this.isAdmin = false;
				}else if(this.user.user_type == "vip"){//vip
					this.isVisitor = false;
					this.isVip = true;
					this.isAdmin = false;
				}else if(this.user.user_type == "admin"){//管理员
					this.isVisitor = false;
					this.isVip = false;
					this.isAdmin = true;
				}
			},
			//时间转换
			handleTime(t){
				let tt = new Date(t),
						y = tt.getFullYear(),
						m = tt.getMonth()+1,
						d = tt.getDate();
				if(m < 10){
					m = "0" + m;
				}
				return y+"-"+m+"-"+d;
			},
			//判断令牌是否过期
			judgeVip(){
				const nowTime = (new Date()).getTime();
				if(nowTime>this.user.due_to && this.user.no_overdue){
					this.user.no_overdue = false;
					this.btnName = "联盟令牌续费（￥399）";
					let item = {...this.user};
					const params = {
						item: item,
						success: "您的联盟令牌已到期",
						error: "服务器错误",
						children: "unionArea",
						backFun: ["init"]
					}
					this.$emit("submitUser", params);
				}
			}
		},
		created() {
			this.init();
		}
	}
</script>

<stylspan>
</stylspan>
