/**
 * Created by yudaobin on 2017/7/1.
 */

import Layout from '@/common/Layout.vue'

export default {
  path: '/member',
  name: "member",
  component: Layout,
  children: [
    {
      path: '/member/list',
      component: r => require.ensure([], () => r(require('../views/member-list.vue')), 'member')
    },
    {
      path: '/member/view',
      component: r => require.ensure([], () => r(require('../views/member-view.vue')), 'member')
    },
    {
      path: '/member/new',
      component: r => require.ensure([], () => r(require('../views/member-new.vue')), 'member')
    }
  ]

}
