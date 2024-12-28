<template>
  <button v-ripple @click="toggleUserMenu"
    class="relative overflow-hidden w-full border-0 p-0  bg-transparent flex items-center h-10  hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
    <Avatar :label="user.username.charAt(0).toUpperCase()" style="background-color: #bae6fd; color: #0369a1;"
      class="mr-2" shape="circle" />
    <span class="hidden text-slate-800 lg:inline-flex flex-col items-start">
      <span class="font-bold">{{ user.username }}</span>
      <span class="text-sm">Admin</span>
    </span>
  </button>
  <Menu ref="userMenu" :model="userItems" :popup="true" />
</template>
<script setup lang="ts">
import { siteStore } from '@/common/site/siteStore';
import { userStore } from '@/modules/security/store/user-store';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const userMenu = ref();
const user = userStore()
const router = useRouter();

const userItems = ref([
  {
    label: 'Opciones de Usuario',
    items: [

      {
        label: "Mi Perfil",
        icon: 'pi pi-user',
        command: () => router.push("/profile"),
      },
      {
        label: "Cerrar Sesión",
        icon: 'pi pi-sign-out',
        command: () => siteStore().logout(),
      },
    ],
  },
]);

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event);
};


</script>