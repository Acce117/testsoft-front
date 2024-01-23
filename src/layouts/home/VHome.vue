
<template>
  <VGeneral>
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
  </VGeneral>
</template>

<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
import VGeneral from '@/layouts/general/VGeneral.vue'
</script>

<style>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 70rem;
}
.home__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 3;
  margin-top: 10rem;
}
.home__left button {
  margin-top: 2rem;
  font-size: 1.5rem;
}

.home__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 30rem;
}
.home__background {
  transform: rotate(45deg);
  position: absolute;
  height: 70rem;
  width: 50rem;
  left: 0rem;
  top: -40rem;
  background: rgba(0, 0, 0);
  border-radius: 20rem;
  z-index: 2;
}
.home__background ~ * {
  position: relative;
}
.home__left h1 {
  color: white;
  font-size: 4rem;
  width: 100%;
}
.home__left h2 {
  color: white;
  width: 100%;
  font-size: 1.5rem;
}
@media (min-width: 480px) {
  .home__background {
    transform: rotate(40deg);
    height: 90rem;
    width: 70rem;
    left: -2rem;
    top: -60rem;
    border-radius: 40rem;
  }
  .home__left {
    margin-top: 5rem;
  }
  .home__left h1 {
    font-size: 5rem;
  }
  .home__left h2 {
    font-size: 2.4rem;
  }
  .home__left button {
    font-size: 2rem;
  }
}
@media (min-width: 768px) {
  .home__background {
    
    width: 110rem;
    height: 140rem;
    left: -5rem;
    top: -100rem;
    border-radius: 60rem;
  }
  .home__left button {
    width: 20rem;
  }
}
@media (min-width: 1024px) {
  .home__background {
    transform: rotate(60deg);
    height: 80rem;
    width: 80rem;
    top: -10rem;
    left: -40rem;
    border-radius: 30rem;
  }
  .home {
    flex-direction: row;
  }
  .home__left {
    width: 40rem;
    margin-top: 0;
  }
  .home__right {
    width: 50rem;
  }
  .home__left h1 {
    width: 100%;
  }
  .home__left h2 {
    font-size: 2.2rem;
  }
  .home__left button {
    margin-top: 5rem;
    font-size: 2rem;
  }
}
</style>
