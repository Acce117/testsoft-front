<script setup lang="ts">
import { computed, inject } from "vue";

import { MultipleOptionQuestion } from "@/modules/test/classes/multipleOptionQuestion-class";
import Checkbox from "primevue/checkbox";
import type { TestExecution } from "@/modules/test/classes/testExecution";

const props = defineProps({
  id_question: {
    type: Number,
    required: true
  },
  possible_answers: Array<{ text: string; id_answer: string }>,
  changeInvalid: { type: Function, required: true }
});

const test = inject<TestExecution>("test");
const executeTest = inject('executeTest')


if (!test.questions[`${props.id_question}`])
  test.questions[`${props.id_question}`] = new MultipleOptionQuestion(props.id_question);
let question = test.questions[`${props.id_question}`]

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(question, props.changeInvalid)
)

</script>
<template>
  <div class="checkbox-answer answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <label cursor-pointer :for="answer.id_answer" flex text-base md:text-lg text-justify text-slate-800 gap-2 flex-items-center w-fit h-full>
      <Checkbox v-model="question.answer" :inputId="answer.id_answer + ''" :name="props.id_question + ''"
        :value="answer.id_answer" :invalid />
      {{ answer.text }}
    </label>
  </div>
</template>
<style>
.checkbox-answer {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
