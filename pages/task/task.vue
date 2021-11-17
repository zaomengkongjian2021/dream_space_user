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
		  :title="drawerTitle"
		  :visible.sync="subjectDrawer"
		  :direction="direction"
		  size="100%"
		  class="subjects-drawer">
		  <div class="progress">
			  <span>完成度：</span>
			  <el-progress :percentage="drawerData.progress"></el-progress>
		  </div>
		  <div class="award">
			  <span>奖 励：</span>
			  <span>{{drawerData.award}}</span>
		  </div>
		  <div class="subjects">
			  <el-card v-for="(item,index) in subjectsList">
				  <p>{{(index+1)+"、"+item.name+"（"+item.score+"点积分）"}}</p>
				  <textarea placeholder="请输入您的描述" maxlength="1000" v-model="item.input_answer"></textarea>
				  <p v-if="item.show_answer">{{"参考描述："+item.answer}}</p>
				  <p class="view-btn"><el-button @click="showAnswer(item)">{{item.button_text}}</el-button></p>
			  </el-card>
		  </div>
			<el-button class="submit-btn" @click="submitSujects">提交</el-button>
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
				subjectsList: [],
				drawerTitle: "",
				drawerData: {}
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
			//打开题目列表
			openSubject(item){
				this.menuThreeActive = item._id;
				this.drawerTitle = item.name;
				this.drawerData = item;
				this.subjectDrawer = true;
				this.getSubjects(item._id);
			},
			//获取题目
			getSubjects(parentId){
				this.subjectsList = [];
				this.loading = true;
				db.collection("subjects_list").where({parent_id: parentId}).get().then(res => {
					this.loading = false;
					if(res.result.data.length){
						this.subjectsList = res.result.data;
					}else{
						this.$message.warning("暂无题目");
					}
				}).catch(err => {
					this.loading = false;
					this.$message.error("服务器错误");
				})
			},
			//显示参考答案
			showAnswer(item){
				if(item.show_answer){
					item.show_answer = false;
					item.button_text = "查看参考描述";
				}else{
					item.show_answer = true;
					item.button_text = "隐藏参考描述";
				}
			},
			//提交
			submitSujects(){
				
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
