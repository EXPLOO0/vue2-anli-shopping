import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Myorder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import Searchlist from '@/views/search/list'

import Home from '@/views/layout/home'
import Cart from '@/views/layout/cart'
import Category from '@/views/layout/category'
import User from '@/views/layout/user'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      // 默认
      redirect: '/home',
      // 子路由
      children: [
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/user', component: User }
      ]
    },
    { path: '/myorder', component: Myorder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: Searchlist }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // to:到哪里去，到哪去的完整路由信息对象（路径，参数）
  // from:从哪里来，从哪来的完整路由信息对象（路径，参数）
  // next():是否放行
  // (1)next()直接放行，放行到to要去的路径
  // (2)next(路径)进行拦截，拦截到next里面配置的路径

  // 定义一个数组，专门用于存放所有需要权限访问的页面
  const authUrls = ['/pay', 'myorder']
  // console.log(to, from, next)
  // 看to.path是否在authUr1s中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面直接放行
    next()
  }
  // 是权限页面，需要验证token
  // const token = store.state.user.userInfo.token
  const token = store.getters.token
  console.log(token)
  if (token) {
    // 存在，放行
    next()
  } else {
    // 不存在，拦截到登录
    next('/login')
  }
})

export default router
