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
// 全局获取缓存数据
Vue.prototype.setSessionStorage = function (key, newVal) {
	// 创建一个StorageEvent事件
	var newStorageEvent = document.createEvent('StorageEvent');
	const storage = {
		setItem: function (k, val) {
			sessionStorage.setItem(k, val);
			// 初始化创建的事件
			newStorageEvent.initStorageEvent(k+'Change', false, false, k, null, val, null, null);
			// 派发对象
			window.dispatchEvent(newStorageEvent)
		}
	}
	return storage.setItem(key, newVal);
}
Vue.prototype.getSessionStorage = function(key){
	return sessionStorage.getItem(key);
}
Vue.prototype.removeSessionStorage = function(key){
	return sessionStorage.removeItem(key);
}
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