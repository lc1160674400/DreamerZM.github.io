import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/mobile/index'
// import MobilePage from '@/components/mobile/mobilePage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: '官网首页移动端',
      component: index
    }
  ]
})

/**
 * 验证
 */
router.beforeEach((to, from, next) => {
  if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    window.location.href = '/p_index.html#/'
    return
  }
  next()
})

export default router
