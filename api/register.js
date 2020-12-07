import request from '@/utils/request'

export default {
  // 1、根据手机号发送验证码
  sendCode(phone) {
    return request({
      url: '/edusms/message/send/'+phone,
      method: 'get'
    })
  },
  // 2、用户注册
  register(registerVO) {
    return request({
      url: '/ucenterservice/member/register',
      method: 'post',
      data: registerVO
    })
  }
}
