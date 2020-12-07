<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="{current: allShow}">
                  <a title="全部" href="#" @click.prevent="allCourseClick">全部</a>
                </li>
                <li v-for="(oneSubject,index) in oneSubjectList" :key="index"
                    :class="{current: courseQueryVO.subjectParentId===oneSubject.id}">
                  <a :title="oneSubject.title" href="#" @click.prevent="oneSubjectClick(oneSubject.id,index)">{{oneSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(twoSubject,index) in twoSubjectList" :key="index"
                    :class="{current: courseQueryVO.subjectId===twoSubject.id}">
                  <a :title="twoSubject.title" href="#" @click.prevent="twoSubjectClick(twoSubject.id)">{{twoSubject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li
                :class="{'current': courseQueryVO.buyCountSort==='1', 'bg-orange': courseQueryVO.buyCountSort==='1'}">
                <a title="关注度" href="#" @click.prevent="order('buyCountSort')">关注度&nbsp;
                  <span v-if="courseQueryVO.buyCountSort==='1'">↓</span>
                </a>
              </li>
              <li
                :class="{'current': courseQueryVO.gmtCreateSort==='1', 'bg-orange': courseQueryVO.gmtCreateSort==='1'}">
                <a title="最新" href="#" @click.prevent="order('gmtCreateSort')">最新&nbsp;
                  <span v-if="courseQueryVO.gmtCreateSort==='1'">↓</span>
                </a>
              </li>
              <li
                :class="{'current': courseQueryVO.priceSort==='1', 'bg-orange': courseQueryVO.priceSort==='1'}">
                <a title="价格" href="#" @click.prevent="order('priceSort')">价格&nbsp;
                  <span v-if="courseQueryVO.priceSort==='1'">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total > 0">
            <ul class="of" id="bna">
              <li v-for="course in data.records" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title">
                    <div class="cc-mask">
                      <a href="javascript:void(0);" @click="goCourse(course.id)" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a href="javascript:void(0);" @click="goCourse(course.id)" :title="course.title"
                       class="course-title fsize18 c-333">{{course.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{coursePrice(Number(course.price))}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                        |
                        <i class="c-999 f-fA">{{course.viewCount}}浏览</i>
                      </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
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
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>

  import courseApi from "@/api/course";

  export default {
    data() {
      return {
        size: 8,
        data: {}, // 课程信息(包含课程列表、总页数等等)
        oneSubjectList: [], // 一级分类列表
        twoSubjectList: [], // 二级分类列表
        courseQueryVO: {
          gmtCreateSort: '1' // 默认按照 最新 进行排序
        }, // 课程查询条件封装对象
        allShow: true // 是否展示所有课程
      }
    },
    created() {
      // 初始化一级分类
      this.initSubSubjectList()
      // 初始化课程信息
      this.initData()
    },
    methods: {
      // 初始化一级分类
      initSubSubjectList() {
        courseApi.getAllSubject().then(response => {
          this.oneSubjectList = response.data.data.list
        })
      },
      // 初始化课程信息
      initData() {
        courseApi.getCourseList(1, this.size, this.courseQueryVO).then(response => {
          this.data = response.data.data
        })
      },
      // 分页切换(expectPage代表期待到这一页)
      goToPage(expectPage) {
        // 虽然使用class:undisable控制了图标样式，但是无法控制点击事件，所以当expectPage<1或者expectPage>总页数的时候还会触发事件，所以我们在这个地方限制只可以访问第1页到最后1页之间的数据
        if (expectPage >= 1 && expectPage <= this.data.pages) {
          courseApi.getCourseList(expectPage, this.size, this.courseQueryVO).then(response => {
            // 在异步调用中相当于已经在data(){return{}}中定义了data
            this.data = response.data.data
          })
        }
      },
      // 点击一级分类
      oneSubjectClick(subjectParentId, index) {
        // 不展示所有课程
        this.allShow = false
        // 把一级分类id设置进课程查询封装对象
        this.courseQueryVO.subjectParentId = subjectParentId
        // 清除课程查询封装对象中的二级分类id
        this.courseQueryVO.subjectId = ''
        // 展示二级分类列表
        this.twoSubjectList = this.oneSubjectList[index].children
        // 根据条件初始化课程信息
        this.initData()
      },
      // 点击二级分类
      twoSubjectClick(subjectId) {
        // 不展示所有课程
        this.allShow = false
        // 把二级分类id设置进课程查询封装对象
        this.courseQueryVO.subjectId = subjectId
        // 根据条件初始化课程信息
        this.initData()
      },
      // 点击所有分类课程
      allCourseClick() {
        // 展示所有课程
        this.allShow = true
        // 清除课程查询封装对象中的一级分类id
        this.courseQueryVO.subjectParentId = ''
        // 清除课程查询封装对象中的二级分类id
        this.courseQueryVO.subjectId = ''
        // 清空二级分类列表
        this.twoSubjectList = []
        // 根据条件初始化课程信息
        this.initData()
      },
      // 根据关注度、最新、价格之一进行排序
      order(sortName) {
        // 选择 关注度 排序
        if (sortName === 'buyCountSort') {
          this.courseQueryVO.buyCountSort = '1'
          this.courseQueryVO.gmtCreateSort = ''
          this.courseQueryVO.priceSort = ''
        }
        // 选择 最新 排序
        else if (sortName === 'gmtCreateSort') {
          this.courseQueryVO.buyCountSort = ''
          this.courseQueryVO.gmtCreateSort = '1'
          this.courseQueryVO.priceSort = ''
        }
        // 选择 价格 排序
        else {
          this.courseQueryVO.buyCountSort = ''
          this.courseQueryVO.gmtCreateSort = ''
          this.courseQueryVO.priceSort = '1'
        }
        // 根据条件初始化课程信息
        this.initData()
      },
      // 进入课程详情页面（我这样做的目的：其实我之前准备在进入课程详情页之后去通过created(){}中的代码操作后端更新课程浏览数量的，但是nuxt.js框架会执行两次created(){}，所以我才把在进入课程详情页之前通过这个方法来更新课程浏览量）
      goCourse(courseId) {
        // 增加课程浏览量
        courseApi.addCourseViewCount(courseId).then(response => {
          // 进入课程详情页面
          this.$router.push('/course/' + courseId)
        })
      }
    },
    computed: {
      coursePrice() {
        return function (price) {
          return price > 0 ? '￥' + price : '免费'
        }
      }
    }
  };
</script>
