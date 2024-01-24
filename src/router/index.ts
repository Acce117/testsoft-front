import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/layouts/login/VLogin.vue'
import VHome from '@/layouts/home/VHome.vue'
import VSelecTest from '@/layouts/select-test/VSelectTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: VLogin
    },
    {
      path: '/',
      name: 'home',
      component: VHome
    },
    {
      path: '/select-test',
      name: 'select-test',
      component: VSelecTest
    },

  ]
})

export default router
