<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { watch, ref } from 'vue';

const props = defineProps({
    max: Number,
    min: Number
})
const model = defineModel<number>();

const emit = defineEmits(['update:value']);
const selfPoints = ref(0)
watch(
    ()=> model.value,
    (value, oldValue) => {
        if(oldValue != undefined && oldValue != null) {
            emit('update:value', value, oldValue);
            selfPoints.value = value
        }
            
    }
)


</script>

<template>
    <InputNumber
     v-model="model"
     showButtons
     :min="props.min"
     :max="props.max+selfPoints"
     :allow-empty="false"
     input-id="integeronly"
     :use-grouping="false"
    />
     
</template>
