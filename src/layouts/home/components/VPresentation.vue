<script setup lang="ts"></script>
<template>
  <div class="presentation">
    <button class="presentation__button">
      <img src="/img/leadership.svg" />
      Mide las capacidades de liderazgo
    </button>

    <button class="presentation__button">
      <img src="/img/role.svg" />
      Encuentra los roles más efectivos
    </button>

    <button class="presentation__button">
      <img src="/img/equality.svg" />
      Descubre compatibilidades
    </button>

    <button class="presentation__button">
      <img src="/img/results.svg" />
      Analiza los resultados
    </button>
  </div>
</template>
<style>
.presentation {
  display: flex;
  flex-wrap: wrap;
  width: 30rem;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.presentation__button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: .5rem;
  padding: 1rem;
  font-size: 1.4rem;
  width: 12rem;
  height: 12rem;
  box-shadow: 0 0 0.3rem 0.3rem #00000030;
}
.presentation__button:hover {
  transform: scale(1.1);
}
.presentation__button:active {
  transform: scale(1);
  background-color: black;
  color: white;
}
.presentation__button:active img {
  filter: invert();
}
.presentation__button img {
  width: 3rem;
}

@media (min-width: 480px) {
  .presentation{
    width: 40rem;
  }
  .presentation__button {
    width: 15rem;
    height: 15rem;
    font-size: 1.6rem;
  }
}
@media (min-width: 768px) {
}
@media (min-width: 1024px) {
  .presentation {
    width: 50rem;
    gap: 4rem;
  }
  .presentation__button {
    width: 20rem;
    height: 20rem;
    font-size: 2rem;
  }
  .presentation__button img {
    width: 5rem;
  }
}
</style>
