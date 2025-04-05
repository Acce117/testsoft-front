<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Paginator } from 'primevue';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import { ref, watchEffect } from 'vue';


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

    }
})
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
    queryFn: () => props.queryFunction({ limit: limit.value, offset: offset.value })

})


const emit = defineEmits(['update-start-index', 'update-pagination-size'])

const searchTerm = ref('')

const offset = ref(0)
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





</script>
<template>
    <div>
        <div class="flex flex-col items-center justify-center gap-2 px-2 my-2">
            <div class="flex items-center space-x-2">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText w-20rem lg:w-20rem v-model="searchTerm" :placeholder="$t('table.search')"
                        @keydown="(e) => { if (e.key == 'Enter') { offset = 0; refetch() } }" />
                </IconField>
                
                <Button icon="pi pi-refresh" :disabled="isPending || isRefetching" @click="() => {
                    offset = 0
                    refetch()

                }" />

                
            </div>

            <div class="flex items-center space-x-2">

                

                
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
                            <span>
                                Mostrando {{ slotProps.state.rows>totalRecords?totalRecords:slotProps.state.rows }} de {{ totalRecords }} elementos
                                
                            </span>
                            <span>
                                Primer elemento: {{ slotProps.state.first + 1 }}
                            </span>
                            <span>
                                Página: {{ slotProps.state.page + 1 }} de {{ totalPages }}
                            </span>
                        </section>

                       
                        
                    </template>
                </Paginator>

                



            </div>


        </div>
       
        <div v-if="!isPending && !isRefetching">

            <article
                class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 overflow-auto lg:grid-cols-4 xl:grid-cols-5  p-2">
                <slot v-for="(item, index) in data.data" :key="index" name="item-template" :data="item">
                </slot>
            </article>

            <span v-if="data.data.length === 0" class="text-red-500 font-medium cursor-pointer text-base">No
                existen
                elementos</span>

        </div>
        <span v-else-if="isError" @click="refetch" class="text-red-500 font-medium cursor-pointer text-base">Ha ocurrido
            un
            error, inténtelo de nuevo...</span>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 overflow-auto lg:grid-cols-4 xl:grid-cols-5  p-6"
            v-else>
            <Skeleton v-for="e in [1, 2, 3, 4]" :key="e" class="w-52 h-64 animate-pulse bg-third" />
        </div>



    </div>
</template>