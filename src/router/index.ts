import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/layouts/login/VLogin.vue'
import VHome from '@/views/home/VHome.vue'
import VSelecTest from '@/modules/test/views/select-test/VSelectTest.vue'
import VProfile from '@/modules/security/views/profile/VProfile.vue'
import VExecuteTest from '@/modules/test/views/execute-test/VExecuteTest.vue'
import VGeneralVue from '@/layouts/general/VGeneral.vue'
import VResults from '@/modules/results/views/VResults.vue'
import { isUserAuthenticated } from '@/modules/security/isUserAuthenticated'

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
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: VHome,
          meta: { requiresAuth: true }
        },
        {
          path: '/select-test',
          name: 'select-test',
          component: VSelecTest,
          meta: { requiresAuth: true }
        },
        {
          path: '/execute-test/:id_test',
          name: 'execute-test',
          component: VExecuteTest,
          meta: { requiresAuth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: VProfile,
          meta: { requiresAuth: true }
        },
        {
          path: '/results',
          name: 'results',
          component: VResults,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/"
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated())
    next('/login');
  else
    next();
});
export default router
