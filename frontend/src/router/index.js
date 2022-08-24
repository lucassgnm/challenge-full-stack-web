import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EnrollView from '../views/EnrollView.vue'

Vue.use(VueRouter)

function isLogged(next) {
  if (!localStorage.userData){
    next({
      path: 'login',
      replace: true
    })
 } else {
    var date = new Date(JSON.parse(atob(JSON.parse(localStorage.userData).token.split('.')[1])).exp);
    var dateJS = new Date(date * 1000);

    if (new Date() > dateJS) {
      next({
        path: 'login',
        replace: true
      })
    }
    next()
 }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter(to, from, next) {
      isLogged(next);
    }
  },
  {
    path: '/about',
    name: 'about',
    component: EnrollView,
    beforeEnter(to, from, next) {
      isLogged(next);
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
