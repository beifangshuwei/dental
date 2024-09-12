// 公共接口
import service from '@/libs/request'

/**
 * 获取推荐猫狗
 */
export function random (params) {
  return service({
    url: '/web/pet/random',
    params,
    method: 'get'
  })
}
/**
 * 获取推荐文章或者文章列表
 */
export function articleRandom (params) {
  return service({
    url: '/web/articleJson/getDentistArticle',
    params,
    method: 'get'
  })
}
/**
 * 获取事务所所需类型
 */
export function getType () {
  return service({
    url: '/web/dentist/getImgAndField',
    method: 'get'
  })
}
/**
 * 类型筛选列表
 */
export function queryPet (data) {
  return service({
    url: '/web/pet/queryPet',
    data,
    method: 'post'
  })
}
/**
 * 获取宠物详细信息
 */
export function petDetails (params) {
  return service({
    url: '/web/pet/petDetails',
    params,
    method: 'get'
  })
}
/**
 * 获取文章类型列表
 */
export function petArticleType (params) {
  return service({
    url: '/web/pet/petArticleType',
    params,
    method: 'get'
  })
}
/**
 * 获取文章列表
 */
export function getArticle (params) {
  return service({
    url: '/web/articleJson/getDentistArticle',
    params,
    method: 'get'
  })
}
/**
 * 获取文章详情
 */
export function petArticle (params) {
  return service({
    url: '/web/articleJson/getIdPetArticle',
    params,
    method: 'get'
  })
}

/**
 * 获取事务所详情
 */
export function getLawyerInformation (params) {
  return service({
    url: '/web/pet/getLawyerInformation',
    params,
    method: 'get'
  })
}
/**
 * 搜索
 */
export function getQuery (params) {
  return service({
    url: '/web/pet/getQuery',
    params,
    method: 'get'
  })
}


