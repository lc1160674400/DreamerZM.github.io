import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import QuestionBank from '@/views/questionBank'
import updateQuestion from '@/views/updateQuestion'
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
    },
    {
      path: '/updatequestion',
      name: 'updateQuestion',
      component: updateQuestion
    }
  ]
})
