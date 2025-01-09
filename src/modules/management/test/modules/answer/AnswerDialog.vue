<template>
    <FormDialog :model :submit-function :success-function ref="dialog">
        <template #form>
            <VInput v-model="model.text" name="text" label="Texto" />
            <VYesNoQuestion numbersAsValues v-model="isCorrect"
                    label="¿Se puede considerar correcta esta respuesta?" name="isCorrect" />
                    <VSelect   v-model="model.tribute.fk_id_item" :defaultValue="model.tribute.fk_id_answer?model.tribute:null"
                optionId="id_item" name="id_item" label="Elemento al que tributa" :options
                optionLabel="name" />
                    <VInput v-model="model.tribute.tribute_value"  number name="tribute_value" label="Cantidad de puntos que tributa" />

        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import type { Answer } from './answer.model';
import VYesNoQuestion from '@/components/VYesNoQuestion.vue';
import VSelect from '@/components/VSelect.vue';

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

const isCorrect = ref(model.value.correct_answer!==null)

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>