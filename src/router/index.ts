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
import { useToast } from 'primevue/usetoast'
import { userStore } from '@/modules/security/store/user-store'
import VUsersManagement from '@/modules/management/users/views/VUsersManagement.vue'
import VInfo from '@/views/info/VInfo.vue'
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
        },
        {
          path: '/users',
          name: 'users',
          component: VUsersManagement,
          meta: { requiresAuth: true }
        },
        {
          path: '/assign-test',
          name: 'assign-test',
          component: VAssignTest,
          meta: { requiresAuth: true }
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
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated())
    next('/login');
  else if (to.path.includes('execute-test')) {
    const user = userStore();
    if (from.path.includes('select-test')) {
      try {
        const id_test = to.path.split('/')[2]
        const test = user.assignedTests.filter(test => test.id == id_test)[0]
        if (!test)
          throw new Error('Este test no existe')
        else if (test.availabilityTime != null && new Date(test.availabilityTime).getTime() < new Date().getTime())
          throw new Error('No puede ejecutar este test')
        next()
      } catch (e:any) {
        next('/');
        useToast().add({
          severity: "error",
          summary: "Error:",
          detail: e.message,
          life: 5000,
        });
      }
    }
    else next('/')
  }
  else
    next();
});
export default router
