import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/layouts/login/VLogin.vue'
import VHome from '@/views/home/VHome.vue'
import VSelecTest from '@/modules/test/views/select-test/VSelectTest.vue'
import VProfile from '@/modules/security/views/profile/VProfile.vue'
import VExecuteTest from '@/modules/test/views/execute-test/VExecuteTest.vue'
import VGeneralVue from '@/layouts/general/VGeneral.vue'

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
      component: VGeneralVue,
      children: [
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
    }
    
  ]
})

export default router
