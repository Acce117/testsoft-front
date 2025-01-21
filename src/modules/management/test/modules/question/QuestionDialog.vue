<template>
    <FormDialog :model :submit-function :success-function ref="dialog" :is-data-loading="isPending">
        <template #form>
            <VInput v-model="model.statement" textarea name="statement" label="Enunciado" />
            <VSelect :disabled="model.id_question" @update:model-value="(value) => handleTopValueField(value)"
                v-model="model.fk_id_type_question" :defaultValue="model.type.id_type_question ? model.type : null"
                optionId="id_type_question" name="fk_id_type_question" label="Tipo de Pregunta" :options="questionTypes"
                optionLabel="name" />
            <VInput v-if="model.fk_id_type_question == 5 || model.type.id_type_question == 5" :min="1"
                v-model="model.top_value.top_value" number name="top_value"
                label="Cantidad de puntos máxima a distribuir" />
            <VFileUpload v-model="model.image" name="image" label="Imagen asociada a la respuesta" />
        {{ model }}
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import VInput from '@/components/VInput.vue';
import FormDialog from '@/components/FormDialog.vue';
import { ref, type Ref } from 'vue';
import { Question } from './question.model';
import VSelect from '@/components/VSelect.vue';
import { useQuestionTypes } from '../question-type/useQuestionTypes';
import VFileUpload from '@/components/VFileUpload.vue';
const { questionTypes, isPending } = useQuestionTypes()
const a = new Question()
const props = defineProps({
    question: Question,
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
    model.value.fk_id_type_question = model.value.type.id_type_question

}
defineExpose({ show })

const handleTopValueField = (value: number | string) => {
    if (value == 5) {
        model.value.top_value.top_value = 1
    }
    else {
        model.value.top_value?.clearData()
    }
}
</script>