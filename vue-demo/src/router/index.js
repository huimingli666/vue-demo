import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/common/Layout'
import memberRouter from '../modules/demo/router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
    },
    memberRouter
  ]
})
