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
     showButtons
     :min="props.min"
     :max="props.max"
     :allow-empty="false"
     input-id="integeronly"
     :use-grouping="false">
    </InputNumber>
</template>
<style>
.p-inputwrapper{
    display: flex;
    align-items: center;
    
    border-radius: 1.5rem;
    transition: all ease .2s;
}

.p-inputnumber-input {
    text-align: center;
    font-size: 1.8rem;
    width: 3rem;
    border:none;
}
.p-button.p-button-icon-only{
    width: 2rem;
    height: 1.5rem;
    background-color: transparent;
    box-shadow: none;
}
.p-disabled, .p-component:disabled{
    opacity: 0.3;
}

</style>