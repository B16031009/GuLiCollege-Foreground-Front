import request from '@/utils/request'

export default {
  // 1、查询所有轮播图列表
  getAllBanner() {
    return request({
      url: '/cmsservice/bannerfront/getAllBanner',
      method: 'get'
    })
  }
}
