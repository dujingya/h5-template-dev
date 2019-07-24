import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('../view/index')), 'index')
const list = r => require.ensure([], () => r(require('../view/list')), 'list')
const reportList = r => require.ensure([], () => r(require('../view/reportList')), 'reportList')
const aboutUs = r => require.ensure([], () => r(require('../view/aboutUs')), 'aboutUs')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: { notRequireAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/reportList',
      name: 'reportList',
      component: reportList
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    }
  ]
})
