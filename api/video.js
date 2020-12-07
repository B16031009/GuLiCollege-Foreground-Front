import request from '@/utils/request'

export default {
  // 1、根据视频id获取视频播放凭证
  getPlayAuth(videoId) {
    return request({
      url: '/eduvod/video/getPlayAuth/' + videoId,
      method: 'get'
    })
  },
  // 2、增加小节播放次数
  addVideoPlayCount(videoId) {
    return request({
      url: '/eduservice/videofront/addVideoPlayCount/' + videoId,
      method: 'put'
    })
  }
}
