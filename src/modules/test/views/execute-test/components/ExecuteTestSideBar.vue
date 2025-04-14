<template>

    <div class="p-4 card flex  w-18rem h-full flex-col  border-solid border-slate-200 border-1">
        <h3 font-bold mt-14 mb-2 text-primary>{{ props.data.name }}</h3>

        
        <h4 text-slate-600 font-bold mb-2>Series</h4>
        <div w-full max-h-20rem h-fit overflow-auto flex flex-wrap gap-2 p-2 border-solid rounded-xl mb-4 border-slate-200 border-1>
            <article
                :class="`serie-button ${serieIndex == index ? 'selected' : data.navigable == 1 ? 'bg-sky-100' : 'disabled'}`"
                v-for="(serie, index) in props.data.series" :key="serie.id_serie"
                @click="() => { if (data.navigable == 1) executeTest.changeSerie(index) }">{{ index + 1
                }}
            </article>
        </div>
        <Button @click="executeTest.validateTest(test)" id="finish-test-button" icon="pi pi-file-check"
            :label="t('execute-test.tooltips.save')" />
    </div>
</template>
<script setup lang="ts">

import { siteStore } from "@/common/site/siteStore";
import router from "@/router";
import Menu from "primevue/menu";
import { inject, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { userStore } from "@/modules/security/store/user-store";
import Button from "primevue/button";
const { t, locale } = useI18n();

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
const executeTest = inject('executeTest')
const test = inject('test')

const serieIndex = executeTest.serieIndex



const emit = defineEmits(['close'])

const navigateTo = (route: string) => {
    router.push(route)
    emit('close')
}






const itemsDefault = [

    {
        label: props.data.name,
        items: [

            {
                label: '',
                i18n: 'finish',
                icon: 'pi pi-file-check',
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

.serie-button.disabled {
    background-color: rgb(195, 195, 195);
    color: white;

}

.serie-button.selected {
    background-color: var(--p-button-primary-background);
    color: white;
}

.serie-button {

    transition: all ease .1s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: .8rem;
}

.serie-button:not(.disabled):hover {
    cursor: pointer;
    

}
</style>