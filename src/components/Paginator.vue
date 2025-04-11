<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Card, Paginator, SelectButton } from 'primevue';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import { computed, ref, watchEffect } from 'vue';


const props = defineProps({
    queryFunction: {
        type: Function,
        required: true
    },
    queryKey: {
        type: String,
        required: true
    },
    paginationOptions: {
        type: Array,
        default: [1, 5, 10, 20]

    },
    gridClass: {
        type: String,
        default: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 '
    },
    gridOptions: {
        type: {
            base: Number,
            sm: Number,

            md: Number,
            lg: Number,
            xl: Number,
            xxl: Number
        },
        default: {
            base: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5
        },

    },
    filterOptions: {
        type: Array<{
            name: string,
            value: number,

        }>,
    }
})

// const gridClass = computed(() => {
//     const classes = ['grid gap-4 w-full']


//     Object.entries(props.gridOptions).forEach(([breakpoint, cols]) => {
//         const prefix = breakpoint === 'base' ? '' : `${breakpoint}:`
//         classes.push(`${prefix}grid-cols-${cols}`)
//     })


//     return classes.join(' ')
// })


const {
    data,
    isPending,
    isSuccess,
    error,
    isRefetching,
    refetch,
    isError
} = useQuery({
    queryKey: [props.queryKey],
    queryFn: () => props.queryFunction({ limit: limit.value, offset: offset.value, where: filters.value })

})


const emit = defineEmits(['update-start-index', 'update-pagination-size'])

const searchTerm = ref('')

const offset = ref(0)
const filters = ref({})
const totalRecords = ref(0)
const totalPages = ref(0)
const actualPage = ref(0)


const limit = ref(10)
watchEffect(() => {
    if (isSuccess.value && !isPending.value && !isRefetching.value) {

        totalRecords.value = data.value.elements_amount
        totalPages.value = data.value.pages
        actualPage.value = data.value.actual_page

    }
});

// const data = computed(() => {
//     return data;
// });

const value = ref(null);

const onFilterOptions = (event) => {

    console.log(event.value.value)
    filters.value = { name: 'Belbin' }


    onFilter()

}
const onFilter = () => {
    refetch()
}

defineExpose({refetch})


</script>
<template>
    <Card h-full flex flex-col>
        <template #content>
            <slot name="header"></slot>

            <div class="flex " v-if="filterOptions">
                <SelectButton v-model="value" 
                    :default-value="filterOptions[0] ? filterOptions[0] : null" :options="filterOptions"
                    optionLabel="name" @change="onFilterOptions" />
            </div>
            <div class="flex  items-center w-full flex-wrap  gap-2 mt-2 mb-8">
                <div flex gap-2>

                    <IconField w-full max-w-30rem>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText w-full v-model="searchTerm" :placeholder="$t('table.search')"
                            @keydown="(e) => { if (e.key == 'Enter') { offset = 0; refetch() } }" />
                    </IconField>

                    <Button icon="pi pi-refresh" :disabled="isPending || isRefetching" @click="() => {
                        offset = 0
                        refetch()

                    }" />
                </div>








                <Paginator :rows="limit" @page="(e) => {
                    console.log(e)
                    offset = e.first
                    limit = e.rows
                    refetch()
                }" :totalRecords="totalRecords" :rowsPerPageOptions="[1, 10, 20, 30]">
                    <template #start="slotProps">



                    </template>
                    <template #end="slotProps">
                        <section class="flex flex-col ml-4">
                            <span v-if="data && data.data.length > 0">
                                {{ slotProps.state.first + 1 }} al {{ slotProps.state.first + 1 + limit > totalRecords ?
                                    totalRecords : slotProps.state.first + 1 + limit }}, de
                                {{ totalRecords }}

                            </span>


                        </section>



                    </template>
                </Paginator>





            </div>



            <template v-if="!isPending && !isRefetching">
                <!--  -->
                <section :class="'grid w-full gap-4 ' + gridClass">

                    <slot name="item-template" v-for="(item, index) in data.data" :key="index" :data="item">
                    </slot>

                </section>

                <span v-if="data.data.length === 0" class="text-red-500 font-medium cursor-pointer text-base">No
                    existen
                    elementos</span>

            </template>
            <span v-else-if="isError" @click="refetch" class="text-red-500 font-medium cursor-pointer text-base">Ha
                ocurrido
                un
                error, inténtelo de nuevo...</span>
            <!-- <div :class="`w-full grid grid-cols-[${props.gridOptions.base}] sm:grid-cols-[${props.gridOptions.sm}] md:grid-cols-[${props.gridOptions.md}] lg:grid-cols-${props.gridOptions.lg} xl:grid-cols-${props.gridOptions.xl} 2xl:grid-cols-${props.gridOptions.xxl}  gap-8 overflow-auto  `"
                v-else>
                <Skeleton v-for="e in [1, 2, 3, 4]" height="8rem" :key="e" class=" w-full animate-pulse min-w-0 break-inside-avoid break-words  " />
            </div> -->
            <div :class="'grid w-full gap-4 ' + gridClass" v-else>
                <Skeleton v-for="e in [1, 2, 3, 4]" height="8rem" :key="e" class=" w-full animate-pulse   " />
            </div>



        </template>
    </Card>
</template>
<style>
.p-paginator {
    display: flex !important;
    padding: 0 !important;
}

.p-paginator-content-end {
    margin-left: 0 !important;
}
</style>