import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

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
      component: Home
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
