<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FreeMode, Scrollbar, Mousewheel, Pagination } from "swiper/modules";

import VSingleOptionQuestion from "./question-components/VSingleOptionQuestion.vue";
import { Serie } from "../classes";

const props = defineProps({
  serie: Serie
})

const modules = [FreeMode, Scrollbar, Mousewheel, Pagination];

const answers = [
  { id_answer: 1, text: "respuesta 1" },
  { id_answer: 2, text: "respuesta 2" },
];

const pagination = {
  clickable: true,
  renderBullet: function (index:number, className:string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};

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
    <swiper-slide v-for="question in props.serie?.questions">
      <!--TODO fix the property fk_id_type_question-->
      <VSingleOptionQuestion v-if="question.fk_id_type_question === 2"
        :title="question.statement"
        :answers="answers"
      />
    </swiper-slide>
  </swiper>
</template>
<style scoped>
.scroll-container {
  height: 53rem;
}
</style>
