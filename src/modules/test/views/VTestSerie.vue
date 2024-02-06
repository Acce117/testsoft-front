<script setup lang="ts">
import { ref, type PropType } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel, Pagination } from "swiper/modules";

import VQuestion from "./question-components/VQuestion.vue";
import VCheckboxAnswerVue from "./question-components/VCheckboxAnswer.vue";
import { type SerieInterface } from "../types";
import VMultipleOptionValueSetted from "./question-components/VMultipleOptionValueSetted.vue";

const props = defineProps({
  serie: Object
})

const modules = [FreeMode, Scrollbar, Mousewheel, Pagination];

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

const results = ref([]);

</script>
<template>
  <swiper :direction="'vertical'" :spaceBetween="10" :slidesPerView="3" :freeMode="true" :mousewheel="true"
    :pagination="pagination" :modules="modules" class="scroll-container">
    <swiper-slide v-for="question in props.serie?.arrayquestion">
      <!--TODO fix the property fk_id_type_question-->
      <!--VSingleOptionQuestion v-if="question.fk_id_type_question === 2"
        :title="question.statement"
        :answers="answers"
      /-->
      <VQuestion :title="question.statement">

        <VCheckboxAnswerVue v-if="question.fk_id_type_question == 2" v-for="answer in question.arrayanswer" :id="answer.id_answer"
          :text="answer.text">
          <input type="radio" :name="question.id_question + ''" :value="answer.id_answer">
        </VCheckboxAnswerVue>

        <VMultipleOptionValueSetted v-else-if="question.fk_id_type_question == 5" v-for="answer in question.arrayanswer">
          {{ answer.text }}
        </VMultipleOptionValueSetted>

      </VQuestion>
    </swiper-slide>
  </swiper>
</template>
<style scoped>
.scroll-container {
  height: 53rem;
}
</style>
