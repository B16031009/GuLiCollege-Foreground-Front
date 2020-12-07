<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css">
    <!-- 阿里云视频播放器脚本 -->
    <script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"/>

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player"/>
  </div>
</template>

<script>

  import videoApi from "@/api/video";
  import courseApi from "@/api/course";

  export default {
    layout: 'player', // 不使用默认模板default.vue，使用player.vue作为模板
    // 注意：异步调用的方式无法使用axios拦截器，即使使用js-cookie往video.js中的getPlayAuth()方法中的headers中放token也是失败的，失败提示信息是token无效，说明没用使用js-cookie中的cookie工具找到token信息，所以我们依然使用原始方式进行调用getPlayAuth()方法
    // 异步调用(只会调用一次，必须使用return返回)
    // params：相等于this.$route.params；error：错误信息
    /*asyncData({params, error}) {
      // params.vid中的vid是根据_vid.vue文件中的vid来的，毕竟那个vid代表路径中的动态信息
      return videoApi.getPlayAuth(params.vid).then(response => {
        // 以下操作相当于在data(){return{}}中定义了teacher和courseList
        return {
          vid: params.vid, // 阿里云上的视频id
          playAuth: response.data.data.playAuth // 上述视频的视频播放凭证
        }
      })
    },*/
    data() {
      return {
        vid: '', // 阿里云上存储的视频ID
        playAuth: '' // 上述视频的视频播放凭证
      }
    },
    created() {
      // 阿里云上的视频id
      this.vid = this.$route.params.vid

      // 获取视频播放凭证
      this.getPlayAuthByVid()
    },
    methods: {
      // 获取视频播放凭证
      getPlayAuthByVid() {
        videoApi.getPlayAuth(this.vid).then(response => {
          this.playAuth = response.data.data.playAuth // 上述视频的视频播放凭证
        })
      },
      // 根据课程id获得该课程详细信息，然后拿课程封面当做视频播放之前的封面
      getCourseByCourseId() {
        courseApi.getOneCourseByCourseId(this.$route.query.courseId).then(response => {
          // 开启阿里播放器，放在该方法中的目的是使用返回值中的cover
          new Aliplayer({
            "id": "J_prismPlayer", // 定义播放器div的id
            "width": "100%", // 视频宽度
            "height": "500px", // 视频高度
            "autoplay": false, // 自动播放
            "isLive": false, // 直播
            "cover": response.data.data.course.cover, // 把课程封面当做视频播放之前的封面
            "rePlay": false, // 循环播放
            "playsinline": true,
            "preload": false, // 自动加载
            "language": "zh-cn", // 语言
            "controlBarVisibility": "hover", // 控制条显示方式
            "useH5Prism": true, // 播放器类型: html5
            "encryptType": '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
            "vid": this.vid, // 视频id
            "playauth": this.playAuth, // 播放凭证，注意：播放凭证是有时效性的（默认100秒），只有在拿到播放凭证的100秒内才能使用阿里云播放器播放该视频，另外即使拿到视频播放地址也是没有用的，因为这个视频播放地址是私密的，无法播放，以及你下载的视频都是加密视频无法播放
          }, function (player) {
            console.log('播放器创建成功')
          })
        })
      }
    },
    /**
     * 页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用
     * 如果在created生命周期函数中使用，Aliplayer is not defined错误
     */
    mounted() {
      // 根据课程id获得该课程详细信息
      this.getCourseByCourseId()
    }
  }
</script>

<style scoped>

</style>
