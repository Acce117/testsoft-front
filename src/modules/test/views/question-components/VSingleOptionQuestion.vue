<script setup lang="ts">
import VCheckboxAnswer from "@/components/VCheckboxAnswer.vue";
import { ref } from "vue";
const props = defineProps({
  id: String,
  title: String,
  answers: Array,
});
const checkedAnswer = ref("");
const question = ref();
const emit = defineEmits(["emit_answer_id"]);
const answerChecked = () => {
  emit("emit_answer_id", checkedAnswer);
  question.value.classList.remove("question-not-responded");
};
</script>
<template>
  <div class="single-option-question" ref="question">
    <h4 class="single-option-question__title">{{ props.title }}</h4>
    <div class="single-option-question__content">
      <VCheckboxAnswer
        v-for="answer in props.answers"
        :id="answer.id_answer"
        :text="answer.text"
      >
        <input
          type="radio"
          :name="props.id"
          :value="answer.id_answer"
          v-model="checkedAnswer"
          @change="answerChecked()"
      /></VCheckboxAnswer>
    </div>
  </div>
</template>
<style>
.single-option-question {
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.6rem 0.6rem #00000030;
}

.single-option-question__title {
  padding: 1rem;
  background-color: black;
  font-size: 1.2rem;
  width: 100%;
  color: white;
}
.single-option-question__content {
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
  .single-option-question {
    width: 30rem;
  }
  
}
@media (min-width: 768px) {
  .single-option-question {
    width: 50rem;
  }
  .single-option-question__title {
    font-size: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .single-option-question {
    width: 70rem;
  }
  .single-option-question__title {
    font-size: 2rem;
  }
}
</style>
