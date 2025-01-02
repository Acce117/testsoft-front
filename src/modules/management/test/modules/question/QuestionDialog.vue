<template>
    <FormDialog :model :submit-function :success-function ref="dialog" :is-data-loading="isPending">
        <template #form>
            <VInput v-model="model.statement" textarea name="statement" label="Enunciado" />
            <VSelect v-model="model.fk_id_type_question" optionId="id_type_question" name="fk_id_type_question"
                label="Tipo de Pregunta" :options="questionTypes" optionLabel="name" />

        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import type { Question } from './question.model';
import VSelect from '@/components/VSelect.vue';
import { useQuestionTypes } from '../question-type/useQuestionTypes';
const { questionTypes, isPending } = useQuestionTypes()


const props = defineProps({
    submitFunction: {
        type: Function,
        required: true
    },
    successFunction: {
        type: Function
    }
})
const model: Ref<Question> = defineModel()

const dialog = ref()

const show = () => {
    dialog.value.show()
}
defineExpose({ show })
</script>