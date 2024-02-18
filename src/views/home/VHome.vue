<template>
  <div class="home">
    <span class="home__background"></span>
    <div class="home__left">
      <h1>Testsoft</h1>
      <h2>
        Herramienta para la ejecución de test psicológicos y psicométricos
      </h2>
    </div>
    <div class="home__right">
      <VPresentation />
    </div>
  </div>
</template>

<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
</script>

<style >


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
.home__background {
  position: absolute;
  height: 20rem;
  width: 100vw;
  top: 0;
  background: rgba(0, 0, 0);
  border-radius:  0 0 8rem 8rem;
  z-index: 2;
  transition: all ease 0.2s;
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
  .home__background {
   border-radius: 0 0 6rem  6rem;
  }

  .home__left h1 {
    font-size: 4rem;
  }
  .home__left h2 {
    font-size: 1.8rem;
    width: 50rem;
  }
}
@media (min-width: 1024px) {
  .home__background {
    transform: rotate(60deg);
    height: 80rem;
    width: 80rem;
    top: -5rem;
    left: -40rem;
    border-radius: 30rem;
  }
  .home {
    flex-direction: row;
    height: 78rem;
    overflow: hidden;
  }
  .home__left {
    width: 40rem;
    margin-top: 0;
    margin-left: 1rem;
  }
  .home__right {
    width: 50rem;
  }
  .home__left h1 {
    font-size: 5rem;
  }
  .home__left h2 {
    font-size: 2.2rem;
    width: 100%;
  }
}
</style>
