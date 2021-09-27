(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-regist-regist"],{"2bd5":function(t,e,s){"use strict";var r;s.d(e,"b",(function(){return n})),s.d(e,"c",(function(){return a})),s.d(e,"a",(function(){return r}));var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"content"},[s("div",{staticClass:"regist-box"},[s("div",{staticClass:"regist-row"},[s("span",[t._v("用 户 名：")]),s("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机号码"},model:{value:t.userName,callback:function(e){t.userName="string"===typeof e?e.trim():e},expression:"userName"}})],1),s("div",{staticClass:"regist-row password-tips"},[s("span",[t._v("密"),s("i",{staticStyle:{opacity:"0"}},[t._v("密密")]),t._v("码：")]),s("v-uni-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password="string"===typeof e?e.trim():e},expression:"password"}})],1),s("div",{staticClass:"regist-row"},[s("span",[t._v("确认密码：")]),s("v-uni-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.surePassword,callback:function(e){t.surePassword="string"===typeof e?e.trim():e},expression:"surePassword"}})],1),s("div",{staticClass:"regist-row"},[s("span",[t._v("验 证 码：")]),s("v-uni-input",{attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.verCode,callback:function(e){t.verCode="string"===typeof e?e.trim():e},expression:"verCode"}}),s("v-uni-canvas",{style:{width:"100px",height:"30px",marginLeft:"10px"},attrs:{"canvas-id":"imgcanvas"},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.canvasIdErrorCallback.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.refresh.apply(void 0,arguments)}}})],1),s("div",{staticClass:"regist-row"},[s("v-uni-button",{staticClass:"regist-btn",attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.regist.apply(void 0,arguments)}}},[t._v("注册")])],1)])])},a=[]},"33a4":function(t,e,s){"use strict";s.r(e);var r=s("62d7"),n=s.n(r);for(var a in r)"default"!==a&&function(t){s.d(e,t,(function(){return r[t]}))}(a);e["default"]=n.a},"3a42":function(t,e,s){var r=s("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.password-tips[data-v-33708c04]:after{content:"请输入8~18位密码，必须由字母、数字组成，区分大小写";font-size:8px;color:#ddd;padding-left:80px}',""]),t.exports=e},"62d7":function(t,e,s){"use strict";(function(t){s("cb29"),s("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t.database(),n={data:function(){return{userName:"",password:"",surePassword:"",verCode:"",loading:!1}},methods:{regist:function(){var t=this,e=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,s=/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;this.userName?this.password?this.surePassword?e.test(this.userName)?s.test(this.password)?this.password==this.surePassword?4==this.verCode.length&&this.verCode.toLowerCase()==uni.getStorageSync("imgcode").toLowerCase()?(this.loading=!0,r.collection("user_list").where({phone:this.userName}).get().then((function(e){t.loading=!1,e.result.data.length<=0?t.save():t.$message.error("注册失败，账号已存在")})).catch((function(e){t.loading=!1,t.$message.error("注册失败，请重新注册")}))):this.$message.error("验证码不正确"):this.$message.error("两次输入的密码不一致"):this.$message.error("请正确填写密码"):this.$message.error("请正确填写手机号"):this.$message.error("请输入确认密码"):this.$message.error("密码不能为空"):this.$message.error("用户名不能为空")},save:function(){var t=this;this.loading=!0,r.collection("user_list").add({phone:this.userName,password:this.$md5(this.password),user_type:"visitor",union_count:0}).then((function(e){t.loading=!1,t.$message.success("注册成功"),t.$router.push("/pages/index/index")})).catch((function(e){t.loading=!1,t.$message.error("注册失败，请重新注册")}))},initCanvas:function(){console.log("start");var t=uni.createCanvasContext("imgcanvas",this),e=100,s=30;t.setFillStyle("white"),t.setLineWidth(5),t.fillRect(0,0,e,s);for(var r=["A","B","C","D","E","F","G","H","I","J","K","L","I","M","N","O","P","Q","R","S","T","U","V","W","S","Y","Z","1","2","3","4","5","6","7","8","9","0"],n="",a=0;a<4;a++){var i=r[this.rn(0,r.length-1)],o=this.rn(-30,30);t.setFontSize(18),t.setTextBaseline("top"),t.setFillStyle(this.rc(80,150)),t.save(),t.translate(26*a+15,parseInt(s/1.5)),t.rotate(o*Math.PI/180),t.fillText(i,-10,-15),t.restore(),n+=i}uni.setStorage({key:"imgcode",data:n});for(a=0;a<40;a++)t.beginPath(),t.arc(this.rn(0,e),this.rn(0,s),1,0,2*Math.PI),t.closePath(),t.setFillStyle(this.rc(150,200)),t.fill();t.draw(),console.log("end")},rn:function(t,e){return parseInt(Math.random()*(t-e))+e},rc:function(t,e){var s=this.rn(t,e),r=this.rn(t,e),n=this.rn(t,e);return"rgb("+s+","+r+","+n+")"},canvasIdErrorCallback:function(t){console.error(t.detail.errMsg)},refresh:function(){this.initCanvas()}},created:function(){},onShow:function(){var t=this;setTimeout((function(){t.initCanvas()}),1e3)}};e.default=n}).call(this,s("a9ff")["default"])},"6f42":function(t,e,s){"use strict";var r=s("7c10"),n=s.n(r);n.a},7023:function(t,e,s){"use strict";s.r(e);var r=s("2bd5"),n=s("33a4");for(var a in n)"default"!==a&&function(t){s.d(e,t,(function(){return n[t]}))}(a);s("6f42");var i,o=s("f0c5"),c=Object(o["a"])(n["default"],r["b"],r["c"],!1,null,"33708c04",null,!1,r["a"],i);e["default"]=c.exports},"7c10":function(t,e,s){var r=s("3a42");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var n=s("4f06").default;n("1be2bafc",r,!0,{sourceMap:!1,shadowMode:!1})}}]);