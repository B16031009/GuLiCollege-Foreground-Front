import axios from 'axios'
// element-ui中的消息提示
import {MessageBox, Message} from 'element-ui'
// 用于操作cookie，需要使用npm install js-cookie命令安装js-cookie插件
import cookie from 'js-cookie'

// 创建axios实例
const service = axios.create({
  // 使用nginx进行请求转发的时候可以用
  // baseURL: 'http://localhost:9001',
  // 使用gateway网关进行请求转发的时候需要用
  baseURL: 'http://localhost:8222',
  timeout: 5000 // 请求超时时间
})

// 创建axios请求拦截器
service.interceptors.request.use(
  config => {
    if (cookie.get('guli_token')) {
      // 让每个请求携带自定义token，请根据实际情况自行修改
      // 在login.vue中，我们把guli_token放入cookie中，然后在发送axios请求的时候在把guli_token放入请求头中的token中，element-ui官方的做法是使用store仓库中的getters来存储的，毕竟这个存储的也是全局要用的东西，这是两种思路，老师的这种不局限于vue，而element-ui官方局限于vue
      config.headers['token'] = cookie.get('guli_token');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data

    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 用户需要登录之后才能访问，这个和后端gateway中AuthGlobalFilter的配置有关
      if (res.code === 28004) {
        // 虽然会出现window is not defined，但是不影响执行，至于产生的原因，网上说是引入nuxt-swiper-plugin.js需要把ssr渲染设置成 false ，但是我们已经设置了，依然出现错误，没办法
        window.location.href="/login"
        return
      }

      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
