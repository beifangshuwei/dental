// 公共接口
import service from '@/libs/request'

/**
 * 获取直播列表
 * @param area
 * @param dataType
 */
export function newLive () {
  return service({
    url: '/companyWebsiteApi/live/list',
    method: 'get'
  })
}
/**
 * 获取往期回顾
 * @param area
 * @param dataType
 */
export function previous (params) {
  return service({
    url: '/companyWebsiteApi/live/previous',
    method: 'get',
    params
  })
}
/**
 * 获取往期回顾
 * @param area
 * @param dataType
 */
export function getById (params) {
  return service({
    url: '/companyWebsiteApi/live/getById',
    method: 'get',
    params
  })
}
