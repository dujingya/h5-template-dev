// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './assets/js/common.js'
import './assets/css/reset.scss'
import Mint from 'mint-ui'
import vueMoment from 'vue-moment'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll/build/iscroll-probe.js'
import { LoadingPlugin, AlertPlugin, ToastPlugin } from 'vux'
import vueScroller from 'vue-scroller'
import share from './services/share.js' // 封装的分享组件

//  滚动插件
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(IScrollView, IScroll)
Vue.use(Mint)
Vue.use(vueMoment)
Vue.use(vueScroller)
Vue.use(share)
Vue.config.productionTip = false

// 路由钩子函数
// router.beforeEach((to, from, next) => {
//   if (!to.matched.some(record => record.meta.notRequireAuth)) {
//     const accessToken = window.localStorage.getItem('access_token')
//     if (accessToken) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   }
//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
