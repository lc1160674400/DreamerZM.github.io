import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import QuestionBank from '@/views/questionBank'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/questionbank',
      name: 'questionBank',
      component: QuestionBank
    }
  ]
})
