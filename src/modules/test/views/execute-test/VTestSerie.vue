<script setup lang="ts">
import { inject } from "vue";


import ScrollPanel from "primevue/scrollpanel";

import VQuestion from "./question-components/VQuestion.vue";
import VRadioButton from "./question-components/VRadioButton.vue";

import RadioButton from "primevue/radiobutton";
import VMultipleOptionsValueSetted from "./question-components/VMultipleOptionsValueSetted.vue";

const props = defineProps({
  serie: Object,
});

const answers = inject<{[key: string]: any}>('answers') || {};

</script>
@vue:before-mount="answers[`${question.id_question}`]={}"
<template>
  <ScrollPanel style="width: 100%; height: 46rem;">
    <VQuestion v-for="(question, index) in props.serie?.arrayquestion" :id_question="question.id_question"
      :index="index + 1" :title="question.statement">
      
      <VRadioButton v-if="question.fk_id_type_question == 2" v-for="answer in question.arrayanswer"
        :key="answer.id_answer" :id_answer="answer.id_answer" :text="answer.text">
        <RadioButton v-model="answers[`${question.id_question}`]" :inputId="answer.id_answer"
          :name="question.id_question + ''" :value="answer.id_answer" />
      </VRadioButton>

      <VMultipleOptionsValueSetted v-else-if="question.fk_id_type_question == 5" 
        :possible_answers="question.arrayanswer" :id_question="question.id_question"/>
    </VQuestion>
  </ScrollPanel>
</template>
<style></style>
