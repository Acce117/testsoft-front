<script setup lang="ts">
import VCheckboxAnswer from "./VCheckboxAnswer.vue";
import { ref } from "vue";
const props = defineProps({
  id: String,
  title: String,
});
//const checkedAnswer = ref("");
const question = ref();
const emit = defineEmits(["emit_answer_id"]);
/*const answerChecked = () => {
  emit("emit_answer_id", checkedAnswer);
  question.value.classList.remove("question-not-responded");
};*/
</script>
<template>
  <div class="question" ref="question">
    <h4 class="question__title">{{ props.title }}</h4>
    <div class="question__content">
      <slot></slot>
    </div>
  </div>
</template>
<style>
.question {
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.6rem 0.6rem #00000030;
}

.question__title {
  padding: 1rem;
  background-color: black;
  font-size: 1.2rem;
  width: 100%;
  color: white;
}
.question__content {
  display: flex;
  margin: 1rem;
  flex-direction: column;
  gap: 1.5rem;
}
.question-not-responded {
  transition: all ease 0.5s;
  box-shadow: 0 0 0.6rem 0.6rem rgba(255, 0, 0, 0.7);
}
@media (min-width: 480px) {
  .question {
    width: 30rem;
  }
  
}
@media (min-width: 768px) {
  .question {
    width: 50rem;
  }
  .question__title {
    font-size: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .question {
    width: 70rem;
  }
  .question__title {
    font-size: 2rem;
  }
}
</style>
