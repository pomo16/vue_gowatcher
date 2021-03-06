import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register'
import Home from '../components/Home.vue'
import Dashboard from '../components/analyze/Dashboard'
import Ability from '../components/analyze/Ability'
import Task from '../components/task/Task.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/home',
      component: Home,
      redirect: '/dashboard',
      children: [
        { path: '/dashboard', component: Dashboard },
        { path: '/ability', component: Ability },
        { path: '/task', component: Task }
      ]
    }
  ]
})

// Mount routing navigation guard
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
