<script setup lang="ts">
import { computed, inject } from "vue";

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

if (!test.questions[`${props.id_question}`])
  test.questions[`${props.id_question}`] = new WrittenResponseQuestion(props.id_question);
let question = test.questions[`${props.id_question}`]

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(question, props.changeInvalid)
)

</script>
<template>
  <div class=" answer overflow-auto">
    <Textarea rows="2"  fluid v-model="question.answer" text-lg  :invalid />
  </div>
</template>
<style></style>
