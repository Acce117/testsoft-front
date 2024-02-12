<script setup lang="ts">
import type { Test } from '@/modules/test/classes/test-class';
import { computed, inject, ref } from 'vue';
import VInputNumber from './VInputNumber.vue';

const props = defineProps({
    id_question: String,
    possible_answers: Array<{text: string, id_answer: string}>,
    maxPoints: Number
});

const test = inject<Test>('test');
test.answers[`${props.id_question}`] = {};

//TODO validate asignation
const distributedPoints = ref(0);

const points = ref(props.maxPoints);

const actualPoints = computed(()=>points.value - distributedPoints.value);

</script>

<template>
    <span>{{ actualPoints }}</span>
    <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
        <label for="">
            {{ answer.text }}
            <VInputNumber
                :min="0"
                :max="maxPoints"

                @vue:mounted="test.answers[`${props.id_question}`][`${answer.id_answer}`]=0"
                @update:value="(value, oldValue)=> distributedPoints += (value-oldValue)"

                v-model="test.answers[`${props.id_question}`][`${answer.id_answer}`]"
            />
        </label>
    </div>
</template>