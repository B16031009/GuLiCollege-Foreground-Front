<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt"><span class="success-icon"></span><span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.out_trade_no}}</span>
        </h4>
        <span class="fr"><em class="sui-lead">应付金额：</em><em class="orange money">￥{{payObj.total_fee}}</em></span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫。</p>
          <div class="fl code">
            <!--使用vue-qriously组件在微信登录的时候生成二维码-->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>

          </div>

        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->

      </div>
    </div>
  </div>
</template>

<script>

  import orderApi from "@/api/order";

  export default {
    // 异步调用(只会调用一次，必须使用return返回)
    // params：相等于this.$route.params；error：错误信息
    asyncData({params, error}) {
      // params.orderNo中的orderNo是根据_orderNo.vue文件中的orderNo来的，毕竟那个orderNo代表路径中的动态信息
      return orderApi.generateWxQRCode(params.orderNo).then(response => {
        // 以下操作相当于在data(){return{}}中定义了order
        return {
          payObj: response.data.data // 包含了很多信息
        }
      })
    },
    data() {
      return {
        timer: '' // 用于清除定时器
      }
    },
    // 页面渲染完毕，每隔2秒，查询一次订单状态
    mounted() {
      // 判断二维码是否生成成功
      if (this.payObj.result_code === 'SUCCESS') {
        this.timer = setInterval(() => {
          this.queryOrderPayStatus()
        }, 2000)
      }
    },
    methods: {
      // 查询订单支付状态
      queryOrderPayStatus() {
        orderApi.queryPayStatus(this.payObj.out_trade_no).then(response => {
          // 如果支付完成，那就提示用户支付成功，然后回到课程详情页面
          if (response.data.data.payStatus) {
            // 清除定时器(如果不清除定时器，那就会一直去查询是否支付成功)
            clearInterval(this.timer)
            // 提示用户支付成功
            this.$message({
              type: 'success',
              message: '支付成功'
            })
            // 回到课程详情页面
            this.$router.push('/course/' + this.payObj.course_id)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
