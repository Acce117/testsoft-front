<template>
  <button v-ripple @click="toggleUserMenu"
    class="relative overflow-hidden w-full border-0 p-0  bg-transparent flex items-center h-10  hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
    <Avatar :label="user.username.charAt(0).toUpperCase()" style="background-color: #bae6fd; color: #0369a1;"
      class="mr-2" shape="circle" />
    <span class="hidden text-slate-800 lg:inline-flex flex-col items-start">
      <span class="font-bold">{{ user.username }}</span>
      <span class="text-sm">{{ $t('roles.' + user.assignments[0].role.name) }}</span>
    </span>
  </button>
  <Menu ref="userMenu" :model="userItems" :popup="true" />
  <ChangePassword v-model="visibleChangePassword"/>
</template>
<script setup lang="ts">
import { siteStore } from '@/common/site/siteStore';
import { userStore } from '@/modules/security/store/user-store';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import ChangePassword from './ChangePassword.vue';
const userMenu = ref();
const user = userStore()
const router = useRouter();
const { t, locale } = useI18n()
const userItems = ref([
  {
    label: ' ',
    i18n: 'profile',
    items: [

      {
        label: ' ',

        i18n: "name",
        icon: 'pi pi-user',
        command: () => router.push("/profile"),
      },
      {
        label: ' ',

        i18n: "change-password",
        icon: 'pi pi-lock',
        command: () => visibleChangePassword.value = true,
      },
      {
        label: ' ',
        i18n: "close-session",
        icon: 'pi pi-sign-out',
        command: () => siteStore().logout(),
      },
    ],
  },
]);

const updateNavbarLabels = () => {
  userItems.value.forEach((item: any) => {
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
updateNavbarLabels()
watch(locale, () => {
  updateNavbarLabels();
});

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event);
};


const visibleChangePassword = ref(false)


</script>