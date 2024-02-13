<script setup lang="ts">
import { inject } from "vue";

import RadioButton from "primevue/radiobutton";

import type { Test } from "@/modules/test/classes/test-class";

const props = defineProps({
  id_question: String,
  possible_answers: Array<{ text: string; id_answer: string }>,
});

const test = inject<Test>("test");
</script>
<template>
  <div
    class="radio-button-answer answer"
    v-for="answer in props.possible_answers"
    :key="answer.id_answer"
  >
    <label :for="answer.id_answer">
      <RadioButton
        v-model="test.answers[`${props.id_question}`]"
        :inputId="answer.id_answer"
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
  gap: 1rem;
}
.radio-button-answer:has(input[type="radio"]:not(:checked)):hover,
.radio-button-answer:has(input[type="radio"]:not(:checked)) label:hover {
  cursor: pointer;
}

.radio-button-answer label {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
