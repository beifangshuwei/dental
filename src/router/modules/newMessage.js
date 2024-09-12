// import store from '@/store'

var newMessageRouter = [{
  path: '/news',
  name: 'news',
  meta: { title: '最新动态' },
  component: () => import('@/views/newMessage'),

}, {
  path: '/news/content',
  name: 'newsContent',
  component: () => import(/* webpackChunkName: "about" */ '@/views/newMessage/newsContent.vue')
}]
export default newMessageRouter
