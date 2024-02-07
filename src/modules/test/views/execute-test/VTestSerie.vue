<script setup lang="ts">
import { ref } from "vue";


import ScrollPanel from "primevue/scrollpanel";

import VQuestion from "./question-components/VQuestion.vue";
import VRadioButton from "./question-components/VRadioButton.vue";
import VMultipleOptionValueSetted from "./question-components/VMultipleOptionValueSetted.vue";

import RadioButton from "primevue/radiobutton";

const props = defineProps({
  serie: Object,
});

const selectedAnswers = ref(Array());

</script>
<template>
  <ScrollPanel style="width: 100%; height: 46rem;">
    <VQuestion v-for="(question, index) in props.serie?.arrayquestion" :id_question="question.id_question"
      :index="index + 1" :title="question.statement">
      <VRadioButton class="answer" v-if="question.fk_id_type_question == 2" v-for="answer in question.arrayanswer"
        :key="answer.id_answer" :id_answer="answer.id_answer" :text="answer.text">
        <RadioButton v-model="selectedAnswers[question.id_question]" :inputId="answer.id_answer"
          :name="question.id_question + ''" :value="answer.id_answer" />
      </VRadioButton>

      <VMultipleOptionValueSetted class="answer" v-else-if="question.fk_id_type_question == 5" v-for="answer in question.arrayanswer">
        {{ answer.text }}
      </VMultipleOptionValueSetted>
    </VQuestion>
  </ScrollPanel>
</template>
<style></style>
