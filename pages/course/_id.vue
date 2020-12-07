<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{courseFrontInfoVO.oneSubjectTitle}}</a>
        \
        <span class="c-333 fsize14">{{courseFrontInfoVO.twoSubjectTitle}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="courseFrontInfoVO.cover" :alt="courseFrontInfoVO.title" class="dis c-v-pic" width="100%"
                 height="357px">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24" :title="courseFrontInfoVO.title">{{courseFrontInfoVO.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">{{coursePrice(courseFrontInfoVO.price)}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{courseFrontInfoVO.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <section class="c-attr-mt">
              <a href="javascript:void(0);" @click.prevent="seeNow" class="comm-btn c-btn-3"
                 v-if="Number(courseFrontInfoVO.price) === 0">立即观看</a>
              <a href="javascript:void(0);" @click.prevent="buyNow" class="comm-btn c-btn-3"
                 v-if="Number(courseFrontInfoVO.price) !== 0 && !isBuy">立即购买</a>
              <a href="javascript:void(0);" @click.prevent="seeNow" class="comm-btn c-btn-3"
                 v-if="Number(courseFrontInfoVO.price) !== 0 && isBuy">已购买</a>
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseFrontInfoVO.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseFrontInfoVO.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{courseFrontInfoVO.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body" v-html="courseFrontInfoVO.description">
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in chapterAndVideoList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <!--video.videoSourceId传过去的目的是找到视频并播放；courseFrontInfoVO.id传过去的目的是通过课程id找到课程封面当做视频播放之前的封面-->
                                <!--本课程免费观看-->
                                <a href="javascript:void(0);"
                                   target="_blank"
                                   @click.prevent="toSee(video.videoSourceId,courseFrontInfoVO.id,video.id)"
                                   v-if="Number(courseFrontInfoVO.price) === 0">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费观看</i>
                                  </span>
                                </a>
                                <!--部分章节免费试听，并且用户没有购买课程-->
                                <a href="javascript:void(0);"
                                   target="_blank"
                                   @click.prevent="toSee(video.videoSourceId,courseFrontInfoVO.id,video.id)"
                                   v-if="Number(courseFrontInfoVO.price) !== 0 && Number(video.isFree) === 1 && !isBuy">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                </a>
                                <!--部分章节需要购买才能观看，并且用户没有购买课程-->
                                <a href="javascript:void(0);"
                                   target="_blank"
                                   @click.prevent="buyNow"
                                   v-if="Number(video.isFree) === 0 && !isBuy">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  <span class="fr">
                                    <i class="free-icon vam mr10">购买课程</i>
                                  </span>
                                </a>
                                <!--课程需要付费，但是用户已经购买该课程-->
                                <a href="javascript:void(0);"
                                   @click.prevent="toSee(video.videoSourceId,courseFrontInfoVO.id,video.id)"
                                   target="_blank"
                                   v-if="isBuy">
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                                  <span class="fr">
                                    <i class="free-icon vam mr10">点击观看</i>
                                  </span>
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a :href="'/teacher/'+courseFrontInfoVO.teacherId">
                        <img :src="courseFrontInfoVO.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'/teacher/'+courseFrontInfoVO.teacherId">{{courseFrontInfoVO.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{courseFrontInfoVO.intro}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <!--评论功能开始-->
    <div class="mt50 commentHtml">
      <div>
        <h6 class="c-c-content c-infor-title" id="i-art-comment">
          <span class="commentTitle">课程评论</span>
        </h6>
        <!--发表评论-->
        <p style="font-size: 15px;line-height: 30px;text-align: center;color:red;" v-if="!userInfo.id">
          注意：只有登录之后才能发表评论，<a href="/login">点我去登陆</a></p>
        <section class="lh-bj-list pr mt20 replyhtml" v-if="userInfo.id">
          <ul>
            <li class="unBr">
              <aside class="noter-pic">
                <img width="50" height="50" class="picImg" :src="userInfo.avatar">
              </aside>
              <div class="of">
                <section class="n-reply-wrap">
                  <fieldset>
                    <textarea name="" v-model.trim="comment.content" placeholder="输入您要评论的文字"
                              id="commentContent"></textarea>
                  </fieldset>
                  <p class="of mt5 tar pl10 pr10">
                    <span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
                    <el-button type="primary" @click="addComment" round>发表</el-button>
                  </p>
                </section>
              </div>
            </li>
          </ul>
        </section>
        <!--评论列表-->
        <section class="">
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment,index) in data.records" :key="index">
                <aside class="noter-pic">
                  <img width="50" height="50" class="picImg" :src="comment.avatar"/>
                </aside>
                <div class="of">
                    <span class="fl">
                      <font class="fsize12 c-999 ml5">#{{(data.current-1)*size+index+1}}楼&nbsp;</font>
                      <font class="fsize12 c-999 ml5">{{comment.gmtCreate}}&nbsp;</font>
                      <font class="fsize12 c-blue">{{comment.nickname}}</font>
                    </span>
                </div>
                <div class="noter-txt mt5">
                  <p>{{comment.content}}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"><font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font></span>
                </div>
              </li>

            </ul>
          </section>
        </section>

        <!-- 公共分页 开始 -->
        <div v-if="data.total">
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="首页"
              @click.prevent="goToPage(1)">首</a>
            <a
              :class="{undisable: !data.hasPrevious}"
              href="#"
              title="前一页"
              @click.prevent="goToPage(data.current-1)">&lt;</a>
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{current: data.current === page, undisable: data.current === page}"
              :title="'第'+page+'页'"
              href="#"
              @click.prevent="goToPage(page)">{{ page }}</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="后一页"
              @click.prevent="goToPage(data.current+1)">&gt;</a>
            <a
              :class="{undisable: !data.hasNext}"
              href="#"
              title="末页"
              @click.prevent="goToPage(data.pages)">末</a>
            <div class="clear"/>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </div>
    </div>
    <!--评论功能结束-->
  </div>
</template>

<script>
  // 用于操作cookie，需要使用npm install js-cookie命令安装js-cookie插件
  import cookie from 'js-cookie'
  import courseApi from "@/api/course";
  import commentApi from "@/api/comment";
  import orderApi from "@/api/order";
  import videoApi from "@/api/video";

  export default {
    computed: {
      // 课程价格的计算属性
      coursePrice() {
        return function (price) {
          return price > 0 ? '￥' + price : '免费'
        }
      }
    },
    data() {
      return {
        data: {}, // 评论列表相关内容
        size: 4, // 单页显示评论数目
        comment: {}, // 当前评论
        userInfo: {}, // 用户信息
        chapterAndVideoList: [], // 章节和小节
        courseFrontInfoVO: {}, // 课程信息(包括课程、课程描述、讲师等)
        courseId: this.$route.params.id, // 课程id
        isBuy: false // 是否购买该课程
      }
    },
    // 由于使用nuxt框架，所以created会执行两次，因此后台也会接收到两次请求，因此课程浏览次数也会增加两次，见：https://blog.csdn.net/weixin_42326144/article/details/107162098，但是也无法解决，我才去的是比较折中的办法，我在进入这个课程之前就已经将课程的浏览器加1，所以不会出现两次加1的问题
    created() {
      // 初始化课程相关信息
      this.initCourse()
      // 初始化评论相关信息
      this.initComment()
    },
    methods: {
      // 初始化课程相关信息
      initCourse() {
        courseApi.getCourseInfoById(this.courseId).then(response => {
          this.chapterAndVideoList = response.data.data.chapterAndVideoList // 章节和小节
          this.courseFrontInfoVO = response.data.data.courseFrontInfoVO // 课程信息(包括课程、课程描述、讲师等)
          this.isBuy = response.data.data.isBuy // 是否购买该课程
        })
      },
      // 初始化评论信息
      initComment() {
        // 获取评论相关数据
        this.getCommentData()
        // 给comment赋值
        this.setComment()
      },
      // 获取评论相关数据
      getCommentData() {
        commentApi.getCommentInfoListById(this.courseId, 1, this.size).then(response => {
          this.data = response.data.data
        })
      },
      // 给comment赋值
      setComment() {
        // 获得用户信息的json格式的字符串
        let jsonUserInfo = cookie.get("guli_userInfo");
        // 如果用户已经登录，那就把json格式字符串变成用户对象
        if (jsonUserInfo) {
          // 将JSon格式的字符串变成json格式的对象
          this.userInfo = JSON.parse(jsonUserInfo)
          // 把用户信息赋值给评论
          this.comment.memberId = this.userInfo.id
          this.comment.nickname = this.userInfo.nickname
          this.comment.avatar = this.userInfo.avatar

          // 把其他信息赋值给评论
          this.comment.courseId = this.courseId
          this.comment.teacherId = this.courseFrontInfoVO.teacherId
        }
      },
      // 评论列表分页切换(expectPage代表期待到这一页)
      goToPage(expectPage) {
        // 虽然使用class:undisable控制了图标样式，但是无法控制点击事件，所以当expectPage<1或者expectPage>总页数的时候还会触发事件，所以我们在这个地方限制只可以访问第1页到最后1页之间的数据
        if (expectPage >= 1 && expectPage <= this.data.pages) {
          commentApi.getCommentInfoListById(this.courseId, expectPage, this.size).then(response => {
            this.data = response.data.data
          })
        }
      },
      // 添加评论
      addComment() {
        if (this.comment.content && this.comment.content.length >= 5) {
          commentApi.addComment(this.comment).then(response => {
            // 提示用户评论发表成功
            this.$message({
              type: 'success',
              message: '发表成功'
            })
            // 刷新评论数据
            this.getCommentData()
            // 清除输入框中的评论信息
            this.comment.content = ''
          })
        } else {
          // 提示用户注册成功
          this.$message({
            type: 'warning',
            message: '评论字数不能少于5个'
          })
        }
      },
      // 点击 立即观看
      seeNow() {
        // 判断是否登录
        if (!this.userInfo.id) {
          this.$message({
            type: 'success',
            message: '登录之后才可以观看呢！'
          })
          // 跳转到登录页面
          this.$router.push("/login")
        } else {
          // 提示用户可以观看
          this.$message({
            type: 'success',
            message: '请在课程大纲下选择合适章节观看'
          })
        }
      },
      // 点击 立即购买
      buyNow() {
        // 判断是否登录
        if (!this.userInfo.id) {
          this.$message({
            type: 'success',
            message: '登录之后才可以购买呢！'
          })
          // 跳转到登录页面
          this.$router.push("/login")
          // 虽然上面可以跳转页面，但是还会执行下面的if判断
          return
        }

        // 如果已经登录，但是没有购买课程，点击立即购买之后进入购买界面
        if (!this.isBuy) {
          orderApi.addOrder(this.courseId).then(response => {
            // 点击购买之后生成订单，在这里获得订单号之后进入订单支付页面
            this.$router.push('/order/' + response.data.data.orderNo)
          })
        }
      },
      // 点击免费试听或者付费观看，如果付费观看肯定已经登录了，this.userInfo.id肯定有值，所以之后执行else
      toSee(videoSourceId, courseId, videoId) {
        // 判断是否登录（仅仅是免费试听的时候会进入下面）
        if (!this.userInfo.id) {
          this.$message({
            type: 'success',
            message: '登录之后才可以免费试听呢！'
          })
          // 跳转到登录页面
          this.$router.push("/login")
        } else {
          // 我把videoId传过来的目的是增加该小节的播放次数，原来想在_vid.vue中的created(){}中去增加就可以了，不过nuxt.js会执行两次created(){}，所以我们在进入视频播放页之前就添加了该视频的播放次数
          videoApi.addVideoPlayCount(videoId).then(response => {
            // 打开新的播放窗口，进行免费试听
            let newWindow = window.open('_blank')
            newWindow.location = '/video/' + videoSourceId + '?courseId=' + courseId
          })
        }
      }
    }
  }
</script>
