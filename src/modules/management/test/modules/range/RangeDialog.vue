<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.indicator" name="indicator" label="Indicador" />
            <VInput v-model="model.description" name="description" label="Descripción" />
            <VInput v-model="model.min_val" min="0" number name="min_val" label="Valor mínimo" />
            <VInput v-model="model.max_val" min="0" number name="max_val" label="Valor máximo" />
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import type { Range } from './range.model';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Range> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>