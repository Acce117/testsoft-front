import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/layouts/login/VLogin.vue'
import VHome from '@/layouts/home/VHome.vue'
import VSelecTest from '@/layouts/select-test/VSelectTest.vue'
import VProfile from '@/layouts/profile/VProfile.vue'
import VExecuteTest from '@/layouts/execute-test/VExecuteTest.vue'

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
    {
      path: '/execute-test/:id_test',
      name: 'execute-test',
      component: VExecuteTest
    },
    {
      path: '/profile',
      name: 'profile',
      component: VProfile
    },
  ]
})

export default router
