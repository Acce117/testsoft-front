<script setup lang="ts">
    
const props = defineProps({
  text: String,
});
</script>
<template>
  <label class="checkbox-answer">
    <slot></slot>
    <span></span>{{ props.text }}</label
  >
</template>
<style>
.checkbox-answer input {
  display: none;
}
.checkbox-answer {
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  transition: all ease 0.2s;
}

.checkbox-answer input:valid ~ label,
.checkbox-answer input:focus ~ label {
  color: white;
  top: -2.8rem;
  font-size: 1rem;
}

.checkbox-answer span {
  display: inline-block;
  font-size: 1rem;
  height: 2.5rem;
  width: 2.5rem;
  background: white;
  border: 0.2rem solid black;
  border-radius: 100%;
  transition: all 0.4s;
  color: white;
}

.checkbox-answer input:checked ~ span {
  background-color: black;
  position: relative;
  box-shadow: 0 0 0.5rem 0 black;
}

.checkbox-answer input:checked ~ span:after {
  opacity: 1;
}

.checkbox-answer span:after {
  content: "";
  position: absolute;
  border: solid white;
  border-width: 0 0.3rem 0.3rem 0;
  transform: rotate(45deg);
  width: 1rem;
  height: 1.7rem;
  left: 0.7rem;
  opacity: 0;
  transition: 0.3s ease;
}
@media (min-width: 768px) {
  .checkbox-answer{
    font-size: 1.5rem;
  }
}
</style>
