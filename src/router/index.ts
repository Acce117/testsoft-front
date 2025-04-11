import { createRouter, createWebHistory } from "vue-router";
import VLogin from "@/modules/security/views/login/VLogin.vue";
import VHome from "@/views/home/VHome.vue";
import VSelecTest from "@/modules/test/views/select-test/VSelectTest.vue";
import VProfile from "@/modules/security/views/profile/VProfile.vue";
import VAssignTest from "@/modules/management/assign-test/views/VAssignTest.vue";
import VGeneralVue from "@/layouts/general/VGeneral.vue";
import VResults from "@/modules/results/views/VResults.vue";
import { isUserAuthenticated } from "@/modules/security/isUserAuthenticated";
import { userStore } from "@/modules/security/store/user-store";
import VUsersManagement from "@/modules/management/users/views/VUsersManagement.vue";
import VInfo from "@/views/info/VInfo.vue";
import AdminLayout from "@/layouts/admin/AdminLayout.vue";
import VGroups from "@/modules/management/group/views/VGroups.vue";
import VTestManagement from "@/modules/management/test/views/VTestManagement.vue";
import AddTest from "@/modules/management/test/views/components/AddTest.vue";
import VMyResults from "@/modules/results/views/VMyResults.vue";
import VClients from "@/modules/management/clients/views/VClients.vue";
import NotAuthorized from "@/views/errors/NotAuthorized.vue";
import NotFound from "@/views/errors/NotFound.vue";
import VSignUp from "@/modules/security/views/sign-up/VSignUp.vue";
import ExecuteTest from "@/modules/test/views/execute-test/ExecuteTest.vue";
import FunctionalRoleManagement from "@/modules/management/functional-roles/views/FunctionalRoleManagement.vue";
import SelectFunctionalRoles from "@/modules/functional-roles/views/SelectFunctionalRoles.vue";
import IncompatibilityLeadershipView from "@/modules/incompatibility-leadership/views/IncompatibilityLeadershipView.vue";
import SelectCompatibility from "@/modules/incompatibility-leadership/views/SelectCompatibility.vue";
import ExecutorLayout from "@/layouts/executor/ExecutorLayout.vue";

const autorize = (roles: string[]) => {
  return function (to, from, next) {
    const user = userStore();
    const userRoles = user.getRoles;
    let canTravel = false;
    roles.forEach((role) => {
      canTravel = userRoles.includes(role);
      if (canTravel) next();
    });
    if (!canTravel) next("/not-authorized");
  };
};
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: VLogin,
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: VSignUp,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/users",
          name: "users",
          component: VUsersManagement,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Admin", "Super Admin", "Client"]),
        },
        {
          path: "/groups",
          name: "groups",
          component: VGroups,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Admin", "Super Admin", "Client"]),
        },
        {
          path: "/results",
          name: "results",
          component: VResults,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Analyst", "Super Admin"]),
        },
        {
          path: "/functional-roles",
          name: "functional-roles",
          component: FunctionalRoleManagement,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Admin", "Super Admin"]),
        },
        {
          path: "/clients",
          name: "clients",
          component: VClients,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Super Admin"]),
        },
        {
          path: "/test",
          name: "test",
          component: VTestManagement,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Analyst", "Super Admin"]),
        },
        {
          path: "/incompatibility-leadership",
          name: "incompatibility-leadership",
          component: IncompatibilityLeadershipView,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/executor",
      name: "executor",
      component: ExecutorLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/functional-roles-selection",
          name: "functional-roles-selection",
          component: SelectFunctionalRoles,
          meta: { requiresAuth: true },
        },
        {
          path: "/compatibility-selection",
          name: "compatibility-selection",
          component: SelectCompatibility,
          meta: { requiresAuth: true },
        },
        {
          path: "/select-test",
          name: "select-test",
          component: VSelecTest,
          meta: { requiresAuth: true },
        },
        {
          path: "/my-results",
          name: "my-results",
          component: VMyResults,
          meta: { requiresAuth: true },
        },

      ],
    },
    {
      path: "/",
      name: "general",
      component: VGeneralVue,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/",
          name: "home",
          component: VHome,
          meta: { requiresAuth: true },
        },
        

        {
          path: "/profile",
          name: "profile",
          component: VProfile,
          meta: { requiresAuth: true },
        },
       
        {
          path: "/assign-test",
          name: "assign-test",
          component: VAssignTest,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Analyst"]),
        },
        {
          path: "/create-test/:id_test",
          name: "create-test",
          component: AddTest,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Analyst"]),
        },
        {
          path: "/update-test/:id_test",
          name: "update-test",
          component: AddTest,
          meta: { requiresAuth: true },
          beforeEnter: autorize(["Analyst"]),
        },
        {
          path: "/info",
          name: "info",
          component: VInfo,
          meta: { requiresAuth: true },
        },
        {
          path: "/not-authorized",
          name: "not-authorized",
          component: NotAuthorized,
          meta: { requiresAuth: true },
        },
        {
          path: "/not-found",
          name: "not-found",
          meta: { requiresAuth: true },
          component: NotFound,
        },
      ],
    },
    {
      path: "/execute-test/:id_test",
      name: "execute-test",
      component: ExecuteTest,
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) =>
        validateTestExecutionPermission(to, from, next),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/not-found",
    },
  ],
});

const validateTestExecutionPermission = (
  to: any,
  from: any,
  next: Function
) => {
  const user = userStore();
  if (from.path.includes("select-test")) {
    try {
      const id_test = to.path.split("/")[2];
      const test = user.assignedTests.filter((test) => test.id == id_test)[0];
      if (
        !test ||
        (test.availabilityTime != null &&
          new Date(test.availabilityTime).getTime() < new Date().getTime())
      )
        throw new Error("global.not-authorized");
      next();
    } catch (e: any) {
      next("/not-authorized");
    }
  } else {
    //next("/not-authorized");
    next();
  }
};
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    next("/login");
  } else next();
});
export default router;
