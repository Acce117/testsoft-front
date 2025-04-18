<script setup lang="ts">
import VMultipleOptionQuestion from '../question-components/VMultipleOptionQuestion.vue';
import VMultipleOptionsValueSetted from '../question-components/VMultipleOptionsValueSetted.vue';
import VQuestion from '../question-components/VQuestion.vue';
import VSingleOptionQuestion from '../question-components/VSingleOptionQuestion.vue';
import VWrittenResponseQuestion from '../question-components/VWrittenResponseQuestion.vue';



const props = defineProps({
  serie: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <VQuestion v-for="(question, index) in props.serie?.questions" :key="question.id_question"
    :id_question="question.id_question" :question_index="index + 1" :title="question.statement">
    <template #default="{ changeInvalid }">
      
      <VMultipleOptionQuestion v-if="question.type.id_type_question == 1" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers" />

      <VSingleOptionQuestion v-else-if="question.type.id_type_question == 2" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers" />

      <VWrittenResponseQuestion v-else-if="question.type.id_type_question == 3" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers.map(q=>q.id_answer)" />

      <VMultipleOptionQuestion v-else-if="question.type.id_type_question == 4" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers" />

      <VMultipleOptionsValueSetted v-else-if="question.type.id_type_question == 5" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers" :question_index="index + 1"
        :maxPoints="question.top_value.top_value" />

      <VWrittenResponseQuestion v-else-if="question.type.id_type_question == 6" :changeInvalid
        :id_question="question.id_question" :possible_answers="question.answers.map(q=>q.id_answer)" />
    </template>

  </VQuestion>
</template>
<style></style>
