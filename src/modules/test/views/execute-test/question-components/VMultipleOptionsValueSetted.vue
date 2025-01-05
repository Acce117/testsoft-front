<script setup lang="ts">
import { computed, inject, ref } from "vue";
import VInputNumber from "./VInputNumber.vue";
import { useToast } from "primevue/usetoast";
import { MultipleOptionsValueSettedQuestion } from "@/modules/test/classes/multipleOptionValueSettedQuestion-class";
import { useI18n } from "vue-i18n";
import type { TestExecution } from "@/modules/test/classes/testExecution";
const { t } = useI18n()

const toast = useToast();
const props = defineProps({
  id_question: {
    type: Number,
    required: true
  },
  question_index: Number,
  possible_answers: Array<{ text: string; id_answer: string }>,
  maxPoints: {
    type: [Number, String],
    required: true,
  },
  changeInvalid: { type: Function, required: true }

});
const test = inject<TestExecution>("test");
const executeTest = inject('executeTest')


if (!test.questions[`${props.id_question}`])
  test.questions[`${props.id_question}`] = new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints);
let question = test.questions[`${props.id_question}`]



const distributedPoints = ref(0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

let timeOutIdToast: number;
const updateInput = (value: number, oldValue: number, id_answer: number) => {
  clearTimeout(timeOutIdToast);
  toast.removeAllGroups();
  
  distributedPoints.value += value - oldValue;
  if (actualPoints.value == -1)
    test.questions[`${props.id_question}`].answer[`${id_answer}`] = oldValue
  else {
    toast.add({
      severity: "info",
      summary: "Info",
      detail: `${t('execute-test.question-components.5.remaining-points')} ${props.question_index}: ${actualPoints.value}`,
      life: 30000,
    });
    timeOutIdToast = setTimeout(() => {
      toast.removeAllGroups();
    }, 3000);
  }


};

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(question, props.changeInvalid)
)
</script>

<template>
  <span text-lg>{{ $t('execute-test.question-components.5.remaining-points') }}: {{ actualPoints }}</span>
  <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <label :for="answer.id_answer" flex text-lg text-slate-800 gap-2 flex-items-center h-full w-full
      flex-justify-between>
      <span w-full>{{ answer.text }}</span>
      <VInputNumber :min="0" :max="actualPoints" @vue:mounted="
        test.questions[`${props.id_question}`].answer[`${answer.id_answer}`] = 0
        " @update:value="(value, oldValue) => updateInput(value, oldValue, answer.id_answer)" v-model.number="test.questions[`${props.id_question}`].answer[`${answer.id_answer}`]
          " :invalid />
    </label>
  </div>
</template>
