<template>
    <i mx-1 class="pi pi-file-edit" v-tooltip="$t('table.update')" @click="action($event)" />
    <UpdateDialog v-model="visible">
        <template #form>
            <slot name="form" />
        </template>
    </UpdateDialog>
</template>
<script setup lang="ts">
import { inject, ref, type Ref } from 'vue';
import { BaseModel } from '@/common/utils/BaseModel';
import UpdateDialog from './UpdateDialog.vue';
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

const action = async (event) => {
    console.log(event)
    console.log(props.dataToUpdate)


    model?.setData(props.dataToUpdate)
    await queryClient.refetchQueries({
        queryKey: [queryKey + '-one']
    })

    

    if (props.customFunction)
        props.customFunction(model?.getID())
    else visible.value = true
}

const visible = ref(false)


</script>