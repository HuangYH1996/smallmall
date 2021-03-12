import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 路由懒加载

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: () => import('views/home/Home')
    },
    {
      path: '/category',
      component: () => import('views/category/Category')
    },
    {
      path: '/cart',
      component: () => import('views/cart/Cart')
    },
    {
      path: '/profile',
      component: () => import('views/profile/Profile')
    },
    {
      // 动态路由
      path: '/detail/:iid',
      component: () => import('views/detail/Detail')
    },
  ]
})
