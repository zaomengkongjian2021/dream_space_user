(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"6dd8":function(e,t,s){"use strict";s.r(t);var n=s("e375"),a=s("e404");for(var i in a)"default"!==i&&function(e){s.d(t,e,(function(){return a[e]}))}(i);var r,o=s("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"2ed5b6a7",null,!1,n["a"],r);t["default"]=u.exports},"9eaf":function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=e.database(),n={components:{},data:function(){return{userName:"",password:"",isLogin:!0,loading:!1}},onLoad:function(){},methods:{login:function(){var e=this,t=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,n=/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;this.userName?this.password?t.test(this.userName)?n.test(this.password)?(this.loading=!0,s.collection("user_list").where({phone:this.userName}).get().then((function(t){e.loading=!1;var s=t.result.data;s.length>0?e.$md5(e.password)==s[0].password?(sessionStorage.setItem("user",JSON.stringify(s[0])),e.$router.push("/pages/nav/nav")):e.$message.error("密码错误"):e.$message.error("用户不存在")})).catch((function(t){e.loading=!1,e.$message.error("登录失败")}))):this.$message.error("密码错误"):this.$message.error("用户不存在"):this.$message.error("密码不能为空"):this.$message.error("用户名不能为空")},openRegist:function(){this.$router.push("/pages/regist/regist")}}};t.default=n}).call(this,s("a9ff")["default"])},e375:function(e,t,s){"use strict";var n;s.d(t,"b",(function(){return a})),s.d(t,"c",(function(){return i})),s.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"content"},[e.isLogin?s("div",{staticClass:"login-box"},[s("div",{staticClass:"login-row"},[s("span",[e._v("用户名：")]),s("v-uni-input",{attrs:{type:"text",placeholder:"请输入手机号码"},model:{value:e.userName,callback:function(t){e.userName="string"===typeof t?t.trim():t},expression:"userName"}})],1),s("div",{staticClass:"login-row"},[s("span",[e._v("密"),s("i",{staticStyle:{opacity:"0"}},[e._v("密")]),e._v("码：")]),s("v-uni-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.password,callback:function(t){e.password="string"===typeof t?t.trim():t},expression:"password"}})],1),s("div",{staticClass:"login-row"},[s("v-uni-button",{staticClass:"login-btn",attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.login.apply(void 0,arguments)}}},[e._v("登 录")])],1),s("div",{staticClass:"login-row"},[s("a",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openRegist.apply(void 0,arguments)}}},[e._v("账号注册")])])]):e._e()])},i=[]},e404:function(e,t,s){"use strict";s.r(t);var n=s("9eaf"),a=s.n(n);for(var i in n)"default"!==i&&function(e){s.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a}}]);