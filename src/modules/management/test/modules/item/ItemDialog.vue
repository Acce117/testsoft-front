<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.name" name="name" label="Nombre" />
            <VInput v-model="model.description" rows="3" textarea name="description" label="Descripción" />
            <VInput v-model="model.priority" number min="0" name="priority" label="Prioridad" />

        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import type { Item } from './item.model';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Item> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>