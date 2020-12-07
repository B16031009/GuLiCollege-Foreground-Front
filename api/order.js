import request from '@/utils/request'

export default {
  // 1、根据订单号查询订单信息
  getOrderInfo(orderNo) {
    return request({
      url: '/orderservice/order/getOrderInfo/' + orderNo,
      method: 'get'
    })
  },
  // 2、添加订单
  addOrder(courseId) {
    return request({
      url: '/orderservice/order/addOrder/' + courseId,
      method: 'post'
    })
  },
  // 3、生成微信支付二维码
  generateWxQRCode(orderNo) {
    return request({
      url: '/orderservice/pay/generateWxQRCode/' + orderNo,
      method: 'get'
    })
  },
  // 4、查询订单支付状态
  queryPayStatus(orderNo) {
    return request({
      url: '/orderservice/pay/queryPayStatus/' + orderNo,
      method: 'get'
    })
  }
}
