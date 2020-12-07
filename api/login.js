import request from '@/utils/request'

export default {
  // 1、获取用户登录之后返回的token,其中member是用户信息
  login(member) {
    return request({
      url: '/ucenterservice/member/login',
      method: 'post',
      data: member
    })
  },
  // 2、根据token获取用户信息
  getMemberInfo() {
    return request({
      url: '/ucenterservice/member/getMemberInfo',
      method: 'get'
    })
  }
}
