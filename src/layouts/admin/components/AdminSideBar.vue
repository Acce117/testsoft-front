<template>

    <div class="card flex  justify-center h-screen">
        <Menu :model="items" >
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-5">
                    <img src="/img/logo.png" size-10 />
                    <span class="text-xl font-semibold">Test<span class="text-primary">Soft</span></span>
                </span>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-semibold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span font-bold>{{ item.label }}</span>
                    
                </a>
            </template>

        </Menu>
    </div>
</template>
<script setup lang="ts">

import router from "@/router";
import Menu from "primevue/menu";
import { ref } from "vue";

const items = ref([
    {
        separator: true
    },
    {
        label: 'Gestión',
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-user',
                command:()=>router.push('/users')
            },
            {
                label: 'Grupos',
                icon: 'pi pi-users',
                command:()=>router.push('/groups')


            }, 
            {
                label: 'Test',
                icon: 'pi pi-file',
                command:()=>router.push('/tests')


            }
        ]
    },
    {
        label: 'Perfil',
        items: [

            {
                label: 'Cerrar Sesión',
                icon: 'pi pi-sign-out',

            }
        ]
    },
    {
        separator: true
    }
]);

</script>
<style >

.p-menu-submenu-label{
    margin-top: 1rem !important;
}
</style>