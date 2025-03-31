<template>

    <div class="card flex  justify-center h-screen">
        <Menu :model="items">
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
const itemsManagement = [
    {
        separator: true
    },
    {
        label: "Management",
        i18n: "management",
        items: [],
    },
    {
        label: "Reports",
        i18n: "reports",
        items: [
            {
                label: " ",
                i18n: "sociometric",
                icon: 'pi pi-sitemap',

                command: () => navigateTo("/incompatibility-leadership"),
            },
        ],
    },
];

const itemsAnalyst = [
    {
        label: " ",
        i18n: "test",
        icon: 'pi pi-file-edit',

        command: () => navigateTo("/test"),
    },
    {
        label: " ",
        i18n: "results",
        icon: 'pi pi-list-check',

        command: () => navigateTo("/results"),
    },
];

const itemsAdmin = [

    {
        label: " ",
        i18n: "users",
        icon: 'pi pi-user',

        command: () => navigateTo("/users"),
    },
    {
        label: " ",
        icon: 'pi pi-users',

        i18n: "groups",
        command: () => navigateTo("/groups"),
    },
    {
        label: " ",
        i18n: "functional_roles",
        icon: 'pi pi-tags',

        command: () => navigateTo("/functional_roles"),
    },
];

const itemsSuperAdmin = [
    {
        label: " ",
        icon: 'pi pi-briefcase',

        i18n: "client",
        command: () => navigateTo("/clients"),
    },
]
const itemsDefault = [

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