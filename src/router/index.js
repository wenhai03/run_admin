import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../views/Login') // 登录

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'Login'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      component: resolve => require(['@/views/Admin'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['@/views/home/home'], resolve)
        },
        {
          path: 'trainRecord',
          component: resolve => require(['@/views/trainRecord/trainRecord'], resolve)
        },
        {
          path: 'checkGrade',
          component: resolve => require(['@/views/checkGrade/checkGrade'], resolve)
        },
        {
          path: 'studentGroup',
          component: resolve => require(['@/views/studentsConfig/studentGroup'], resolve)
        },
        {
          path: 'studentSet',
          component: resolve => require(['@/views/studentsConfig/studentSet'], resolve)
        },
        {
          path: 'studentAdmin',
          component: resolve => require(['@/views/studentsConfig/studentAdmin'], resolve)
        }
      ]
    }
  ]
})
