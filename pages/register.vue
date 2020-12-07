<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="registerVO">

        <el-form-item class="input-prepend restyle" prop="nickname"
                      :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
          <div>
            <el-input type="text" placeholder="你的昵称" v-model="registerVO.nickname"/>
            <i class="iconfont icon-user"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="mobile"
                      :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          <div>
            <el-input type="text" placeholder="手机号" v-model="registerVO.mobile"/>
            <i class="iconfont icon-phone"/>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend restyle no-radius" prop="code"
                      :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
          <div style="width: 100%;display: block;float: left;position: relative">
            <el-input type="text" placeholder="验证码" v-model="registerVO.code"/>
            <i class="iconfont icon-phone"/>
          </div>
          <div class="btn" style="position:absolute;right: 0;top: 6px;width: 40%;">
            <a href="javascript:" type="button" @click="getMobileCode" :value="codeTest" style="border: none;">{{codeTest}}</a>
          </div>
        </el-form-item>

        <el-form-item class="input-prepend" prop="password"
                      :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <div>
            <el-input type="password" placeholder="设置密码" v-model="registerVO.password"/>
            <i class="iconfont icon-password"/>
          </div>
        </el-form-item>

        <div class="btn">
          <input type="button" class="sign-up-button" value="注册" @click="userRegister">
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>

  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import registerApi from "@/api/register";

  export default {
    layout: 'sign', // 使用layouts下面的sing.vue当做布局
    data() {
      return {
        // 用户注册信息
        registerVO: {
          mobile: '', // 手机号码
          code: '', // 验证码
          nickname: '', // 昵称
          password: '' // 密码
        },
        sending: true, // 是否可以发送验证码，当点击 获取验证码 之后不可以再次发送
        second: 60, // 存储倒计时
        codeTest: '获取验证码' // 获取验证码按钮上显示的文字
      }
    },
    methods: {
      // 用户注册
      userRegister() {
        registerApi.register(this.registerVO).then(response => {
          // 提示用户注册成功
          this.$message({
            type: 'success',
            message: '注册成功'
          })
          // 跳到登录界面
          this.$router.push('/login')
        })
      },
      // 获取手机验证码
      getMobileCode() {
        // 判断是否刚刚发送了手机验证码，如果已经发送了就直接返回
        if (!this.sending) return;

        // 获取手机验证码
        registerApi.sendCode(this.registerVO.mobile).then(response => {

          // 不可以再次发送
          this.sending = false
          // 进行倒计时
          this.timeDown()
        })
      },
      // 倒计时操作
      timeDown() {
        let result = setInterval(() => {
          this.codeTest = this.second + 's' // 改变时间
          this.second-- // 让秒数递减
          if (this.second < 1) {
            clearInterval(result);
            this.sending = true;
            //this.disabled = false;
            this.second = 60;
            this.codeTest = "获取验证码"
          }
        }, 1000);
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
