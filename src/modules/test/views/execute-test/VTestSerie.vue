<script setup lang="ts">
import { inject } from "vue";

import ScrollPanel from "primevue/scrollpanel";

import VQuestion from "./question-components/VQuestion.vue";

import VMultipleOptionsValueSetted from "./question-components/VMultipleOptionsValueSetted.vue";
import VSingleOptionQuestion from "./question-components/VSingleOptionQuestion.vue";
import { validateComponent } from "@/common/utils/validateAnswers";


const props = defineProps({
  serie: Object,
});

const answers: { [key: string]: any } = inject("answers") || {};
const validatedTestFirstTime = inject("validatedTestFirstTime")

//
</script>
@vue:before-mount="answers[`${question.id_question}`]={}"
<template>
  <ScrollPanel style="width: 100%;">
    <VQuestion
      v-for="(question, index) in props.serie?.arrayquestion"
      :id_question="question.id_question"
      :index="index + 1"
      :title="question.statement"
      :class="{'question-not-responded': validatedTestFirstTime? !validateComponent(question.fk_id_type_question, question.id_question, answers):false}"
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
