<template>
  <!--<ul class="navbar">
    <li
      mt-0.5rem
      trans-0.2
      z-5
      hover:scale-110
      active:opacity-50
      active:scale-100
      cursor-pointer
      pointer-events-initial
      @click="goHome()"
    >
      <img src="/img/home.svg" w-3rem alt="home" />
    </li>
    

  </ul>-->
  <Menubar :model="items" absolute w-full border-none>

    <template #start>
        
      <RouterLink to="/" size-10> <img src="/public/img/logo.png" size-10/></RouterLink>
    </template>
  </Menubar>

</template>
<script setup lang="ts">
import VLanguageChanger from "../VLanguageChanger.vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { siteStore } from "@/common/site/siteStore";
const { t, locale } = useI18n();

const router = useRouter();
const itemsTestExecutor = [
  {
    label: " ",
    i18n: "test",
    items: [
      {
        label: " ",
        i18n: "execute",
        command: () => router.push("/select-test"),
      },
      {
        label: " ",
        i18n: "roles",
      },
      {
        label: " ",
        i18n: "compatibility",
      },
      {
        label: " ",
        i18n: "results",
        command: () => router.push("/results"),
      },
    ],
  },
];
const itemsAnalist = [
  {
    label: "Users",
    i18n: "users",
   
    items: [
      {
        label: " ",
        i18n: "manage-users",
        command: () => router.push("/users"),
      }
    ],
  },
  {
    label: "Groups",
    i18n: "groups",
    items: [
      {
        label: " ",
        i18n: "assign-test",
      },
      {
        label: " ",
        i18n: "manage-groups",
        command: () => router.push("/manage-groups"),
      },
    ],
  },
];
const itemsDefault = [
  {
    label: " ",
    i18n: "profile",
    items: [
      {
        label: " ",
        i18n: "user",
        command: () => router.push("/profile"),
      },
      {
        label: " ",
        i18n: "close-session",
        command: () => siteStore().logout(),
      },
    ],
  },
  {
    label: " ",
    i18n: "info",
    command: () => router.push("/info"),
  },
];
const items = ref([]);
if (userStore().role.includes("Estudiante"))
  items.value.push(...itemsTestExecutor);
if (userStore().role.includes("Analista")) items.value.push(...itemsAnalist);
items.value.push(...itemsDefault);
const updateNavbarLabels = () => {
  items.value.forEach((item: any) => {
    if (item.label) {
      item.label = t(`navbar.${item.i18n}.name`);
    }
    if (item.items) {
      item.items.forEach((subItem: any) => {
        subItem.label = t(`navbar.${item.i18n}.${subItem.i18n}`);
      });
    }
  });
};

updateNavbarLabels();

watch(locale, () => {
  updateNavbarLabels();
});

const goHome = () => {
  router.push("/");
};
</script>
<style>
.navbar {
  z-index: 4;
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  top: 0;
  left: 0;
  list-style: none;
  background-color: transparent;
  backdrop-filter: blur(0.5rem);
}
</style>
