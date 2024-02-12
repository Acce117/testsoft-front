<script setup lang="ts">
import type { Test } from '@/modules/test/classes/test-class';
import InputNumber from 'primevue/inputnumber';
import { computed, inject, ref } from 'vue';
import VInputNumber from './VInputNumber.vue';

const props = defineProps({
    id_question: String,
    possible_answers: Array<{text: string, id_answer: string}>
});

const test = inject<Test>('test');
test.answers[`${props.id_question}`] = {};

//TODO verify from where this value comes
const maxPoints = 10

//TODO validate asignation
const distributedPoints = ref(0);

const points = ref(maxPoints);

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