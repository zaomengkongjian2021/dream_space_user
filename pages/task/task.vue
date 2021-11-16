<template>
	<view class="task" v-loading.fullscreen.lock="loading">
		<el-row :gutter="15">
			<el-col :span="8" v-for="(item,index) in menuOne" @click.native="tab_menu_one(item)">
				<el-card :class="['menu-one', menuOneActive==item._id?'active':'']">
					<img v-for="(img,index) in item.icon" :src="img.url" alt="" :class="img.class">
					<p>{{item.name}}</p>
				</el-card>
			</el-col>
		</el-row>
		<el-card class="menu-two">
			<el-col :span="6" v-for="(item,index) in menuTwo" :class="[item._id==menuTwoActive?'active':'']" @click.native="tab_menu_two(item)">
				<i :class="item.icon.url" :style="'color: '+item.icon.color"></i>
				<p>{{item.name}}</p>
			</el-col>
		</el-card>
		<el-card class="menu-three">
			<div class="menu-three-list" @click="openSubject(item)" v-for="(item,index) in menuThree" :class="[item._id==menuThreeActive?'active':'']">
				<p class="list-title">{{item.name+"："}}</p>
				<p class="progress">
					<el-progress :percentage="item.progress"></el-progress>
				</p>
			</div>
		</el-card>
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
				menuOneActive: "",
				menuTwo: [],
				menuTwoActive: "",
				menuThree: [],
				menuThreeActive: "",
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
						this.menuOneActive = this.menuOne[0]._id;
						this.getMenuTwo(this.menuOne[0].type);
					}else{
						this.$message.warning("暂无分类");
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
						this.menuTwoActive = this.menuTwo[0]._id;
						this.getMenuThree(this.menuTwo[0].type);
					}else{
						this.$message.warning("此分类暂无课题");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//获取3级菜单
			getMenuThree(parentType){
				this.loading = true;
				this.menuThree = [];
				db.collection("subjects_menu_three").where({parent_type: parentType}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						this.menuThree = res.result.data;
					}else{
						this.$message.warning("此分类暂无课题");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//切换1级菜单
			tab_menu_one(item){
				this.menuOneActive = item._id;
				this.menuTwoActive = "";
				this.menuThreeActive = "";
				this.getMenuTwo(item.type);
			},
			//切换2级菜单
			tab_menu_two(item){
				this.menuTwoActive = item._id;
				this.menuThreeActive = "";
				this.getMenuThree(item.type);
			},
			//获取题目(
			getSubjects(){
				
			},
			//打开题目列表
			openSubject(item){
				this.menuThreeActive = item._id;
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
