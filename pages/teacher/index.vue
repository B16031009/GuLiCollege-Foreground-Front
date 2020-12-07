<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total===0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-else>
            <ul class="of">
              <li v-for="teacher in data.records" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" :alt="teacher.name">
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank"
                       class="fsize18 c-666">{{teacher.name}}</a>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
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
    <!-- /讲师列表 结束 -->
  </div>
</template>

<script>

  import teacherApi from "@/api/teacher";

  export default {
    // 异步调用(只会调用一次，必须使用return返回)
    // params：相等于this.$route.params；error：错误信息
    asyncData({params, error}) {
      // 1代表当前页码，8代表每页显示的记录数，不能使用在data(){ return{ XXX } }中定义的current和size
      return teacherApi.getTeacherList(1, 8).then(response => {
        // 下面这种写法相等于在data(){ return{ XXX } }中定义data: {}，然后在执行this.data = response.data.data
        return {
          data: response.data.data
        }
      })
    },
    methods: {
      // 分页切换(expectPage代表期待页)
      goToPage(expectPage) {
        // 虽然使用class:undisable控制了图标样式，但是无法控制点击事件，所以当expectPage<1或者expectPage>总页数的时候还会触发事件，所以我们在这个地方限制只可以访问第1页到最后1页之间的数据
        if (expectPage >= 1 && expectPage <= this.data.pages) {
          teacherApi.getTeacherList(expectPage, 8).then(response => {
            // 在异步调用中相当于已经在data(){return{}}中定义了data
            this.data = response.data.data
          })
        }
      }
    }
  };
</script>
