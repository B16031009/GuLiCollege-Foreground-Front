<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="member">

        <el-form-item class="input-prepend restyle" prop="mobile"
                      :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="member.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="密码" v-model="member.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-in-button" value="登录" @click="userLogin">
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <!--使用nginx的时候使用-->
            <!--<a id="weixin" class="weixin" target="_blank"
                 href="http://localhost:9001/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a>-->
            <!--使用gitway网关的时候使用-->
            <a id="weixin" class="weixin" target="_blank"
               href="http://localhost:8222/api/ucenter/wx/login">
              <i class="iconfont icon-weixin"/>
            </a>
          </li>
          <!--没有使用QQ登录，暂时注释-->
          <!--<li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>-->
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  // 用于操作cookie，需要使用npm install js-cookie命令安装js-cookie插件
  import cookie from 'js-cookie'

  import loginApi from "@/api/login"

  export default {
    layout: 'sign', // 不使用默认模板default.vue，使用sign.vue作为模板
    data() {
      return {
        // 封装登录的手机号和密码
        member: {
          mobile: '',
          password: ''
        }
      }
    },
    methods: {
      // 用户登录
      userLogin() {
        loginApi.login(this.member).then(response => {

          // 把token值放入cookie中(domain后面的localhost代表在同一个ip下都可以使用该cookie)
          cookie.set('guli_token', response.data.data.token, {domain: 'localhost'})

          // 根据token值去获取用户信息
          loginApi.getMemberInfo().then(response => {
            // 把获取的用户信息也放在cookie中，其中response.data.data.member是一个对象，但是往cookie中一放就变成了json格式字符串
            cookie.set('guli_userInfo', response.data.data.member, {domain: 'localhost'})
          })

          // 跳转到网站首页
          window.location.href = '/'
        })
      },
      // 检查手机号是否正确
      checkPhone(rule, value, callback) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      }
    }
  }
</script>
<style>
  .el-form-item__error {
    z-index: 9999999;
  }
</style>
