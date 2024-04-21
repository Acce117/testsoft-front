import { createRouter, createWebHistory } from 'vue-router'
import VLogin from '@/layouts/login/VLogin.vue'
import VHome from '@/views/home/VHome.vue'
import VSelecTest from '@/modules/test/views/select-test/VSelectTest.vue'
import VProfile from '@/modules/security/views/profile/VProfile.vue'
import VExecuteTest from '@/modules/test/views/execute-test/VExecuteTest.vue'
import VAssignTest from '@/modules/management/assign-test/views/VAssignTest.vue'
import VGeneralVue from '@/layouts/general/VGeneral.vue'
import VResults from '@/modules/results/views/VResults.vue'
import { isUserAuthenticated } from '@/modules/security/isUserAuthenticated'
import { userStore } from '@/modules/security/store/user-store'
import VUsersManagement from '@/modules/management/users/views/VUsersManagement.vue'
import VInfo from '@/views/info/VInfo.vue'
import useEvents from '@/common/utils/useEvents'
const notAuthorizedToastError = {
  severity: "error",
  summary: "Error:",
  detail: 'global.not-authorized',
  i18n: true,
  life: 5000,
}
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
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => validateTestExecutionPermission(to, from, next)
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
        },
        {
          path: '/users',
          name: 'users',
          component: VUsersManagement,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => { validateAdminRole(next) }

        },
        {
          path: '/assign-test',
          name: 'assign-test',
          component: VAssignTest,
          meta: { requiresAuth: true },
          beforeEnter: (to, from, next) => { validateAdminRole(next) }
        },
        {
          path: '/info',
          name: 'info',
          component: VInfo,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/"
    }

  ]
})
const validateAdminRole = (next: Function) => {
  const user = userStore();
  if (user.role.includes('Analista'))
    next()
  else {
    next('/')
    useEvents().dispatch('error', notAuthorizedToastError);
  }
}
const validateTestExecutionPermission = (to: any, from: any, next: Function) => {

  const user = userStore();
  if (from.path.includes('select-test')) {
    try {
      const id_test = to.path.split('/')[2]
      const test = user.assignedTests.filter(test => test.id == id_test)[0]
      if (!test || (test.availabilityTime != null && new Date(test.availabilityTime).getTime() < new Date().getTime()))
        throw new Error('global.not-authorized')
      next()
    } catch (e: any) {
      next('/');
      useEvents().dispatch('error', notAuthorizedToastError);
    }
  }
  else {
    next('/');
    useEvents().dispatch('error', notAuthorizedToastError);
  }

}
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    useEvents().dispatch('error', notAuthorizedToastError);
  }
  else next();
});
export default router
