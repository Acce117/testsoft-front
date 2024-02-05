<script setup lang="ts">
import { ref, type PropType, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel, Pagination } from "swiper/modules";

import VQuestion from "./question-components/VQuestion.vue";
import { type SerieInterface } from "../types";
import VRadioButton from "./question-components/VRadioButton.vue";
import VMultipleOptionValueSetted from "./question-components/VMultipleOptionValueSetted.vue";

import RadioButton from "primevue/radiobutton";

const props = defineProps({
  serie: Object as PropType<SerieInterface>,
});

const modules = [FreeMode, Scrollbar, Mousewheel, Pagination];

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

const results = ref([]);
const getSlidesPerView = () => {
  if (props.serie?.questions[0].type == 2) return 3;
  else return 1;
};
const selectedAnswers = ref(Array())
watch(selectedAnswers,(newValue)=>{
  console.log(newValue)
})
</script>
<template>
  <swiper
    :direction="'vertical'"
    :spaceBetween="10"
    :slidesPerView="getSlidesPerView()"
    :freeMode="true"
    :mousewheel="true"
    :pagination="pagination"
    :modules="modules"
    class="scroll-container"
  >
    <swiper-slide v-for="(question, index) in props.serie?.questions">
      <!--TODO fix the property fk_id_type_question-->
      <!--VSingleOptionQuestion v-if="question.fk_id_type_question === 2"
        :title="question.statement"
        :answers="answers"
      /-->

      <VQuestion
        :id_question="question.id_question"
        :index="index + 1"
        :title="question.statement"
      >
        <VRadioButton
          v-if="question.type == 2"
          v-for="answer in question.arrayanswer"
          :key="answer.id_answer"
          :id_answer="answer.id_answer"
          :text="answer.text"
        >
          <RadioButton
            v-model="selectedAnswers[question.id_question]"
            :inputId="answer.id_answer"
            :name="question.id_question + ''"
            :value="answer.id_answer"
          />
        </VRadioButton>

        <VMultipleOptionValueSetted
          v-else-if="question.type == 5"
          v-for="answer in question.arrayanswer"
        >
          {{ answer.text }}
        </VMultipleOptionValueSetted>
      </VQuestion>
    </swiper-slide>
  </swiper>
</template>
<style>
.scroll-container {
  height: 53rem;
}

.swiper-vertical > .swiper-pagination-bullets,
.swiper-pagination-vertical.swiper-pagination-bullets {
  right: -12rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  width: 15rem;
  height: 45rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0rem 0rem 0.6rem 0.6rem #00000030;
  transition: all ease 0.5s;
  padding: 1rem;
}
.swiper-vertical > .swiper-pagination-bullets:hover,
.swiper-pagination-vertical.swiper-pagination-bullets:hover {
  right: -2rem;
}
</style>
