<template>

    <div class="card flex  justify-center h-screen">
        <Menu :model="items">
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-5 ">
                    <img src="/img/logo.png" size-10 />
                    <span class="text-xl font-bold">Test<span class="text-primary font-bold">Soft</span></span>
                </span>
            </template>
            <template #submenulabel="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span >{{ item.label }}</span>

                </a>
            </template>

        </Menu>
    </div>
</template>
<script setup lang="ts">

import { siteStore } from "@/common/site/siteStore";
import router from "@/router";
import Menu from "primevue/menu";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { userStore } from "@/modules/security/store/user-store";
const { t, locale } = useI18n();


const emit = defineEmits(['close'])

const navigateTo = (route: string) => {
    router.push(route)
    emit('close')
}





const itemsDefault = [
    {
        label: ' ',
        i18n: 'test',
        items: [

            {
                label: ' ',
                i18n: 'execute',
                icon: 'pi pi-file-edit',
                command: () => navigateTo("/select-test")
            },
            {
                label: " ",
                i18n: "results",
                command: () => router.push("/my-results"),
            },
        ]
    },


    {
        label: " ",
        i18n: "others",

        items: [
            {
                label: " ",
                i18n: "functional_roles",
                icon: 'pi pi-file-edit',
                command: () => router.push("/functional-roles-selection"),
            },
            {
                label: " ",
                icon: 'pi pi-file-edit',
                i18n: "compatibility",
                command: () => router.push("/compatibility-selection"),
            },


        ]
    },
   
    {
        separator: true
    },


    {
        label: ' ',
        i18n: 'profile',
        items: [

            {
                label: ' ',
                i18n: 'close-session',
                icon: 'pi pi-sign-out',
                command: () => siteStore().logout()
            }
        ]
    },
    {
        label: " ",
        i18n: "info",
        icon: 'pi pi-info-circle',

        command: () => router.push("/info"),
    },
    {
        separator: true
    }
];
const items = ref([]);
let subItemsManagement = []
if (userStore().getRoles.includes("Admin") || userStore().getRoles.includes("Client")) {
    subItemsManagement.push(...itemsAdmin)
}
if (userStore().getRoles.includes("Analyst")) {
    subItemsManagement.push(...itemsAnalyst)
}
if (userStore().getRoles.includes("Super Admin")) {
    subItemsManagement.push(...itemsAdmin)
    subItemsManagement.push(...itemsAnalyst)
    subItemsManagement.push(...itemsSuperAdmin)
}
if (subItemsManagement.length > 0) {
    itemsManagement[1].items.push(...subItemsManagement);
    items.value.push(...itemsManagement)
}
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
</script>
<style>
.p-menu-submenu-label {
    margin-top: 1rem !important;
}
</style>

<i18n>
    {
      "es": {
        "navbar": {
          "others":{
            "name":"Otros",
            "compatibility": "Compatibilidades y Liderazgo",
            "functional_roles": "Roles Funcionales",

          } 
        }
      }
    }
</i18n>