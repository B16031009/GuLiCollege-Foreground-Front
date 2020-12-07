import request from '@/utils/request'

export default {
  // 1、查询前8个热门课程和前4名讲师
  getCourseAndTeacher() {
    return request({
      url: '/eduservice/indexfront/getCourseAndTeacher',
      method: 'get'
    })
  }
}
