<script setup lang="ts">
import { computed, inject, ref } from "vue";

import RadioButton from "primevue/radiobutton";
import type { TestExecution } from "@/modules/test/classes/testExecution";
import { SingleOptionQuestion } from "@/modules/test/classes/singleOptionQuestion-class";

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




const changeAnswer = (value) => {
  if (!test.questions[`${props.id_question}`])
    test.questions[`${props.id_question}`] = new SingleOptionQuestion(props.id_question);
  test.questions[`${props.id_question}`].answer = value
}
let question = ref(new SingleOptionQuestion(props.id_question))

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(test.questions[`${props.id_question}`], props.changeInvalid)
)

</script>
<template>
  <div class="radio-button-answer answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <label cursor-pointer :for="'answer-'+ answer.id_answer" flex text-base md:text-lg text-justify gap-2 flex-items-center w-fit
      h-full>
      <RadioButton v-model="question.answer" :inputId="'answer-' + answer.id_answer" :name="props.id_question + ''"
        :value="answer.id_answer" :invalid @update:modelValue="changeAnswer" />
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
</style>



