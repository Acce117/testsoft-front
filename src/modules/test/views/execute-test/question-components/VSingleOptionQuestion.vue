<script setup lang="ts">
import { inject } from "vue";

import RadioButton from "primevue/radiobutton";

import type { TestAplication } from "@/modules/test/classes/testAplication";
import { SingleOptionQuestion } from "@/modules/test/classes/singleOptionQuestion-class";

const props = defineProps({
  id_question: {
    type:Number,
    required:true
  },
  possible_answers: Array<{ text: string; id_answer: string }>,
});

const test = inject<TestAplication>("test");

if(!test.questions[`${props.id_question}`])
  test.questions[`${props.id_question}`] = new SingleOptionQuestion(props.id_question);

</script>
<template>
  <div
    class="radio-button-answer answer"
    v-for="answer in props.possible_answers"
    :key="answer.id_answer"
  >
    <label cursor-pointer :for="answer.id_answer" flex text-lg text-slate-800 gap-2 flex-items-center w-fit h-full>
      <RadioButton
        v-model="test.questions[`${props.id_question}`].answer"
        :inputId="answer.id_answer+''"
        :name="props.id_question + ''"
        :value="answer.id_answer"
      />
      {{ answer.text }}
    </label>
  </div>
</template>
<style>
.radio-button-answer {
  width: 100%;
  display: flex;
  align-items: center;
}
/* .radio-button-answer:has(input[type="radio"]:not(:checked)):hover,
.radio-button-answer:has(input[type="radio"]:not(:checked)) label:hover {
  cursor: pointer;
} */
</style>
