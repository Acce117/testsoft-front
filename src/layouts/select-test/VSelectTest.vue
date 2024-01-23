<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import VTestCard from './components/VTestCard.vue'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
const modules = [Pagination, Autoplay, Navigation];
</script>
<template>
  <Swiper
    :spaceBetween="30"
    :slidesPerView="1"
    
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    :breakpoints="{ 768:{ slidesPerView:2 }, 1024:{ slidesPerView:3, } }"
  >
    <swiper-slide class="swiper-slide">
      <VTestCard
        title="MBTI (Myers- Briggs Type Indicator)"
        description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
        :duration=30
      />
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <VTestCard
        title="MBTI (Myers- Briggs Type Indicator)"
        description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
        :duration=30
      />
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <VTestCard
        title="MBTI (Myers- Briggs Type Indicator)"
        description="Esta es una prueba que va a reflejar sus preferencias y gustos. Sus
        respuestas a estas preguntas ayudarán a mostrarle cómo prefiere ver las
        cosas y cómo prefiere tomar sus decisiones."
        :duration=30
      />
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <VTestCard
        title="Belbin"
        description="Esta técnica, creada por Meredith Belbin, pretende evaluar dimensiones relacionadas con el trabajo en equipo. El inventario consta de siete secciones encabezadas por una pregunta o situación y nueve alternativas de respuesta. Cada alternativa representa una categoría de rol y el sujeto dispone de diez puntos para distribuir entre las ocho alternativas de cada sección según su autoapreciación."
        :duration=15
      />
    </swiper-slide>
  </Swiper>
</template>
