<script setup lang="ts">
const props = defineProps({
  id_question: String,
  index: Number,
  title: String,
});
</script>
<template>
  <Transition name="fade">
    <div class="question" :id="props.id_question">
      <h4 class="question__title">{{ props.index + `-` + props.title }}</h4>
      <div class="question__content">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
<style>
.question {
  width: 25rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow);
  margin: 2rem auto;
}

.question__title {
  padding: 1rem;
  background-color: black;
  font-size: 1.2rem;
  width: 100%;
  color: white;
}
.question__content {
  position: relative;
  display: flex;
  margin: 1rem;
  flex-direction: column;
  gap: 1rem;
}
.question-not-responded {
  transition: all ease 0.5s;
  box-shadow: 0 0 0.3rem 0.3rem rgba(255, 0, 0, 0.7);
}
.answer {
  font-size: 1.2rem;
  transition: all ease 0.2s;
  border-radius: 1.5rem;
  padding: 0.4rem;
}
.answer:has(input:not(:checked)):hover {
  box-shadow: 0 0 0.5rem 0 black;
}
@media (min-width: 480px) {
  .question {
    width: 40rem;
  }
}
@media (min-width: 768px) {
  .question {
    width: 70rem;
  }
  .question__title {
    font-size: 1.5rem;
  }
  .answer {
    font-size: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .question {
    width: 80%;
  }
}
</style>
