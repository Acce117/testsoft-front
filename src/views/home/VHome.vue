<template>
  <div class="home">
    <div class="home__left">
      <h1>TestSoft</h1>
      <h2>Herramienta para la ejecución de test psicológicos</h2>
    </div>
    <div class="home__right">
      <VPresentation />
    </div>
  </div>
</template>

<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
</script>

<style>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: 5rem;
}
.home__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  margin-top: 6rem;
  animation: 0.5s scale;
}
.home__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 30rem;
  z-index: 2;
}


.home__left h1 {
  color: white;
  font-size: 4rem;
  width: 100%;
}
.home__left h2 {
  color: white;
  width: 90%;
  font-size: 1.5rem;
}
@media (min-width: 480px) {
  .home {
    gap: 2rem;
  }
  .home__left {
    margin: 5rem 0;
  }
  .home__left h2 {
    font-size: 1.8rem;
    width: 30rem;
  }
}
@media (min-width: 768px) {
  .home__left h1 {
    font-size: 4rem;
  }
  .home__left h2 {
    font-size: 1.8rem;
    width: 50rem;
  }
}
@media (min-width: 1024px) {
  .home {
    flex-direction: row;
    height: 78rem;
    overflow: hidden;
  }
  .home__left {
    width: 40rem;
    margin-top: 0;
    margin-left: 5rem;
  }
  .home__right {
    width: 50rem;
  }
  .home__left h1 {
    font-size: 7rem;
  }
  .home__left h2 {
    font-size: 2.5rem;
    width: 100%;
  }
}
</style>
