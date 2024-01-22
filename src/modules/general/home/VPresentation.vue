<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
const modules = [EffectFade, Pagination, Autoplay];
</script>
<template>
  <Swiper
    :slidesPerView="1"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
  >
    <swiper-slide class="swiper-slide">
      <div class="presentation-element">
        <img src="/img/leadership.svg" />
        <h2>Mide las capacidades de liderazgo</h2>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="presentation-element">
        <img src="/img/role.svg" />
        <h2>Encuentra los roles más efectivos</h2>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="presentation-element">
        <img src="/img/equality.svg" />
        <h2>Descubre compatibilidades</h2>
      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <div class="presentation-element">
        <img src="/img/results.svg" />
        <h2>Analiza los resultados</h2>
      </div>
    </swiper-slide>
  </Swiper>
</template>
<style>
.presentation-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 1rem;
  border-radius: 1.5rem;
  width: 20rem;
  height: 20rem;
  box-shadow: 0 0 0.3rem 0.3rem #00000030;
}
.presentation-element h2 {
  font-size: 2rem;
  text-align: center;
}

.swiper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40rem;
  width: 35rem;
}

.swiper-pagination {
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 1.5rem;
  height: 3rem;
  box-shadow: 0 0 0.3rem 0.3rem #00000030;
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
  .presentation-element {
    width: 20rem;
    height: 20rem;
  }
  .presentation-element h2 {
    font-size: 2rem;
  }
  .swiper-slide {
    height: 35rem;
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
}
@media (min-width: 1024px) {
  .presentation-element {
    width: 40rem;
    height: 30rem;
  }
  .presentation-element h2 {
    font-size: 3rem;
  }
  .swiper-slide {
    height: 60rem;
  }
}
</style>
