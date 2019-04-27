import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/home/Home'
import Welcome from '@/components/home/Welcome'
import Users from '@/components/users/Users'
import Rights from '@/components/auth/Rights'
import Roles from '@/components/auth/Roles'
import Categories from '@/components/goods/Categories'
import Params from '@/components/goods/Params'
import Goods from '@/components/goods/Goods'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {path: '/welcome', name: 'Welcome', component: Welcome},
        {path: '/users', name: 'users', component: Users},
        {path: '/rights', name: 'rights', component: Rights},
        {path: '/roles', name: 'roles', component: Roles},
        {path: '/categories', name: 'categories', component: Categories},
        {path: '/params', name: 'params', component: Params},
        {path: '/goods', name: 'goods', component: Goods}]
    }
  ]
})
/* 添加导航守卫 */
router.beforeEach((to, from, next) => {
  /* 如果跳转的是登录 放行 */
  if (to.path === '/login') return next()
  /* 如果没登录 拦截 */
  if (!sessionStorage.getItem('token')) return next('/login')
  /* 其他情况 */
  next()
})

export default router
