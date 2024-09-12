import Vue from 'vue'
import Vuex from 'vuex'
import style from './style.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newRoute: '/index',
    name: 'index',
    menuList: [
      {
        title: 'Dental Clinics',
        path: '/Dental-Clinics',
        name: 'Dental Clinics'
      },
      {
        title: 'Dental Offices',
        path: '/Dental-Offices',
        name: 'Dental Offices'
      },
      {
        title: 'Dental Service',
        path: '/Dental-Service',
        name: 'Dental Service'
      },
      {
        title: 'Near Me',
        path: '/Near-Me',
        name: 'Near Me'
      }
    ]
  },
  mutations: {
    changeRoute (state, item) {
      state.newRoute = item.path
      state.newRoute = item.name
    }
  },
  actions: {
  },
  modules: {
    style
  }
})
