import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' //Element 组件内部默认使用中文，若希望使用其他语言，则需要进行多语言设置
import App from './App'
import router from './router'
import '@/icons' // icon
import '@/styles/index.scss' // global css


Vue.config.productionTip = false

Vue.use(ElementUI,{ locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
