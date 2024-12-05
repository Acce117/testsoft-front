<script setup lang="ts">
import type { TestAplication } from "@/modules/test/classes/testAplication";
import { computed, inject, ref } from "vue";
import VInputNumber from "./VInputNumber.vue";
import { useToast } from "primevue/usetoast";
import { MultipleOptionsValueSettedQuestion } from "@/modules/test/classes/multipleOptionValueSettedQuestion-class";
import { useI18n } from "vue-i18n";
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
const test = inject<TestAplication>("test");
const executeTest = inject('executeTest')


if (!test.questions[`${props.id_question}`])
  test.questions[`${props.id_question}`] = new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints);
let question = test.questions[`${props.id_question}`]



const distributedPoints = ref(0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

let timeOutIdToast: number;
const updateInput = (value: number, oldValue: number) => {
  clearTimeout(timeOutIdToast);
  toast.removeAllGroups();
  distributedPoints.value += value - oldValue;
  toast.add({
    severity: "info",
    summary: "Info",
    detail: `${t('execute-test.question-components.5.remaining-points')} ${props.question_index}: ${actualPoints.value}`,
    life: 30000,
  });
  timeOutIdToast = setTimeout(() => {
    toast.removeAllGroups();
  }, 3000);
};

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(question, props.changeInvalid)
)
</script>

<template>
  <span font-size-2rem>{{ $t('execute-test.question-components.5.remaining-points') }}: {{ actualPoints }}</span>
  <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <label for="" flex w-full flex-justify-between flex-items-center>
      {{ answer.text }}
      <VInputNumber :min="0" :max="actualPoints" @vue:mounted="
        test.questions[`${props.id_question}`].answer[`${answer.id_answer}`] = 0
        " @update:value="(value, oldValue) => updateInput(value, oldValue)" v-model.number="test.questions[`${props.id_question}`].answer[`${answer.id_answer}`]
          " :invalid />
    </label>
  </div>
</template>
