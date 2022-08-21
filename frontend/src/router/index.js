import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
  path: '/login',
  name: 'login',
  component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter(to, from, next){
      if (!this.isloggedin){
         next({
           path: 'login',
           replace: true
         })
      } else {
         next()
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
