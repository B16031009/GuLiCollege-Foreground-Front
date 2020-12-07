import request from '@/utils/request'

export default {
  // 1、分页查询课程信息(带条件)
  getCourseList(current, size, courseQueryVO) {
    return request({
      url: `/eduservice/coursefront/pageCourseCondition/${current}/${size}`,
      method: 'post',
      data: courseQueryVO
    })
  },
  // 2、按照要求获得所有分类，其中一级分类中包含着二级分类
  getAllSubject() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  },
  // 3、根据课程id查询课程详细信息，包括课程信息、评论信息、课程所属讲师信息、章节、小节等等
  getCourseInfoById(courseId) {
    return request({
      url: '/eduservice/coursefront/getCourseInfoById/' + courseId,
      method: 'get'
    })
  },
  // 4、根据课程id查询单个课程信息(pages下面的video下面的_vid.vue要用)
  getOneCourseByCourseId(courseId) {
    return request({
      url: '/eduservice/coursefront/getOneCourseByCourseId/' + courseId,
      method: 'get'
    })
  },
  // 增加课程浏览数量
  addCourseViewCount(courseId) {
    return request({
      url: '/eduservice/coursefront/addCourseViewCount/' + courseId,
      method: 'put'
    })
  }
}
