(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-nav-nav","pages-myCenter-myCenter","pages-unionArea-unionArea"],{"0097":function(t,e,i){"use strict";i.r(e);var n=i("9d95"),a=i("a50d");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);var l,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"582b66da",null,!1,n["a"],l);e["default"]=c.exports},"0cbe":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"integral"},[t._v("任务中心")])},s=[]},"0dbd":function(t,e,i){"use strict";(function(t){var n=i("4ea4");i("4160"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),s=n(i("80cd")),l=n(i("c6d8")),o=n(i("1d55")),c=n(i("399a")),r=t.database(),u={components:{goodsList:s.default,unionArea:l.default,myCenter:o.default,task:c.default},data:function(){return{navList:[{name:"商品",icon:"el-icon-goods",id:"goodsList"},{name:"联盟",icon:"el-icon-setting",id:"unionArea"},{name:"任务",icon:"el-icon-tickets",id:"task"},{name:"我的",icon:"el-icon-menu",id:"myCenter"}],activeNav:"goodsList",user:""}},methods:{tabModel:function(t){this.activeNav=t.id},submitUser:function(t){var e=this;delete t.item._id;var i=(0,a.default)({},this.user);delete i._id,Object.assign(i,t.item),this.$refs[t.children].loading=!0,r.collection("user_list").doc(this.user._id).update(i).then((function(i){e.$refs[t.children].loading=!1,i.result.updated?(e.$message.success(t.success),t.close&&t.close.forEach((function(i){e.$refs[t.children][i]=!1})),e.updateUser(t)):e.$message.error(t.error)})).catch((function(i){e.$refs[t.children].loading=!1,e.$message.error(t.error)}))},updateUser:function(t){var e=this;this.$refs[t.children].loading=!0,r.collection("user_list").where({_id:this.user._id}).get().then((function(i){e.$refs[t.children].loading=!1;var n=i.result.data;n.length>0?(sessionStorage.setItem("user",JSON.stringify(n[0])),e.user=n[0],e.$nextTick((function(){t.backFun&&t.backFun.forEach((function(i){e.$refs[t.children][i]()}))}))):e.$message.error("刷新失败，请重新登录")})).catch((function(i){e.$refs[t.children].loading=!1,e.$message.error("刷新失败，请重新登录")}))}},created:function(){this.user=JSON.parse(sessionStorage.getItem("user"))}};e.default=u}).call(this,i("a9ff")["default"])},"1d55":function(t,e,i){"use strict";i.r(e);var n=i("81b6"),a=i("21ca");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);var l,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"b528203c",null,!1,n["a"],l);e["default"]=c.exports},"1d68":function(t,e){},"21ca":function(t,e,i){"use strict";i.r(e);var n=i("1d68"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"399a":function(t,e,i){"use strict";i.r(e);var n=i("0cbe"),a=i("c90c");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);var l,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"3ca23ece",null,!1,n["a"],l);e["default"]=c.exports},"3a3a":function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("5530")),s=(t.database(),{props:{user:{default:function(){return{}}}},data:function(){return{isVisitor:!0,isVip:!1,isAdmin:!1,loading:!1,btnName:"购买联盟令牌",oneYuanDetailDialogVisible:!1,blindChooseDetailDialogVisible:!1,unionAreaCountDialogVisible:!1,chooseRechargeDialogVisible:!1,dueToTime:0,luckyDraw:{dialogVisible:!1,count:1},blindChoose:{dialogVisible:!1,count:1}}},methods:{createBlindChoose:function(t){this.blindChoose.count=t;var e=$(".blind-choose-results");e.html(""),this.animateFun(t,0,e)},createLucky1:function(t){this.luckyDraw.count=t;var e=$(".lucky-draw-results");e.html(""),this.animateFun(t,0,e)},animateFun:function(t,e,i){var n=this;if(e<t){var a=$("<li></li>");a.html(e+11),a.appendTo(i),a.animate({},(function(){a.css({transform:"scale(1)"});var s=0,l=0,o=0;e>4?(o=0,l=20.4*(e-5)+"%",a.animate({bottom:o,left:l,"margin-top":0,"margin-left":0},300,(function(){n.animateFun(t,e+1,i)}))):e<=4&&t>1&&(s=0,l=20.4*e+"%",a.animate({top:s,left:l,"margin-top":0,"margin-left":0},300,(function(){n.animateFun(t,e+1,i)})))}))}},openLuckyDraw:function(){$(".lucky-draw-results").html(""),this.luckyDraw.dialogVisible=!0},openBlindChoose:function(){$(".blind-choose-results").html(""),this.blindChoose.dialogVisible=!0},oneYuanDetail:function(){this.oneYuanDetailDialogVisible=!0},BlindChooseDetail:function(){this.blindChooseDetailDialogVisible=!0},openRecharge:function(t,e){var i=this;this.$confirm("您将支付"+e+"元购买"+t+"个月的联盟令牌，是否确定？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(e){e.value;var n=(0,a.default)({},i.user);n.due_to=(new Date).getTime()+30*t*24*60*60*1e3,i.isVisitor?(n.user_type="vip",n.lucky_integral=0,n.energy_integral=0,n.zaomeng_integral=0,n.no_overdue=!0):i.isVip&&(n.lucky_integral=n.lucky_integral,n.energy_integral=n.energy_integral,n.zaomeng_integral=n.zaomeng_integral,n.no_overdue=!0);var s={item:n,success:"欢迎加入造梦联盟",error:"加入失败",children:"unionArea",backFun:["init"]};i.$emit("submitUser",s),i.chooseRechargeDialogVisible=!1})).catch((function(){}))},init:function(){this.user.due_to&&(this.dueToTime=this.handleTime(this.user.due_to),this.judgeVip()),"visitor"==this.user.user_type?(this.isVisitor=!0,this.isVip=!1,this.isAdmin=!1):"vip"==this.user.user_type?(this.isVisitor=!1,this.isVip=!0,this.isAdmin=!1):"admin"==this.user.user_type&&(this.isVisitor=!1,this.isVip=!1,this.isAdmin=!0)},handleTime:function(t){var e=new Date(t),i=e.getFullYear(),n=e.getMonth()+1,a=e.getDate();return n<10&&(n="0"+n),i+"-"+n+"-"+a},judgeVip:function(){var t=(new Date).getTime();if(t>this.user.due_to&&this.user.no_overdue){this.user.no_overdue=!1,this.btnName="联盟令牌续费";var e=(0,a.default)({},this.user),i={item:e,success:"您的联盟令牌已到期",error:"服务器错误",children:"unionArea",backFun:["init"]};this.$emit("submitUser",i)}}},created:function(){this.init()}});e.default=s}).call(this,i("a9ff")["default"])},"750d":function(t,e,i){"use strict";i.r(e);var n=i("3a3a"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"76fa":function(t,e,i){t.exports=i.p+"static/media/lucky_draw.ff892407.mp4"},"81b6":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"my-center"},[i("el-row",{staticClass:"my-deposit"},[i("el-col",{staticClass:"center-title",attrs:{span:24}},[t._v("我的押金")]),i("el-col",{staticClass:"deposit-content",attrs:{span:12}},[i("a",[t._v("余额：")]),i("span",[t._v("￥200")])]),i("el-col",{staticClass:"deposit-content",attrs:{span:12}},[i("a",[t._v("可提现：")]),i("span",[t._v("￥100")])]),i("el-col",{staticClass:"deposit-bottom",attrs:{span:24}},[i("el-button",[t._v("提现")])],1)],1),i("el-row",{staticClass:"my-order"},[i("el-col",{staticClass:"center-title",attrs:{span:24}},[t._v("我的订单")]),i("el-col",{staticClass:"order-label",attrs:{span:24}},[i("p",[i("i",{staticClass:"el-icon-tickets"}),i("span",[t._v("待付")]),i("a",[t._v("0")])]),i("p",[i("i",{staticClass:"el-icon-news"}),i("span",[t._v("待发")]),i("a",[t._v("0")])]),i("p",[i("i",{staticClass:"el-icon-document"}),i("span",[t._v("待收")]),i("a",[t._v("0")])]),i("p",[i("i",{staticClass:"el-icon-goods"}),i("span",[t._v("待还")]),i("a",[t._v("0")])]),i("p",[i("i",{staticClass:"el-icon-date"}),i("span",[t._v("已还")]),i("a",[t._v("0")])])])],1),i("el-row",{staticClass:"my-other"},[i("el-col",[i("span",[t._v("我的代币券")]),i("i",{staticClass:"el-icon-arrow-right"})]),i("el-col",[i("span",[t._v("推荐历史")]),i("i",{staticClass:"el-icon-arrow-right"})]),i("el-col",[i("span",[t._v("造梦联盟")]),i("i",{staticClass:"el-icon-arrow-right"})]),i("el-col",[i("span",[t._v("联系客服")]),i("i",{staticClass:"el-icon-arrow-right"})]),i("el-col",{staticStyle:{"border-bottom":"none"}},[i("span",[t._v("退出登录")]),i("i",{staticClass:"el-icon-arrow-right"})])],1)],1)},s=[]},"9d95":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"nav"},[i("div",{staticClass:"nav-main"},["goodsList"==t.activeNav?i("goodsList",{ref:"goodsList",attrs:{user:t.user},on:{updateUser:function(e){arguments[0]=e=t.$handleEvent(e),t.updateUser.apply(void 0,arguments)},submitUser:function(e){arguments[0]=e=t.$handleEvent(e),t.submitUser.apply(void 0,arguments)}}}):"unionArea"==t.activeNav?i("unionArea",{ref:"unionArea",attrs:{user:t.user},on:{updateUser:function(e){arguments[0]=e=t.$handleEvent(e),t.updateUser.apply(void 0,arguments)},submitUser:function(e){arguments[0]=e=t.$handleEvent(e),t.submitUser.apply(void 0,arguments)}}}):"task"==t.activeNav?i("task",{ref:"task",attrs:{user:t.user},on:{updateUser:function(e){arguments[0]=e=t.$handleEvent(e),t.updateUser.apply(void 0,arguments)},submitUser:function(e){arguments[0]=e=t.$handleEvent(e),t.submitUser.apply(void 0,arguments)}}}):"myCenter"==t.activeNav?i("myCenter",{ref:"myCenter",attrs:{user:t.user},on:{updateUser:function(e){arguments[0]=e=t.$handleEvent(e),t.updateUser.apply(void 0,arguments)},submitUser:function(e){arguments[0]=e=t.$handleEvent(e),t.submitUser.apply(void 0,arguments)}}}):t._e()],1),i("div",{staticClass:"nav-footer"},t._l(t.navList,(function(e,n){return i("p",{class:t.activeNav==e.id?"active-nav":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.tabModel(e)}}},[i("i",{class:e.icon}),i("span",[t._v(t._s(e.name))])])})),0)])},s=[]},a50d:function(t,e,i){"use strict";i.r(e);var n=i("0dbd"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},be42:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;t.database();var i={data:function(){return{}},methods:{},created:function(){}};e.default=i}).call(this,i("a9ff")["default"])},c6d8:function(t,e,i){"use strict";i.r(e);var n=i("d006"),a=i("750d");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);var l,o=i("f0c5"),c=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],l);e["default"]=c.exports},c90c:function(t,e,i){"use strict";i.r(e);var n=i("be42"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},d006:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],class:["union-area",t.isVisitor?"union-bg":""]},[t.isVisitor?n("el-row",{staticClass:"union-box visitor-model"},[n("el-col",{staticClass:"visitor-title"},[t._v("造梦联盟成员福利")]),n("el-col",[n("p",[t._v("1、联盟成员可开启"),n("span",[t._v("联盟任务")]),t._v("。")]),n("p",[t._v("2、联盟成员完成普通任务获得的“造梦积分”均为"),n("span",[t._v("2倍，购买积分可获得1.5倍")]),t._v("。")]),n("p",[t._v("3、联盟成员可"),n("span",[t._v("参与造梦积分抽奖")]),t._v("，"),n("a",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.oneYuanDetail.apply(void 0,arguments)}}},[t._v("查看详情")])]),n("p",[t._v("4、联盟成员可"),n("span",[t._v("参与造梦积分盲选")]),t._v("，"),n("a",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.BlindChooseDetail.apply(void 0,arguments)}}},[t._v("查看详情")])]),n("p",[t._v("5、联盟成员可参与“置换商品”竞拍，每月都会有一批商品进行"),n("span",[t._v("超低价竞拍")]),t._v("。")]),n("p",[t._v("6、联盟成员可体验、购买、竞拍"),n("span",[t._v("珍藏版和限量版商品")]),t._v("。")])]),n("el-col",{staticClass:"visitor-title"},[t._v("怎样加入造梦联盟")]),n("el-col",[n("p",[n("span",[t._v("购买联盟令牌")]),t._v("即可加入联盟。")])])],1):t._e(),t.isVip?n("el-row",{staticClass:"union-box vip-model"},[n("div",{staticClass:"vip-box"},[n("el-col",{staticClass:"vip-title",attrs:{span:24}},[t._v("成员信息："),n("i",{staticClass:"el-icon-question",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.unionAreaCountDialogVisible=!0}}})]),n("el-col",{attrs:{span:24}},[n("a",[t._v("令牌到期时间：")]),n("span",[t._v(t._s(t.dueToTime))])]),n("el-col",{attrs:{span:24}},[n("a",[t._v("造梦积分：")]),n("span",[t._v(t._s(t.user.zaomeng_integral))])])],1),n("div",{staticClass:"vip-box"},[n("el-col",{staticClass:"vip-title",attrs:{span:24}},[t._v("抽奖"),n("i",{staticClass:"el-icon-question",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.oneYuanDetailDialogVisible=!0}}})]),n("el-col",{staticStyle:{"justify-content":"space-between"},attrs:{span:12}},[n("a",{attrs:{plain:!0}},[t._v("我的奖品：")]),n("el-button",{attrs:{plain:!0}},[t._v("查看奖品")])],1),n("el-col",{staticStyle:{"justify-content":"flex-end"},attrs:{span:12}},[n("el-button",{attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openLuckyDraw.apply(void 0,arguments)}}},[t._v("去抽奖")])],1),n("el-col",{attrs:{span:24}},[n("a",[t._v("幸运值：")]),n("span",[t._v(t._s(t.user.lucky_integral))])])],1),n("div",{staticClass:"vip-box"},[n("el-col",{staticClass:"vip-title",attrs:{span:24}},[t._v("盲选"),n("i",{staticClass:"el-icon-question",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.blindChooseDetailDialogVisible=!0}}})]),n("el-col",{attrs:{span:15}},[n("a",[t._v("我的商品券：")]),n("el-button",{attrs:{plain:!0}},[t._v("查看")])],1),n("el-col",{staticStyle:{"justify-content":"flex-end"},attrs:{span:9}},[n("el-button",{attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openBlindChoose.apply(void 0,arguments)}}},[t._v("去盲选")])],1),n("el-col",{attrs:{span:24}},[n("a",[t._v("能量值：")]),n("span",[t._v(t._s(t.user.energy_integral))])])],1),n("div",{staticClass:"vip-box"},[n("el-col",{staticClass:"vip-title",attrs:{span:24}},[t._v("好运速递")]),n("el-col",{staticClass:"goodLuck-message"},[n("p",[n("a",[t._v("名字：")]),n("span",[t._v("恭喜XXX获得免费体验券一张")])])])],1)]):t._e(),t.isVisitor||!t.user.no_overdue?n("el-row",{staticClass:"bottom-btn"},[n("el-button",{staticClass:"ad-union-btn",attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseRechargeDialogVisible=!0}}},[t._v(t._s(t.btnName))])],1):t._e(),n("el-dialog",{attrs:{title:"购买联盟令牌",visible:t.chooseRechargeDialogVisible,width:"90%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.chooseRechargeDialogVisible=e}}},[n("el-row",{staticClass:"recharge-dialog"},[n("el-col",{attrs:{span:12}},[n("el-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRecharge(1,58)}}},[n("span",{staticStyle:{"font-weight":"700"}},[t._v("1个月")]),t._v("(￥58)")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRecharge(3,165)}}},[n("span",{staticStyle:{"font-weight":"700"}},[t._v("3个月")]),t._v("(￥165)")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRecharge(6,313)}}},[n("span",{staticStyle:{"font-weight":"700"}},[t._v("6个月")]),t._v("(￥313)")])],1),n("el-col",{attrs:{span:12}},[n("el-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.openRecharge(12,591)}}},[n("span",{staticStyle:{"font-weight":"700"}},[t._v("12个月")]),t._v("(￥591)")])],1)],1)],1),n("el-dialog",{attrs:{title:"造梦积分抽奖介绍",visible:t.oneYuanDetailDialogVisible,width:"90%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.oneYuanDetailDialogVisible=e}}},[n("el-row",{staticClass:"dialog-detail"},[n("el-col",[t._v("1、"),n("span",[t._v("消耗20点造梦积分")]),t._v("可进行一次抽奖。")]),n("el-col",[t._v("2、惊喜奖品：造梦积分（5~100点），任务积分倍数券（1.5~3倍，1~7天），普通商品体验折扣券（3~9.5折），珍贵商品体验折扣券（3~9.5折），普通商品免费体验券（只需押金），免费盲选券。")]),n("el-col",[t._v("3、未抽中任何奖品时，可获得"),n("span",[t._v("幸运值")]),t._v("，"),n("span",[t._v("满幸运值")]),t._v("则下一次抽奖"),n("span",[t._v("必定中奖")]),t._v("。")]),n("el-col",[t._v("4、使用免费体验券时，可自由选择一个商品，"),n("span",[t._v("体验4天")]),t._v("，"),n("span",[t._v("超出的时间")]),t._v("则直接从该商品的押金中"),n("span",[t._v("扣除一定的费用")]),t._v("（商品的每日体验价 X 超出天数）。")])],1)],1),n("el-dialog",{attrs:{title:"造梦积分盲选介绍",visible:t.blindChooseDetailDialogVisible,width:"90%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.blindChooseDetailDialogVisible=e}}},[n("el-row",{staticClass:"dialog-detail"},[n("el-col",[t._v("1、"),n("span",[t._v("消耗200点造梦积分")]),t._v("，"),n("span",[t._v("100%")]),t._v("随机获得一张商品免费体验券。")]),n("el-col",[t._v("2、"),n("span",[t._v("所有可体验的商品")]),t._v("均在盲选范围内，包括珍贵商品。")]),n("el-col",[t._v("3、可使用"),n("span",[t._v("“免费盲选券”")]),t._v("进行盲选，不消耗造梦积分。")]),n("el-col",[t._v("4、随机选中的商品，选择不体验时可获得"),n("span",[t._v("能量值，满能量值可自由选择一张商品免费体验券")]),t._v("，不返还消耗的造梦积分和“免费盲选券”。")]),n("el-col",[t._v("5、使用商品免费体验券时，系统随机指定一个商品，可"),n("span",[t._v("体验4天")]),t._v("，"),n("span",[t._v("超出的时间")]),t._v("则直接从该商品的押金中"),n("span",[t._v("扣除一定的费用")]),t._v("（商品的每日体验价 X 超出天数）。")])],1)],1),n("el-dialog",{attrs:{title:"联盟福利",visible:t.unionAreaCountDialogVisible,width:"90%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.unionAreaCountDialogVisible=e}}},[n("el-row",{staticClass:"dialog-detail"},[n("el-col",[t._v("1、联盟成员可开启"),n("span",[t._v("联盟任务")]),t._v("。")]),n("el-col",[t._v("2、联盟成员完成普通任务获得的“造梦积分”均为"),n("span",[t._v("双倍")]),t._v("。")]),n("el-col",[t._v("3、联盟成员可"),n("span",[t._v("参与造梦积分抽奖")]),t._v("，"),n("a",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.oneYuanDetail.apply(void 0,arguments)}}},[t._v("查看详情")])]),n("el-col",[t._v("4、联盟成员可"),n("span",[t._v("参与造梦积分盲选")]),t._v("，"),n("a",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.BlindChooseDetail.apply(void 0,arguments)}}},[t._v("查看详情")])]),n("el-col",[t._v("5、联盟成员可参与“置换商品”竞拍，每月都会有一批商品进行"),n("span",[t._v("超低价竞拍")]),t._v("。")]),n("el-col",[t._v("6、联盟成员可体验、购买、竞拍"),n("span",[t._v("珍藏版和限量版商品")]),t._v("。")])],1)],1),n("el-dialog",{staticClass:"lucky-draw",attrs:{title:"",visible:t.luckyDraw.dialogVisible,width:"100%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.$set(t.luckyDraw,"dialogVisible",e)}}},[n("div",{staticClass:"bg-video"},[n("v-uni-video",{attrs:{src:i("76fa"),autoplay:!0,loop:!0,"object-fit":"fill"}})],1),n("el-row",{staticClass:"lucky-draw-content"},[n("el-col",[n("el-button",{attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.createLucky1(1)}}},[t._v("抽奖1次")]),n("el-button",{attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.createLucky1(10)}}},[t._v("抽奖10次")])],1)],1),n("div",{staticClass:"lucky-draw-results"})],1),n("el-dialog",{staticClass:"blind-choose",attrs:{title:"",visible:t.blindChoose.dialogVisible,width:"100%"},on:{"update:visible":function(e){arguments[0]=e=t.$handleEvent(e),t.$set(t.blindChoose,"dialogVisible",e)}}},[n("div",{staticClass:"bg-video"},[n("v-uni-video",{attrs:{src:i("76fa"),autoplay:!0,loop:!0,"object-fit":"fill"}})],1),n("el-row",{staticClass:"blind-choose-content"},[n("el-col",[n("el-button",{attrs:{plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.createBlindChoose(10)}}},[t._v("开始")])],1)],1),n("div",{staticClass:"blind-choose-results"})],1)],1)},s=[]}}]);