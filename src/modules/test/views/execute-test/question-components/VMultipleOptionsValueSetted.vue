<script setup lang="ts">
import type { Test } from '@/modules/test/classes/test-class';
import { computed, inject, ref } from 'vue';
import VInputNumber from './VInputNumber.vue';

const props = defineProps({
    id_question: String,
    possible_answers: Array<{ text: string, id_answer: string }>,
    maxPoints: {
        type: [Number, String],
        required: true
    },
});
const puntuation = ref(false);
const test = inject<Test>("test");
test.answers[`${props.id_question}`] = {};

const distributedPoints = ref(0);

const points = ref(props.maxPoints || 0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

const handleInput = (event: any, id_question: number | string, id_answer: number | string) => {
    const isGreater = distributedPoints.value + (event.value-event.formattedValue) > 10;
    if ( isGreater ) {
        test.answers[`${id_question}`][`${id_answer}`] = event.formattedValue;
        event.originalEvent.target.value = event.formattedValue;
    }
}

let timeOutId:number

const updateInput = (value: number, oldValue: number) => {
  distributedPoints.value += value - oldValue;
  if (!puntuation.value) {
    puntuation.value = true;
    timeOutId = setTimeout(() => {
      puntuation.value = false;
    }, 2000);
  }else {
    clearTimeout(timeOutId)
    timeOutId = setTimeout(() => {
      puntuation.value = false;
    }, 2000);
}
};
</script>

<template>
    <Transition name="fade">
    <span v-if="puntuation" class="actual-points-fixed box-shadow-box"
      >Puntos restantes: {{ actualPoints }}</span
    >
  </Transition>
  <span class="actual-points"
    >Puntos restantes: {{ actualPoints }}</span
  >
    <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
        <label for="">
            {{ answer.text }}
            <VInputNumber 
                :min="0"
                :max="parseInt(props.maxPoints)"
                @vue:mounted="test.answers[`${props.id_question}`][`${answer.id_answer}`] = 0"
                @update:value="(value, oldValue) => updateInput(value, oldValue)" 
                @input="(event: any)=>handleInput(event, props.id_question, answer.id_answer)"
                v-model.number="test.answers[`${props.id_question}`][`${answer.id_answer}`]" 
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
.actual-points-fixed {
  font-size: 1.5rem;
  padding: 1rem;
  position: fixed;
  width: 10rem;
  top: 16rem;
  left: 1%;
  z-index: 1000;
  user-select: none;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.2rem);
  -webkit-backdrop-filter: blur(1.2rem);
}
@media (min-width: 768px) {
  .actual-points {
    font-size: 2rem;
  }
}
</style>