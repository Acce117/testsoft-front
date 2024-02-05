<script setup lang="ts">
const props = defineProps({
  text: String,
});
</script>
<template>
  <label class="radio-button-answer">
    <slot></slot>
    
    <span></span>{{ props.text }}</label
  >
</template>
<style>
.radio-button-answer input {
  display: none;
}
.radio-button-answer {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  border-radius: 1.5rem;
  padding: .5rem;
  transition: all ease 0.2s;
}

.radio-button-answer:has(input[type="radio"]:not(:checked)):hover {
  box-shadow: 0 0 0.5rem 0 black;
  cursor: pointer;
}

.radio-button-answer span {
  display: inline-block;
  font-size: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  border: 0.2rem solid black;
  border-radius: 100%;
  transition: all 0.4s;
  position: relative;
}

.radio-button-answer input:checked ~ span {
  box-shadow: 0 0 0.5rem 0 black;
}

.radio-button-answer input:checked ~ span:after {
  transform: scale(1);
  opacity: 1;
}

.radio-button-answer span:after {
  content: "";
  border-radius: 100%;
  position: absolute;
  background-color: black;
  top: 20%;
	left: 20%;
	width: 60%;
	height: 60%;
  opacity: 0;
  transition: 0.3s ease;
  transform: scale(0);
}
@media (min-width: 768px) {
  .radio-button-answer{
    font-size: 1.5rem;
  }
}
</style>
