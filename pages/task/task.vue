<template>
	<view class="task" v-loading="loading">
		<el-row :gutter="15">
			<el-col :span="6">
				<el-card class="menu-one" v-for="(item,index) in menuOne" @click.native="tab_menu_one(item)">
					<img v-for="(img,index) in item.icon" :src="img.url" alt="" :class="img.class">
					<p>{{item.name}}</p>
				</el-card>
				<!-- <el-card class="menu-one">
					<img src="../../static/gif/daziran.png" alt="">
					<p>自然类</p>
				</el-card>
				<el-card class="menu-one">
					<img src="../../static/gif/yuyan.png" alt="" style="animation: none;">
					<p>语言类</p>
				</el-card> -->
			</el-col>
			<el-col :span="18">
				<el-card class="menu-two">
					<div class="menu-two-list" @click="openSubject()" v-for="(item,index) in menuTwo">
						<p class="list-title">{{item.name}}</p>
						<p class="list-content">
							<span>实验概述：</span>
							<span>{{item.description}}</span>
						</p>
						<p class="list-content">
							<span>奖励说明：</span>
							<span>{{item.award}}</span>
						</p>
						<p class="progress">
							<span>进度：</span>
							<el-progress :percentage="item.progress"></el-progress>
						</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-drawer
		  title="我是标题"
		  :visible.sync="subjectDrawer"
		  :direction="direction"
		  size="100%">
		  <span>我来啦!</span>
		</el-drawer>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default{
		data(){
			return {
				loading: false,
				subjectDrawer: false,
				direction: "rtl",
				menuOne: [],
				menuTwo: [],
				subjects: []
			}
		},
		methods: {
			//获取1级菜单
			getMenuOne(){
				this.loading = true;
				this.menuOne = [];
				db.collection("subjects_menu_one").get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						this.menuOne = res.result.data;
						this.getMenuTwo(this.menuOne[0].type);
					}else{
						this.$message.error("暂无分类");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//获取2级菜单
			getMenuTwo(parentType){
				this.loading = true;
				this.menuTwo = [];
				db.collection("subjects_menu_two").where({parent_type: parentType}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						this.menuTwo = res.result.data;
					}else{
						this.$message.error("此分类暂无课题");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//切换1级菜单
			tab_menu_one(item){
				this.getMenuTwo(item.type);
			},
			//获取题目(
			getSubjects(){
				
			},
			//打开题目列表
			openSubject(){
				this.subjectDrawer = true;
			},
			init(){
				this.getMenuOne();
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style>
</style>
