<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.name" name="name" label="Nombre" />
            <VInput v-model="model.description" rows="3" textarea name="description" label="Descripción" />
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import type { Category } from './category.model';
import { ref, type Ref } from 'vue';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Category> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({show})
</script>