<script setup lang="ts">
import { inject } from "vue";

import ScrollPanel from "primevue/scrollpanel";

import VQuestion from "./question-components/VQuestion.vue";

import VMultipleOptionsValueSetted from "./question-components/VMultipleOptionsValueSetted.vue";
import VSingleOptionQuestion from "./question-components/VSingleOptionQuestion.vue";

const props = defineProps({
  serie: Object,
});

const answers = inject<{ [key: string]: any }>("answers") || {};
</script>
@vue:before-mount="answers[`${question.id_question}`]={}"
<template>
  <ScrollPanel style="width: 100%; height: 46rem">
    <VQuestion
      v-for="(question, index) in props.serie?.arrayquestion"
      :id_question="question.id_question"
      :index="index + 1"
      :title="question.statement"
    >
      <VSingleOptionQuestion
        v-if="question.fk_id_type_question == 2"
        :possible_answers="question.arrayanswer"
        :id_question="question.id_question"
      />

      <VMultipleOptionsValueSetted
        v-else-if="question.fk_id_type_question == 5"
        :possible_answers="question.arrayanswer"
        :id_question="question.id_question"
      />
    </VQuestion>
  </ScrollPanel>
</template>
<style></style>
