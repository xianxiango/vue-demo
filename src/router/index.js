import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/Main.vue'

const _import = file => () => import('@/views/' + file + '.vue')

Vue.use(Router)

export const constantRouter = [
  {
    path: '',
    component: Main,
    redirect: 'home',
    meta: {
      title: '仪表盘',
      icon: 'dashboard'
    },
    children: [{
      path: 'home',
      component: _import('home/Home'),
      name: 'home',
      meta: {
        title: '仪表盘'
      }
    }]
  },
  {
    path: '/login',
    component: Main,
    redirect: 'login',
    meta: {
      title: 'test',
      icon: 'dashboard'
    },
    children: [{
      path: 'login',
      component: _import('login/Login'),
      name: 'login',
      meta: {
        title: 'test'
      }
    }]
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   hidden: true,
  //   component: _import('login/Login')
  // }
]

export const asyncRouter = [




  // 404 页面一定要最后加载、否则后面的所有页面都会被拦截到404
  {
    path: '*',
    name: 'error',
    component: _import('error/Error'),
    hidden: true,
    meta: {
      roles: 'default'
    }
  },

]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouter
})
