import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import QuestionBank from '@/views/questionBank'
import updateQuestion from '@/views/updateQuestion'
import store from '@/store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/questionbank-base',
      name: 'questionBank-base',
      component: QuestionBank,
      meta: {
        title: '初级题库',
        activeItem: '初级题库'
      }
    },
    {
      path: '/questionbank-middle',
      name: 'questionBank-middle',
      component: QuestionBank,
      meta: {
        title: '中级题库',
        activeItem: '中级题库'
      }
    },
    {
      path: '/updatequestion',
      name: 'updateQuestion',
      component: updateQuestion,
      meta: {
        title: '上传题目',
        activeItem: '上传题目'
      }
    }
  ]
})

router.beforeEach((to, from, next) => { // beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title
  }
  store.dispatch('setPageInfo', {title: to.meta.title ? to.meta.title : '', activeItem: to.meta.activeItem ? to.meta.activeItem : '', current: to.path ? to.path : ''})

  next()// 执行进入路由，如果不写就不会进入目标页
})

export default router
