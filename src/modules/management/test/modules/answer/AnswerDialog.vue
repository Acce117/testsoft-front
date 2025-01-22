<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.text" name="text" label="Texto" />
            <VYesNoQuestion v-if="testBuilder.getTest().isPsicometricTest()" v-model="model.is_correct" label="¿Se puede considerar correcta esta respuesta?"
                name="is_correct" :default="model.correct_answer.id_correct_answer !== undefined" />
            <VSelect v-model="model.tribute.fk_id_item" :defaultValue="model.tribute.fk_id_answer ? defaultItem : null"
                optionId="id_item" name="fk_id_item" label="Elemento al que tributa" :options optionLabel="name" />
            <VInput  v-model="model.tribute.tribute_value" number name="tribute_value"
                label="Cantidad de puntos que tributa" />
            <VFileUpload v-model="model.image" name="image" label="Imagen asociada a la respuesta" />
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { computed, inject, ref, type Ref } from 'vue';
import type { Answer } from './answer.model';
import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import VSelect from '@/components/VSelect.vue';
import VFileUpload from '@/components/VFileUpload.vue';

const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    },
    options: {
        type: Array,
        required: true
    },
})

const model: Ref<Answer> = defineModel()
    const testBuilder = inject('testBuilder')




const defaultItem = computed(()=>props.options.filter((i)=>i.id_item == model.value.tribute.fk_id_item)[0])


const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>