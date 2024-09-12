// import store from '@/store'

var serviceRouter = [{
  path: '/answers',
  name: 'cat',
  meta: { title: '首页' },
  component: () => import('@/views/liveShow'),
  // redirect: () => {
  //   return store.state.road.roadRoute
  // },
}, {
  path: '/answers/legal-issue',
  name: 'Cat',
  component: () => import(/* webpackChunkName: "about" */ '@/views/liveShow/name.vue')
},
  {
    path: '/answers/legal-issue',
    name: 'Cat',
    component: () => import(/* webpackChunkName: "about" */ '@/views/liveShow/name.vue')
  },
]
export default serviceRouter
