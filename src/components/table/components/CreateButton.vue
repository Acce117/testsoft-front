<template>
    <Button icon="pi pi-plus" @click="action" />
    <CreateDialog v-model="visible">
        <template #form>
            <slot name="form" />
        </template>
    </CreateDialog>
</template>
<script setup lang="ts">
import { Button } from 'primevue';
import CreateDialog from './CreateDialog.vue';
import { inject, ref } from 'vue';
import { BaseModel } from '@/common/utils/BaseModel';


const model = inject<BaseModel>('model')
const props = defineProps({
    customFunction: {
        type: Function
    }
})

const action = () => {
    if (props.customFunction)
        props.customFunction()
    else visible.value = true
    model?.clearData()
}

const visible = ref(false)


</script>