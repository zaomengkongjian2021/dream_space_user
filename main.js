import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./scss/common.scss"
import md5 from "js-md5"
import $ from "jquery"
window.$ = $;
Vue.use(ElementUI)
Vue.prototype.$md5 = md5
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif