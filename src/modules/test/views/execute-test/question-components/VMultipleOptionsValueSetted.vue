<script setup lang="ts">
import type { Test } from "@/modules/test/classes/test-class";
import { computed, inject, ref, watch } from "vue";
import VInputNumber from "./VInputNumber.vue";
import { useToast } from "primevue/usetoast";
import { MultipleOptionsValueSettedQuestion } from "@/modules/test/classes/multipleOptionValueSettedQuestion-class";
const toast = useToast();
const props = defineProps({
  id_question: {
    type: String,
    required: true
  },
  question_index: Number,
  possible_answers: Array<{ text: string; id_answer: string }>,
  maxPoints: {
    type: [Number, String],
    required: true,
  },
});
const test = inject<Test>("test");

if(!test.questions[`${props.id_question}`]) 
  test.questions[`${props.id_question}`] = new MultipleOptionsValueSettedQuestion(props.id_question, props.maxPoints);

const distributedPoints = ref(0);

const points = ref(props.maxPoints || 0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

let timeOutIdToast: number;
const updateInput = (value: number, oldValue: number) => {
  clearTimeout(timeOutIdToast);
  toast.removeAllGroups();
  distributedPoints.value += value - oldValue;
  toast.add({
    severity: "info",
    summary: "Info",
    detail: `Puntos restantes en pregunta ${props.question_index}: ${actualPoints.value}`,
    life: 30000,
  });
  timeOutIdToast = setTimeout(() => {
    toast.removeAllGroups();
  }, 3000);
};
</script>

<template>
  <span class="actual-points">Puntos restantes: {{ actualPoints }}</span>
  <div
    class="answer"
    v-for="answer in props.possible_answers"
    :key="answer.id_answer"
  >
    <label for="">
      {{ answer.text }}
      <VInputNumber
        :min="0"
        :max="actualPoints"
        @vue:mounted="
          test.questions[`${props.id_question}`].answer[`${answer.id_answer}`] = 0
        "
        @update:value="(value, oldValue) => updateInput(value, oldValue)"
        v-model.number="
          test.questions[`${props.id_question}`].answer[`${answer.id_answer}`]
        "
      />
    </label>
  </div>
</template>

<style scoped>
.answer label {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.actual-points {
  font-size: 1.5rem;
}
@media (min-width: 768px) {
  .actual-points {
    font-size: 2rem;
  }
}
</style>
