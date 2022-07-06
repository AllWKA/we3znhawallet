import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Test from '../views/Test'
import Signin from "../views/Signin"
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isLoginIn = from.path === '/' && to.path === '/home'

  if (isLoginIn || to.path === '/signin' || to.path === '/') {
    next()

    return
  }

  try {
    const config = { headers: { authorization: `Bearer ${window.sessionStorage.token}` } }

    await axios.get('http://localhost:8090/validate/token', config)

    next()
  } catch (e) {
    next({ path: '/' })
  }
})

export default router
