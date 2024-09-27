// 公共接口
import service from '@/libs/request'

/**
 * 州
 */
export function getState (params) {
  return service({
    url: '/web/dentist/getDentistState',
    params,
    method: 'get'
  })
}

/**
 * 区
 */
export function getArea (params) {
  return service({
    url: '/web/dentist/getDentistArea',
    params,
    method: 'get'
  })
}
/**
 * 详细列表
 */
export function getIcon (data) {
  const params = { ...data, language: localStorage.getItem('language') || 'en' }
  return service({
    url: '/web/dentist/getDentistIcon',
    params,
    method: 'get'
  })
}

/**
 * 列表详细信息
 */
export function getInformation (data) {
  const params = {
    ...data,
    language: localStorage.getItem('language') || 'en'
  }
  return service({
    url: '/web/dentist/getDentist',
    params,
    method: 'get'
  })
}
