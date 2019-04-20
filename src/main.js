import Vue from 'vue'
import App from './App'
import router from './router'
/* 依赖配置好的axios */
import axios from './http'
/* 依赖全局样式文件 */
import './assets/css/global.css'
/* 依赖矢量图图标文件 */
import './assets/fonts/iconfont.css'

/* 依赖Element */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 将登录页输入框变小 */
Vue.use(ElementUI, {size: 'small'})

/* 挂载 */
Vue.prototype.$http = axios
Vue.config.productionTip = false

/* 入口文件的作用:导入其他依赖 */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
