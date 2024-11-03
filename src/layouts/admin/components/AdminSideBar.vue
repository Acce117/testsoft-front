<template>

    <div class="card flex justify-center h-screen">
        <Menu :model="items" >
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-5">
                    <img src="/img/logo.png" size-10 />
                    <span class="text-xl font-semibold">Test<span class="text-primary">Soft</span></span>
                </span>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                    <span v-if="item.shortcut"
                        class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{
                            item.shortcut }}</span>
                </a>
            </template>

        </Menu>
    </div>
</template>
<script setup lang="ts">

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
            },
            {
                label: 'Grupos',
                icon: 'pi pi-users',

            }, 
            {
                label: 'Test',
                icon: 'pi pi-file',

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