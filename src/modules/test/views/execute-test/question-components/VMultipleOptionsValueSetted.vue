<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
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

let question = ref(new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints))

const distributedPoints = ref(0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

let timeOutIdToast: number;
const updateInput = (value: number, oldValue: number, id_answer: number | string) => {
  if (!test.questions[`${props.id_question}`])
    test.questions[`${props.id_question}`] = new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints);
 
  clearTimeout(timeOutIdToast);
  toast.removeAllGroups();

  distributedPoints.value += value - oldValue;
  if (actualPoints.value == -1)
    test.questions[`${props.id_question}`].answer[`${id_answer}`] = oldValue
  else {
    test.questions[`${props.id_question}`].answer[`${id_answer}`] = value
    executeTest.saveTestExecutionInLocal(test?.questions)
    toast.add({
      severity: "info",
      summary: "Info",
      detail: `${t('remaining-points')} ${props.question_index}: ${actualPoints.value}`,
      life: 30000,
    });
    timeOutIdToast = setTimeout(() => {
      toast.removeAllGroups();
    }, 3000);
  }


};

const invalid = computed(() =>
  executeTest.isAnswerInvalidInQuestion(test.questions[`${props.id_question}`], props.changeInvalid)
)

onMounted(() => {
  if (test.questions[`${props.id_question}`]){
    const recoveredQuestion = new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints)
    recoveredQuestion.setAnswer(test.questions[`${props.id_question}`].answer)
    question.value = recoveredQuestion
    test.questions[`${props.id_question}`] = recoveredQuestion
    console.log(Object.values(recoveredQuestion.answer))
    distributedPoints.value = Object.values(recoveredQuestion.answer).reduce((total, current)=>total+current)

  }  
})
</script>

<template>
  <span text-base md:text-lg>{{ t('remaining-points') }}: <span text-primary
      font-bold>{{ actualPoints }}</span></span>
  <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <label :for="answer.id_answer" flex text-base md:text-lg text-justify gap-2 flex-items-center h-full w-full
      flex-justify-between>
      <span w-full mr-2>{{ answer.text }}</span>
      <VInputNumber :min="0" :max="actualPoints" @vue:mounted="
        question.answer[`${answer.id_answer}`] = 0
        " @update:value="(value, oldValue) => updateInput(value, oldValue, answer.id_answer)" v-model.number="question.answer[`${answer.id_answer}`]
          " :invalid />
    </label>
  </div>
</template>
<i18n lang="json">{
  "es": {
    "remaining-points": "Puntos restantes en la pregunta"
  },
  "en": {
    "remaining-points": "Remaining points in the question"
  }
}</i18n>
