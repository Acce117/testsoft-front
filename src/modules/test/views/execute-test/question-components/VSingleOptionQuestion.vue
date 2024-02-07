<script setup lang="ts">
import RadioButton from "primevue/radiobutton";
import { inject } from 'vue';
const props = defineProps({
  id_question: String,
  possible_answers: Array<{text: string, id_answer: string}>,
});

const answers = inject<{[key: string]: any}>('answers') || {};
answers[`${props.id_question}`] = {};
</script>
<template>
  <div class="radio-button-answer answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
    <RadioButton
          v-model="answers[`${props.id_question}`]"
          :inputId="answer.id_answer"
          :name="props.id_question + ''"
          :value="answer.id_answer"
        />
    <label :for="answer.id_answer">
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
  border-radius: 1.5rem;
  padding: 0.5rem;
  transition: all ease 0.2s;
}
.radio-button-answer:has(input[type="radio"]:not(:checked)):hover,
.radio-button-answer:has(input[type="radio"]:not(:checked)) label:hover {
  cursor: pointer;
}
.radio-button-answer:has(input[type="radio"]:not(:checked)):hover {
  box-shadow: 0 0 0.5rem 0 black;
}


</style>

