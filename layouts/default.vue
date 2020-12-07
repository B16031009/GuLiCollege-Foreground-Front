<template>
  <div class="in-wrap">

    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="/" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <!--<router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link>-->
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <!--未登录-->
            <li v-if="!userInfo.id" id="no-login">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <!--已登录-->
            <li v-if="userInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="userInfo.id" id="is-login-two" class="h-r-user">
              <a href="/ucenter" title>
                <img
                  :src="userInfo.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                >
                <span id="userName" class="vam disIb" style="text-overflow: ellipsis;white-space: nowrap;" :title="userInfo.nickname">{{ userInfo.nickname }}</span>
              </a>
              <a href="javascript:void(0);" title="退出" @click="logout" class="ml5">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <!-- 中间信息 -->
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank">尚硅谷</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                <span>Email：info@atguigu.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归谷粒学院所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->

  </div>
</template>

<script>
  import '~/assets/css/reset.css'
  import '~/assets/css/theme.css'
  import '~/assets/css/global.css'
  import '~/assets/css/web.css'
  import '~/assets/css/base.css'
  import '~/assets/css/activity_tab.css'
  import '~/assets/css/bottom_rec.css'
  import '~/assets/css/nice_select.css'
  import '~/assets/css/order.css'
  import '~/assets/css/swiper-3.3.1.min.css'
  import "~/assets/css/pages-weixinpay.css"

  // 用于操作cookie，需要使用npm install js-cookie命令安装js-cookie插件
  import cookie from 'js-cookie'

  import loginApi from "@/api/login";

  export default {
    data() {
      return {
        // 当前用户信息
        userInfo: {
          id: '',
          age: '',
          avatar: '',
          mobile: '',
          nickname: '',
          sex: ''
        }
      }
    },
    methods: {
      // 展示用户信息
      showUserInfo() {
        // 获得用户信息的json格式的字符串
        let jsonUserInfo = cookie.get("guli_userInfo");
        // 获得用户信息对象
        if (jsonUserInfo) {
          // 将JSon格式的字符串变成json格式的对象
          this.userInfo = JSON.parse(jsonUserInfo)
        }
      },
      // 退出登录
      logout() {
        // 清空cookie中的guli_token和guli_userInfo
        cookie.set('guli_token', '', {domain: 'localhost'})
        cookie.set('guli_userInfo', '', {domain: 'localhost'})
        // 回到网站首页
        window.location.href = '/'
      },
      // 如果路径中有token，说明是微信登录，那就先把token放在cookie中，之后在使用token获取用户信息
      getUserInfo() {
        // 判断路径中是否有token信息
        if (this.$route.query.token) {
          // 如果路径中有token信息，那就把token存如cookie中
          cookie.set('guli_token', this.$route.query.token, {domain: 'localhost'})
          // 根据token值去获取用户信息
          loginApi.getMemberInfo().then(response => {
            // 仅仅依靠showUserInfo()是不行的，showUserInfo()展示数据的时候可能cookie中还没有guli_userInfo
            this.userInfo = response.data.data.member
            // 把获取的用户信息也放在cookie中，其中response.data.data.member是一个对象，但是往cookie中一放就变成了json格式字符串
            cookie.set('guli_userInfo', response.data.data.member, {domain: 'localhost'})
          })
        }
      }
    },
    created() {
      // 微信登录：如果路径中有token，说明是微信登录，那就先把token放在cookie中，之后在使用token获取用户信息
      this.getUserInfo()
      // 无论是微信登录(上面的getUserInfo()方法)还是普通手机号和密码登录方式(login.vue中设置cookie中的值)都是需要展示用户信息的
      this.showUserInfo()
    }
  };
</script>
