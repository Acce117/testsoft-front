<script setup lang="ts">
import { inject } from "vue";
import VQuestion from "./question-components/VQuestion.vue";
import VMultipleOptionsValueSetted from "./question-components/VMultipleOptionsValueSetted.vue";
import VSingleOptionQuestion from "./question-components/VSingleOptionQuestion.vue";
import type { Test } from "../../classes/test-class";


const props = defineProps({
  serie: Object,
});

const validatedTestFirstTime = inject("validatedTestFirstTime")
const test = inject<Test>('test');

</script>

<template>
  <div>
    <VQuestion
      v-for="(question, index) in props.serie?.arrayquestion"
      :id_question="question.id_question"
      :index="index + 1"
      :title="question.statement"
      :class="{'question-not-responded': validatedTestFirstTime? !test?.validateComponent(question):false}"
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
        :maxPoints="question.arrayquestion_top_value[0]?.top_value"
      />
    </VQuestion>
  </div>
</template>
<style></style>
