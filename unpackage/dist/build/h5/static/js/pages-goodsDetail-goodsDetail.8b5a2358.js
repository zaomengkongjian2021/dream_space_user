(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goodsDetail-goodsDetail"],{"0480":function(t,a,s){"use strict";s.r(a);var e=s("2654"),o=s.n(e);for(var n in e)"default"!==n&&function(t){s.d(a,t,(function(){return e[t]}))}(n);a["default"]=o.a},2654:function(t,a,s){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=t.database(),e={data:function(){return{indicatorDots:!0,autoplay:!1,interval:2e3,duration:500,goodsId:"",loading:!1,goodsData:{img:[]}}},methods:{getGoodsDetail:function(){var t=this;this.loading=!0,s.collection("goods").where({_id:this.goodsId}).get().then((function(a){t.loading=!1,a.result.data.length>0&&(t.goodsData=a.result.data[0])})).catch((function(a){t.loading=!1,t.$message.error("服务器错误")}))}},created:function(){this.goodsId=this.$route.query.id,this.getGoodsDetail()},watch:{$route:function(){this.goodsId=this.$route.query.id,this.getGoodsDetail()}}};a.default=e}).call(this,s("a9ff")["default"])},aafe:function(t,a,s){"use strict";var e;s.d(a,"b",(function(){return o})),s.d(a,"c",(function(){return n})),s.d(a,"a",(function(){return e}));var o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-uni-view",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticClass:"goods-detail"},[s("v-uni-view",{staticClass:"detail-content"},[s("v-uni-view",{staticClass:"uni-padding-wrap"},[s("v-uni-view",{staticClass:"page-section swiper"},[s("v-uni-view",{staticClass:"page-section-spacing"},[s("v-uni-swiper",{staticClass:"swiper",attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,interval:t.interval,duration:t.duration}},t._l(t.goodsData.img,(function(t,a){return s("v-uni-swiper-item",[s("v-uni-view",[s("img",{attrs:{src:t,alt:""}})])],1)})),1)],1)],1)],1),s("p",{staticClass:"detail-title"},[t._v(t._s(t.goodsData.name))]),s("p",{staticClass:"detail-describe"},[t._v(t._s(t.goodsData.describe))]),s("el-row",{staticClass:"type-lable"},t._l(t.goodsData.lable,(function(a,e){return s("el-button",{attrs:{type:"info",round:!0}},[t._v(t._s(a))])})),1),s("el-row",{staticClass:"detail-message"},[s("el-col",{attrs:{span:24}},[s("span",[t._v("专柜价格：")]),s("span",{staticStyle:{color:"#d01012"}},[t._v(t._s("￥"+t.goodsData.prich))])]),s("el-col",{attrs:{span:24}},[s("span",[t._v("体验价：")]),s("span",{staticStyle:{color:"#80e010"}},[t._v(t._s("￥"+t.goodsData.rent+"/次+￥"+t.goodsData.every_day_rent+"/日"))]),s("span",[t._v("（联盟成员八折优惠）")])]),s("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[s("span",[t._v("押金：")]),s("span",{staticStyle:{color:"#ffc107"}},[t._v(t._s("￥"+parseInt(.95*t.goodsData.prich)))]),s("span",[t._v("（购买价 = 押金）")])]),s("el-col",{attrs:{span:12}},[s("span",[t._v("适合年龄：")]),s("span",[t._v(t._s(t.goodsData.age))])]),s("el-col",{attrs:{span:12}},[s("span",[t._v("颗粒数：")]),s("span",[t._v(t._s(t.goodsData.particles))])]),s("el-col",{attrs:{span:12}},[s("span",[t._v("发行年份：")]),s("span",[t._v(t._s(t.goodsData.issue_year+"年"))])]),s("el-col",{attrs:{span:12}},[s("el-button",{staticClass:"add-union"},[t._v("加入联盟")])],1)],1)],1),s("el-row",{staticClass:"bottom-btn"},[s("el-col",{attrs:{span:12}},[s("el-button",{staticStyle:{background:"#fb6600",color:"#FFFFFF"}},[t._v("立即体验")])],1),s("el-col",{attrs:{span:12}},[s("el-button",[t._v("立即购买")])],1)],1)],1)},n=[]},cbfd:function(t,a,s){"use strict";s.r(a);var e=s("aafe"),o=s("0480");for(var n in o)"default"!==n&&function(t){s.d(a,t,(function(){return o[t]}))}(n);var i,l=s("f0c5"),r=Object(l["a"])(o["default"],e["b"],e["c"],!1,null,"35c829f6",null,!1,e["a"],i);a["default"]=r.exports}}]);