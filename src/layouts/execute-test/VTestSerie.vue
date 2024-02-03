<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel, Pagination } from "swiper/modules";
const modules = [FreeMode, Scrollbar, Mousewheel, Pagination];
import VSingleOptionQuestion from "./components/VSingleOptionQuestion.vue";
import { ref } from "vue";

const answers = [
  { id_answer: 1, text: "respuesta 1" },
  { id_answer: 2, text: "respuesta 2" },
];
let questions = ref();
const pagination = {
  clickable: true,
  renderBullet: function (index:number, className:string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

questions.value = [
  { id_question: 1, statement: "pregunta 1" },
  { id_question: 2, statement: "pregunta 2" },
  { id_question: 3, statement: "pregunta 3" },
  { id_question: 4, statement: "pregunta 4" },
  { id_question: 5, statement: "pregunta 5" },
  { id_question: 6, statement: "pregunta 6" },
  { id_question: 7, statement: "pregunta 7" },
  { id_question: 8, statement: "pregunta 8" },
  { id_question: 9, statement: "pregunta 9" },
  { id_question: 10, statement: "pregunta 10" },
  { id_question: 11, statement: "pregunta 11" },
  { id_question: 12, statement: "pregunta 12" },
];
const results = ref([]);

</script>
<template>
  <swiper
    :direction="'vertical'"
    :spaceBetween="10"
    :slidesPerView="3"
    :freeMode="true"
    :mousewheel="true"
    :pagination="pagination"
    :modules="modules"
    class="scroll-container"
  >
    <swiper-slide v-for="question in questions">
      <VSingleOptionQuestion
        :id="question.id_question"
        :title="question.statement"
        :answers="answers"
        @emit_answer_id="(answer_id:String)=>results.push(answer_id)"
      />
    </swiper-slide>
  </swiper>
</template>
<style scoped>
.scroll-container {
  height: 53rem;
}
</style>
