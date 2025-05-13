<script setup lang="ts">
import { Card } from 'primevue';
import { ref } from 'vue';

const props = defineProps({
  id_question: Number,
  question_index: Number,
  title: String,
});

const invalid = ref(false)
const changeInvalid = (value: boolean) => invalid.value = value

</script>
<template>
  <Transition name="fade">
    <Card :class="{
      'invalid-input': invalid,
      'question': true
    }"    w-full max-w-60rem  my-2
      :id="props.id_question">
      <template #content>

        <p m-0 text-base md:text-lg text-justify w-full>{{ props.question_index + `-` + props.title }}</p>
        <div relative flex flex-col gap-4 mt-4>
          <slot :changeInvalid></slot>
        </div>
      </template>

    </Card>
  </Transition>
</template>
<style>
.question {
  animation: fade-in 1s;
}

.invalid-input {
  transition: all ease 0.5s;
  box-shadow: 0 0 0.2rem 0.2rem rgba(253, 106, 106, 0.7) !important;
}

.answer {
  transition: all ease 0.2s;


}

/* .answer:has(input:not(:checked)):hover {
  box-shadow: var(--shadow);
} */

@media (min-width: 768px) {

  .answer {
    font-size: 1.8rem;
  }
}
</style>
