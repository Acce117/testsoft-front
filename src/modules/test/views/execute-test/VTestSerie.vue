<script setup lang="ts">
import { inject } from "vue";
import VQuestion from "./question-components/VQuestion.vue";
import VMultipleOptionsValueSetted from "./question-components/VMultipleOptionsValueSetted.vue";
import VSingleOptionQuestion from "./question-components/VSingleOptionQuestion.vue";
import type { Test } from "../../classes/testAplication";

const props = defineProps({
  serie: Object,
});
const emit = defineEmits(['time-serie-over'])
const validatedTestFirstTime = inject('executeTest').validatedTestFirstTime
const test = inject<Test>("test");

</script>

<template>
  <div>
    <h3 text-xl w-full text-center mb-2 mt-0 text-black>
      {{ serie.description }}
    </h3>
    <VQuestion v-for="(question, index) in props.serie?.questions" :key="question.id_question"
      :id_question="question.id_question" :question_index="index + 1" :title="question.statement" :class="{
        'invalid-input': validatedTestFirstTime
          ? !test?.validateComponent(question.id_question)
          : false,
      }">

      <VSingleOptionQuestion :id_question="question.id_question" :possible_answers="question.answers" />
      <VSingleOptionQuestion v-if="question.fk_id_type_question == 2" />

      <VMultipleOptionsValueSetted v-else-if="question.fk_id_type_question == 5" :id_question="question.id_question"
        :possible_answers="question.answers" :question_index="index + 1"
        :maxPoints="question.arrayquestion_top_value[0]?.top_value" />
    </VQuestion>
  </div>
</template>
<style></style>
