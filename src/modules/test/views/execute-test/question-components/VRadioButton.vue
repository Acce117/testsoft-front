<script setup lang="ts">
const props = defineProps({
  id_answer: String,
  text: String,
});
</script>
<template>
  <div class="radio-button-answer">
    <slot></slot>
    <label :for="props.id_answer">
      {{ props.text }}
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
