
<template>
  <div class="presentation">
    <button class="presentation__button" @click="goTests()">
      <img src="/img/test_icon.svg" />
      Realiza un test
    </button>

    <button class="presentation__button">
      <img src="/img/role.svg" />
      Encuentra los roles más efectivos
    </button>

    <button class="presentation__button">
      <img src="/img/equality.svg" />
      Descubre compatibilidades y líderes
    </button>

    <button class="presentation__button">
      <img src="/img/results.svg" />
      Analiza los resultados
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const goTests = () => {
  router.push("/select-test");
};
</script>
<style>
.presentation {
  display: flex;
  flex-wrap: wrap;
  width: 32rem;
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
  font-size: 1.8rem;
  width: 15rem;
  height: 15rem;
}
.presentation__button:active {
  background-color: black;
  color: white;
}

.presentation__button img {
  width: 3rem;
}

@media (min-width: 480px) {
  .presentation{
    width: 40rem;
  }
  .presentation__button {
    width: 16rem;
    height: 16rem;
    font-size: 2rem;
  }
}
@media (min-width: 768px) {
  .presentation {
    width: 50rem;
    gap: 3rem;
  }
  .presentation__button {
    width: 18rem;
    height: 18rem;
    font-size: 1.8rem;
  }
  .presentation__button img {
    width: 5rem;
  }
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
}
</style>
