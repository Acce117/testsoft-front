<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import { ref } from 'vue';


const props = defineProps({
    queryFunction:{
        type:Function,
        required:true
    },
    paginationOptions:{
        type:Array,
        default:[5,10,20]

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
    queryKey: ['functional-roles'],
    queryFn:()=> props.queryFunction() 

})


const emit = defineEmits(['update-start-index', 'update-pagination-size'])

const searchTerm = ref('')

const startIndex = ref(0)
const paginationSize = ref(20)


// const data = computed(() => {
//     return data;
// });





</script>
<template>
    <div>
        <div class="flex items-center justify-center gap-2 px-2 my-2">
            <div class="flex items-center space-x-2">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText w-12rem lg:w-20rem v-model="searchTerm" :placeholder="$t('table.search')"
                        @keydown="(e) => { if (e.key == 'Enter') { startIndex = 0; refetch() } }" />
                </IconField>
                <button @click="() => { searchTerm = ''; startIndex = 0; refetch() }"
                    class="absolute end-2 inset-y-2 cursor-pointer flex items-center third-color-button justify-center p-1 h-6">
                </button>
                 <Select v-model="paginationSize" :options="paginationOptions"
                    @update:model-value="refetch" >
                    
                </Select> 
            </div>

            <div class="flex items-center space-x-2">

                <Button   icon="pi pi-angle-left" :disabled="startIndex == 0" @click="() => {
                    emit('update-start-index', startIndex - paginationSize)
                    refetch()

                }" />
                    
                <Button  :disabled="data && data.length < paginationSize"
                    @click="() => {
                        emit('update-start-index', startIndex + paginationSize)
                        refetch()
                    }" icon="pi pi-angle-right" />

                    


            </div>


        </div>
        <div
            class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 overflow-auto lg:grid-cols-4 xl:grid-cols-5  p-2">
            <slot v-for="(item, index) in data" :key="index" name="item-template" :data="item">
            </slot>
        </div>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 overflow-auto lg:grid-cols-4 xl:grid-cols-5  p-6"
            v-if="isPending || isRefetching">
            <Skeleton v-for="e in [1, 2, 3, 4]" :key="e" class="w-52 h-64 animate-pulse bg-third" />
        </div>
        <span v-else-if="data.length === 0" class="text-red-500 font-medium cursor-pointer text-base">No
            existen
            elementos</span>
        <span v-if="isError" @click="refetch" class="text-red-500 font-medium cursor-pointer text-base">Ha ocurrido un
            error, inténtelo de nuevo...</span>

    </div>
</template>