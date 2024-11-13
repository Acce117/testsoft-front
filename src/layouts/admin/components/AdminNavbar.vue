<template>
  <div z-50  w-full >

    <Menubar :model="items">

      <template #start>

        <RouterLink to="/" size-10> <img src="/img/logo.png" size-10 /></RouterLink>
      </template>
      <template #end>
        <div class="flex  items-center">

        <slot name="sidebar-button"></slot>
        <button v-ripple
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
          <Avatar label="U" style="background-color: #bae6fd; color: #0369a1;" class="mr-2" shape="circle" />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold">User</span>
            <span class="text-sm">Admin</span>
          </span>
        </button>
      </div>

      </template>
    </Menubar>
  </div>


</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { userStore } from "@/modules/security/store/user-store";
import { siteStore } from "@/common/site/siteStore";
import Avatar from "primevue/avatar";
const { t, locale } = useI18n();

const router = useRouter();


const itemsDefault = [

{
    icon:'pi pi-home',
    label: " ",
    i18n: "home",
    command: () => router.push("/"),
  },
  
  {
    icon:'pi pi-info-circle',
    label: " ",
    i18n: "info",
    command: () => router.push("/info"),
  },
];
const items = ref([]);

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
<style scoped>


 .p-menubar{
  border-radius: 12px !important; 
}
</style>
