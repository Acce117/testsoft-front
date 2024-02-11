<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { watch } from 'vue';

const props = defineProps({
    max: Number,
    min: Number
})
const model = defineModel<number>();

const emit = defineEmits(['update:value']);

watch(
    ()=> model.value,
    (value, oldValue) => {
        if(oldValue != undefined && oldValue != null) 
            emit('update:value', value, oldValue);
    }
)
</script>

<template>
    <InputNumber
     v-model="model"
     :min="props.min"
     :max="props.max"
     :allow-empty="false"
     input-id="integeronly"
     :use-grouping="false">
    </InputNumber>
</template>