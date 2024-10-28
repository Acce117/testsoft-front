<script setup lang="ts">
const props = defineProps({
  id_question: String,
  question_index: Number,
  title: String,
});
</script>
<template>
  <Transition name="fade">
    <div class="question"  flex flex-col overflow-hidden bg-white rounded-6 m-8 :id="props.id_question">
      <h4 pa-1rem bg-black  font-size-1.6rem  w-full  text-white md:font-size-2rem>{{ props.question_index + `-` + props.title }}</h4>
      <div relative flex m-1rem flex-col gap-1rem>
        <slot :id_question :question_index></slot>
      </div>
    </div>
  </Transition>
</template>
<style>
.question {
  width: 70%;
  box-shadow: var(--shadow);
  animation: fade-in 1s;
}
.invalid-input {
  transition: all ease 0.5s;
  box-shadow: 0 0 0.3rem 0.3rem rgba(255, 0, 0, 0.7);
}
.answer {
  font-size: 1.5rem;
  transition: all ease 0.2s;
  border-radius: var(--bradius);
  padding: 0.4rem;
}
.answer:has(input:not(:checked)):hover {
  box-shadow: var(--shadow);
}

@media (min-width: 768px) {
  .question {
    width: 80%;
  }
  .answer {
    font-size: 1.8rem;
  }
}
</style>
