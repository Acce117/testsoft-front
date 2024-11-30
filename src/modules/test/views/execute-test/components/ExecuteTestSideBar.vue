<template>

    <div class="card flex   justify-center h-screen ">
        <Menu :model="items" overflow-auto >
            <template #start>
                <span class="inline-flex items-center gap-1 px-2 py-5">
                    <img src="/img/logo.png" size-10 />
                    <span class="text-xl font-semibold">Test<span class="text-primary">Soft</span></span>
                </span>
            </template>
            <template #submenulabel="{ item }">
                <div p>
                    <span class="text-primary font-semibold">{{ item.label }}</span>
                    <span class="text-primary font-semibold max-w-12rem flex ">{{ test.name }}</span>
                </div>


            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span font-bold>{{ item.label }}</span>

                </a>

            </template>
            <template #end>
                <div p-4 h-full flex flex-col >
                    <span font-bold>
                        Series
                    </span>
                    <Steps mt-4 :model="getSeriesNames()" v-model:activeStep="executeTest.serieIndex.value"
                        :readonly="data?.navigable != 1" />
                </div>

            </template>

        </Menu>

    </div>
</template>
<script setup lang="ts">

import Menu from "primevue/menu";

import Steps from "primevue/steps";
import { inject, ref } from "vue";

const test = inject('test')
const executeTest = inject('executeTest')

const props = defineProps({
    data: Object
}
)

const items = ref([
    {
        separator: true
    },
    {
        label: 'Ejecución de Test: ',
        items: [
            {
                label: 'Finalizar',
                icon: 'pi pi-user',
                command: () => executeTest.validateTest()
            },
            {
                label: 'Información',
                icon: 'pi pi-users',
                command: () => executeTest.infoVisible.value = true


            },
            {
                label: 'Salir',
                icon: 'pi pi-file',
                command: () => executeTest.exitTestConfirm('select-test')


            }
        ]
    },

    {
        separator: true
    }
]);
const getSeriesNames = () => {
    let names = Array();
    if (props.data) {
        props.data.series.forEach((serie: { name: string }) => {
            names.push({ label: serie.name });
        });
    }
    return names;
};

</script>
<style>
.p-menu-submenu-label {
    margin-top: 1rem !important;
}

.p-steps-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem;
}

.p-steps-item-link {
    display: flex !important;
    flex-direction: row !important;

}

.p-steps-item {
    justify-content: left !important;

}

.p-steps-item::before {
    display: none !important;
}
</style>