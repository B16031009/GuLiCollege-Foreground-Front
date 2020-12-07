import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
import VueQriously from 'vue-qriously'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

// 使用幻灯片插件
Vue.use(VueAwesomeSwiper)
//使用elementUI
Vue.use(ElementUI)
// 微信登录的时候生成二维码
Vue.use(VueQriously)
