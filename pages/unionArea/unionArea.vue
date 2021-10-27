<template>
	<view :class="['union-area', (isVisitor?'union-bg':'')]" v-loading.fullscreen.lock="loading">
		<!-- 非联盟成员页面 -->
		<el-row class="union-box visitor-model" v-if="isVisitor">
			<el-col class="visitor-title">造梦联盟成员福利</el-col>
			<el-col>
				<p>1、联盟成员可开启<span>联盟任务</span>。</p>
				<p>2、联盟成员完成普通任务获得的“造梦积分”均为<span>1.5倍，购买积分可获得1.5倍</span>。</p>
				<p>3、联盟成员可<span>参与造梦积分抽奖</span>，<a @click="oneYuanDetail" style="color: #007AFF;">查看详情</a></p>
				<!-- <p>4、联盟成员可<span>参与造梦积分盲选</span>，<a @click="BlindChooseDetail">查看详情</a></p> -->
				<p>4、联盟成员可参与“置换商品”竞拍，不定时会有一批商品进行<span>超低价竞拍</span>。</p>
				<p>5、联盟成员可体验、购买、竞拍<span>珍藏版和限量版商品</span>。</p>
				<p>6、联盟成员消耗积分可参与<span>实体店每周组织的各项室内活动、室外活动，</span><a @click="offlineDetail" style="color: #007AFF;">查看详情</a>。</p>
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
				<!-- <el-col :span="24">
					<a>幸运值：</a><span>{{user.lucky_integral}}</span>
				</el-col> -->
			</div>
			<div class="vip-box">
				<el-col class="vip-title" :span="24">实体店活动<i class="el-icon-question" @click="offlineDetailDialogVisible=true;"></i></el-col>
				<el-col v-for="(item,index) in offlineActivity" class="activity-list">
					<span>{{item.time}}</span>
					<span>{{item.name}}</span>
					<span>{{item.province+item.city+item.region+item.address}}</span>
				</el-col>
				<!-- <el-col :span="12">
					<a>今日可抽奖次数：</a><span>{{user.today_lucky_times}}</span>
				</el-col> -->
				<!-- <el-col :span="24">
					<a>幸运值：</a><span>{{user.lucky_integral}}</span>
				</el-col> -->
			</div>
			<!-- <div class="vip-box">
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
			</div> -->
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
			<el-button plain class="ad-union-btn" @click="chooseRechargeDialogVisible=true">{{btnName}}</el-button>
		</el-row>
		<el-dialog
			title="购买联盟令牌"
			:visible.sync="chooseRechargeDialogVisible"
			width="90%"
		>
			<el-row class="recharge-dialog">
				<el-col :span="12">
					<el-button @click="openRecharge(1, 58)"><span style="font-weight: 700;">1个月</span>(￥58)</el-button>
				</el-col>
				<el-col :span="12">
					<el-button @click="openRecharge(3, 165)"><span style="font-weight: 700;">3个月</span>(￥165)</el-button>
				</el-col>
				<el-col :span="12">
					<el-button @click="openRecharge(6, 313)"><span style="font-weight: 700;">6个月</span>(￥313)</el-button>
				</el-col>
				<el-col :span="12">
					<el-button @click="openRecharge(12, 591)"><span style="font-weight: 700;">12个月</span>(￥591)</el-button>
				</el-col>
			</el-row>
		</el-dialog>
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
					2、惊喜奖品：造梦积分（5~100点），联盟任务积分倍数券（1.5~3倍，1~7天），普通商品体验折扣券（3~9.5折），珍贵商品体验折扣券（3~9.5折），普通商品免费体验券（只需押金）。
				</el-col>
				<!-- <el-col>
					3、未抽中任何奖品时，可获得<span>幸运值</span>，<span>满幸运值</span>则下一次抽奖<span>必定中奖</span>。
				</el-col> -->
				<el-col>
					3、使用免费体验券时，可自由选择一个商品，<span>体验7天</span>，<span>超出的时间</span>则直接从该商品的押金中<span>扣除一定的费用</span>，详见具体商品。
				</el-col>
			</el-row>
		</el-dialog>
		<!-- 线下实体店活动介绍 -->
		<el-dialog
			title="实体店活动介绍"
			:visible.sync="offlineDetailDialogVisible"
			width="90%">
		  <el-row class="dialog-detail">
				<el-col>
					1、线下实体店会在<span>每周六、周日</span>组织活动，<span>联盟成员</span>可通过消耗一定的积分参与活动，<span>非联盟成员</span>需不可通过消耗积分参与活动。
				</el-col>
				<el-col>
					2、每周六的活动为<span>“主题活动”</span>，本周的主题活动结束后，会宣布下一周的活动主题。
				</el-col>
				<el-col>
					3、每周日的活动为<span>“室外活动”</span>，本周的室外活动结束后，会宣布下一周的活动内容。
				</el-col>
			</el-row>
		</el-dialog>
		<!-- 造梦积分盲选规则介绍 -->
		<!-- <el-dialog
			title="造梦积分盲选介绍"
			:visible.sync="blindChooseDetailDialogVisible"
			width="90%">
			  <el-row class="dialog-detail">
				<el-col>
					1、<span>消耗200点造梦积分</span>，<span>100%</span>随机获得一张商品免费体验券。
				</el-col>
				<el-col>
					2、<span>所有可体验的商品</span>均在盲选范围内，包括珍贵商品。
				</el-col>
				<el-col>
					3、可使用<span>“免费盲选券”</span>进行盲选，不消耗造梦积分。
				</el-col>
				<el-col>
					4、随机选中的商品，选择不体验时可获得<span>能量值，满能量值可自由选择一张商品免费体验券</span>，不返还消耗的造梦积分和“免费盲选券”。
				</el-col>
				<el-col>
					5、使用商品免费体验券时，系统随机指定一个商品，可<span>体验7天</span>，<span>超出的时间</span>则直接从该商品的押金中<span>扣除一定的费用</span>（商品的每日体验价 X 超出天数）。
				</el-col>
			</el-row>
		</el-dialog> -->
		<!-- 联盟福利介绍 -->
		<el-dialog
			title="联盟福利"
			:visible.sync="unionAreaCountDialogVisible"
			width="90%">
			<el-row class="dialog-detail">
				<p>1、联盟成员可开启<span>联盟任务</span>。</p>
				<p>2、联盟成员完成普通任务获得的“造梦积分”均为<span>1.5倍，购买积分可获得1.5倍</span>。</p>
				<p>3、联盟成员可<span>参与造梦积分抽奖</span>，<a @click="oneYuanDetail" style="color: #007AFF;">查看详情</a></p>
				<!-- <p>4、联盟成员可<span>参与造梦积分盲选</span>，<a @click="BlindChooseDetail">查看详情</a></p> -->
				<p>4、联盟成员可参与“置换商品”竞拍，不定时会有一批商品进行<span>超低价竞拍</span>。</p>
				<p>5、联盟成员可体验、购买、竞拍<span>珍藏版和限量版商品</span>。</p>
				<p>6、联盟成员消耗积分可参与<span>实体店每周组织的各项室内活动、室外活动，</span><a @click="offlineDetail" style="color: #007AFF;">查看详情</a>。</p>
			</el-row>
		</el-dialog>
		<!-- 积分抽奖页面 -->
		<el-dialog
			title=""
			:visible.sync="luckyDraw.dialogVisible"
			width="100%"
			class="lucky-draw">
			<div class="bg-video">
				<video src="../../static/video/lucky_draw.mp4" autoplay loop object-fit="fill" v-show="showVodeo"></video>
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
		<!-- <el-dialog
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
		</el-dialog> -->
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
				btnName: "购买联盟令牌",
				oneYuanDetailDialogVisible: false,
				blindChooseDetailDialogVisible: false,
				unionAreaCountDialogVisible: false,
				chooseRechargeDialogVisible: false,
				offlineDetailDialogVisible: false,
				dueToTime: 0,
				showVodeo: false,
				luckyDraw: {
					dialogVisible: false,
					count: 1,
					awards: []
				},
				blindChoose: {
					dialogVisible: false,
					count: 1
				},
				offlineActivity: []
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
				this.luckyDraw.awards = [];
				document.querySelector("video").playbackRate = 2;
				uniCloud.callFunction({
					name: "create_lucky",
					data: {count: num, phone: this.user.phone, user_id: this.user._id},
					success: (res) => {
						console.log("success")
						this.luckyDraw.awards = res.result;
						this.animateFun(num, 0, ul);
						this.$nextTick(() => {
							document.querySelector("video").playbackRate = 1;
						})
					},
					fail: (err) => {
						this.$nextTick(() => {
							document.querySelector("video").playbackRate = 1;
						})
						console.log("fail")
						console.log(err)
					}
				})
			},
			//生成奖项的动画
			animateFun(num, i, box){
				if(i < num){
					let li = $("<li></li>");
					li.html(this.luckyDraw.awards[i].name);
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
				this.$nextTick(() => {
					document.querySelector("video").addEventListener('play', () => {
						this.showVodeo = true;
					}, false)
				})
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
			//线下活动详情
			offlineDetail(){
				this.offlineDetailDialogVisible = true;
			},
			//盲选活动
			BlindChooseDetail(){
				this.blindChooseDetailDialogVisible = true;
			},
			//打开充值框
			openRecharge(num, cost){
				this.$confirm('您将支付'+cost+'元购买'+num+'个月的联盟令牌，是否确定？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(({ value }) => {
					let item = {...this.user};
					item.due_to = (new Date()).getTime() + 30*num*24*60*60*1000;
					if(this.isVisitor){
						item.user_type = "vip";
						item.lucky_integral = 0;
						item.energy_integral = 0;
						item.zaomeng_integral = 0;
						item.no_overdue = true;
					}else if(this.isVip){
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
					this.chooseRechargeDialogVisible = false;
				}).catch(() => {});
			},
			//获取实体店活动列表
			getOfflineActivity(){
				this.offlineActivity = [];
				const newTime = (new Date()).getTime();
				db.collection("offline_activity").get().then(res => {
					if(res.result.data.length){
						res.result.data.forEach(item => {
							if(newTime <= (new Date(item.time)).getTime()){
								this.offlineActivity.push(item);
							}
						})
					}
				})
			},
			//初始化
			init(){
				if(this.user.due_to){
					this.dueToTime = this.handleTime(this.user.due_to);
					this.judgeVip();
					this.getOfflineActivity();
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
					this.btnName = "联盟令牌续费";
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
