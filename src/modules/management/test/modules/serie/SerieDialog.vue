<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.name" name="name" label="Nombre" />
            <VInput v-model="model.description" rows="3" textarea name="description" label="Descripción" />
            <VInput v-if="!testBuilder.getTest().navigable" v-model="model.time_serie_duration"
                :min="testBuilder.getTest().navigable ? 0 : 1" number name="time_serie_duration"
                label="Tiempo de duración (Minutos)" />
                {{ model }}
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { inject, ref, type Ref } from 'vue';
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
const testBuilder = inject('testBuilder')
const dialog = ref()

if (!testBuilder.value.getTest().navigable && model.value.time_serie_duration == 0)
    model.value.time_serie_duration = 1

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>