import request from '@/utils/request'

export default {
  // 1、分页查询讲师信息(不带条件)
  getTeacherList(current, size) {
    return request({
      url: `/eduservice/teacherfront/pageTeacher/${current}/${size}`,
      method: 'get'
    })
  },
  // 2、查询单个讲师详细信息和讲师所讲课程信息
  getTeacherAndCourseList(id) {
    return request({
      url: '/eduservice/teacherfront/getTeacher/' + id,
      method: 'get'
    })
  }
}
