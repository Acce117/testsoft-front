<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.name" name="name" label="Nombre" />
            <VInput v-model="model.description" rows="3" textarea name="description" label="Descripción" />
            <VInput v-model="model.time_serie_duration" min="0" number name="time_serie_duration"
                label="Tiempo de duración (Minutos)" />
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import type { Serie } from './serie.model';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Serie> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>