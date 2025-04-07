<template>
    <i mx-1 class="pi pi-file-edit" v-tooltip="$t('table.update')" @click="action($event)" />

</template>
<script setup lang="ts">
import { inject, type Ref } from 'vue';
import { BaseModel } from '@/common/utils/BaseModel';
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient()

const queryKey = inject<Ref<string>>('queryKey')

const model = inject<BaseModel>('model')
const props = defineProps({
    dataToUpdate: {
        type: Object,
        required: true
    },
    customFunction: {
        type: Function
    }
})

const emit = defineEmits(['show-update-dialog'])

const action = async (event) => {
    console.log(event)
    console.log(props.dataToUpdate)


    model?.setData(props.dataToUpdate)
    await queryClient.refetchQueries({
        queryKey: [queryKey + '-one']
    })



    if (props.customFunction)
        props.customFunction(model?.getID())
    else emit('show-update-dialog')
}



</script>