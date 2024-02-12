<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import VTestCard from "./components/VTestCard.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

import { useTests } from "@/modules/test/test";

const { result, loading } = useTests();

const modules = [Pagination, Navigation];
const pagination = {
  clickable: true,
  renderBullet: function (index:number, className:string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
};


</script>
<template>
  
    <h2 v-if="!loading" class="page-title">Seleccione un test</h2>
    <Swiper
      v-if="!loading"
      :spaceBetween="30"
      :slidesPerView="1"
      :loop="true"
      :pagination="pagination"
      :navigation="true"
      :modules="modules"
      :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
    >
      <swiper-slide class="swiper-slide" v-for="test in result" :key="test.id">
        <VTestCard
          :id="test.id"
          :title="test.name"
          :description="test.description"
          :duration="test.durationTime"
        />
      </swiper-slide>
    </Swiper>
    <VLoading v-else/>
</template>
<style>

.swiper {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 50rem;
}


.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42rem;
}

.swiper-button-next,
.swiper-button-prev {
  color: black;
  transition: all ease 0.2s;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  transform: scale(1.1);
}

.swiper-button-next:active,
.swiper-button-prev:active {
  transform: scale(1);
  opacity: 0.5;
}

.swiper-pagination-bullet {
  height: 1.8rem;
  width: 1.8rem;
  transition: all ease 0.3s;
  background: rgb(194, 194, 194);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: black;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  background: black;
  color: white;
}

</style>