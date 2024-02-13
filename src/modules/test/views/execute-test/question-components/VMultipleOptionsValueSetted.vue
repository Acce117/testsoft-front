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

const test = inject<Test>('test');
test.answers[`${props.id_question}`] = {};

//TODO validate asignation
const distributedPoints = ref(0);

const points = ref(props.maxPoints || 0);

const actualPoints = computed(() => props.maxPoints - distributedPoints.value);

const handleInput = (event: any, id_question: number | string, id_answer: number | string) => {
    if (distributedPoints.value == 10 && event.value > event.formattedValue) {
        test.answers[`${id_question}`][`${id_answer}`] = event.formattedValue;
        event.originalEvent.target.value = event.formattedValue;
    }
}
</script>

<template>
    <span>{{ actualPoints }}</span>
    <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
        <label for="">
            {{ answer.text }}
            <VInputNumber :min="0" :max="parseInt(props.maxPoints)"
                @vue:mounted="test.answers[`${props.id_question}`][`${answer.id_answer}`] = 0"
                @update:value="(value, oldValue) => distributedPoints += (value - oldValue)" 
                @input="(event: any)=>handleInput(event, props.id_question, answer.id_answer)"
                v-model.number="test.answers[`${props.id_question}`][`${answer.id_answer}`]" />

        </label>
    </div>
</template>