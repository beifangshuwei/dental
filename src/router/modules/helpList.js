import store from '../../store'

const list = store.state.menuList

var helpListRouter = [{
  path: '/Clínicas-dentales',
  name: 'Clínicas dentales',
  meta: { title: 'Pro Bono & Offices' },
  component: () => import('@/views/ADOPTIONGUIDES'),
  children: [
    // {
    //   path: '/help/information',
    //   name: 'Animal Hospitals',
    //   meta: {
    //     title: '帮助列表'
    //   },
    //   component: () => import('@/views/ADOPTIONGUIDES/moudle/information.vue')
    // },
    // {
    //   path: '/help/detail',
    //   name: 'Animal Hospitals',
    //   meta: {
    //     title: '帮助列表'
    //   },
    //   component: () => import('@/views/ADOPTIONGUIDES/moudle/detail.vue')
    // }
  ]
}

]
list.forEach(item => helpListRouter[0].children.push({
  path: item.path + '/:state?/:area?/:oid?',
  name: item.name,
  meta: { title: '州、区列表' },
  component: () => import('@/views/ADOPTIONGUIDES/moudle/helpList.vue')
}))

export default helpListRouter
