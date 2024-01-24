<script setup lang="ts">
import VGeneral from "@/layouts/general/VGeneral.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import VTestCard from "./components/VTestCard.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const modules = [Pagination, Navigation];
</script>
<template>
  <VGeneral>
    <h2 class="select-test__title">Seleccione un test</h2>
    <Swiper
      :spaceBetween="30"
      :slidesPerView="1"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      :breakpoints="{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
    >
      <swiper-slide class="swiper-slide">
        <VTestCard
          title="MBTI (Myers- Briggs Type Indicator)"
          description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
          :duration="30"
        />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <VTestCard
          title="MBTI (Myers- Briggs Type Indicator)"
          description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
          :duration="30"
        />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <VTestCard
          title="MBTI (Myers- Briggs Type Indicator)"
          description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
          :duration="30"
        />
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        <VTestCard
          title="Belbin"
          description="Esta técnica, creada por Meredith Belbin, pretende evaluar dimensiones relacionadas con el trabajo en equipo. El inventario consta de siete secciones encabezadas por una pregunta o situación y nueve alternativas de respuesta. Cada alternativa representa una categoría de rol y el sujeto dispone de diez puntos para distribuir entre las ocho alternativas de cada sección según su autoapreciación."
          :duration="15"
        />
      </swiper-slide>
    </Swiper>
  </VGeneral>
</template>
<style>
.select-test__title {
  margin-top: 10rem;
  text-align:center;
  font-size: 2rem;
}
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

.swiper-pagination {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 1.5rem;
  height: 3rem;
  box-shadow: 0 0 0.6rem 0.6rem #00000030;
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
  height: 1rem;
  width: 1rem;
}
.swiper-pagination-bullet-active {
  background: black;
}
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  width: auto;
  left: auto;
  align-items: center;
  display: flex;
}
@media (min-width: 480px) {
  .select-test__title {
    font-size: 2.5rem;
  }
}

@media (min-width: 768px) {
  .swiper-pagination {
    height: 4rem;
  }
  .swiper-pagination-bullet {
    height: 2rem;
    width: 2rem;
  }
  .select-test__title {
    text-align:left;
    margin: 10rem 0 0 10rem;
    font-size: 3.5rem;
  }
}
</style>
