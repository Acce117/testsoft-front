<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";

import type { TestExecution } from "@/modules/test/classes/testExecution";
import { WrittenResponseQuestion } from "@/modules/test/classes/writtenResponseQuestion-class";
import Textarea from "primevue/textarea";

const props = defineProps({
  id_question: {
    type: Number,
    required: true
  },
  changeInvalid: { type: Function, required: true }
});

const test = inject<TestExecution>("test");
const executeTest = inject('executeTest')


const changeAnswer = (value: string) => {
  if (!test.questions[`${props.id_question}`])
    test.questions[`${props.id_question}`] = new WrittenResponseQuestion(props.id_question);
  test.questions[`${props.id_question}`].setAnswer(value)
  executeTest.saveTestExecutionInLocalStorage(test?.questions)
}
let question = ref(new WrittenResponseQuestion(props.id_question))

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(test.questions[`${props.id_question}`], props.changeInvalid)
)

onMounted(() => {
  if (test.questions[`${props.id_question}`]) {
    const recoveredQuestion = new WrittenResponseQuestion(props.id_question)
    recoveredQuestion.setAnswer(test.questions[`${props.id_question}`].answer)
    question.value = recoveredQuestion
    test.questions[`${props.id_question}`] = recoveredQuestion
  }
})

</script>
<template>
  <div class=" answer overflow-auto">
    <Textarea rows="2" @update:model-value="changeAnswer" fluid v-model="question.answer" text-lg :invalid />
  </div>
</template>
<style></style>
