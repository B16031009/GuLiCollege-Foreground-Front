import request from '@/utils/request'

export default {
  // 1、根据课程id分页查询评论信息
  getCommentInfoListById(courseId, current, size) {
    return request({
      url: `/eduservice/commentfront/pageComment/${courseId}/${current}/${size}`,
      method: 'get'
    })
  },
  // 2、添加评论
  addComment(comment) {
    return request({
      url: '/eduservice/commentfront/addComment',
      method: 'post',
      data: comment
    })
  }
}
