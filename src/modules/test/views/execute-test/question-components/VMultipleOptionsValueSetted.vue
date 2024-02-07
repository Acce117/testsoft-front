<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { inject } from 'vue';

const props = defineProps({
    id_question: String,
    possible_answers: Array<{text: string, id_answer: string}>
});

const answers = inject<{[key: string]: any}>('answers') || {};
answers[`${props.id_question}`] = {};
</script>

<template>
    <div class="answer" v-for="answer in props.possible_answers" :key="answer.id_answer">
        <label for="">
            {{ answer.text }}
            <InputNumber v-model="answers[`${props.id_question}`][`${answer.id_answer}`]" input-id="integeronly" :use-grouping="false"/>
        </label>
    </div>
</template>