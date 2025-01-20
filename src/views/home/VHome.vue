<template>
  <section anim-opacity-0.5 text-slate-8 class="home-background" h-full>
    <div flex items-center justify-center w-full h-full>
      <div z-2   w-fit items-center ml-4 mx-4 mt--20 xl:mx-0 flex-col text-center lg:text-left>

        <h1 text-6xl lg:text-8xl mt-0 mb-4 font-bold>TestSoft</h1>
        <h2 text-2xl lg:text-xl lg:max-w-100 m-0 font-poppins>
          {{ $t('home.subtitle') }}
        </h2>
        <Button v-ripple mt-2rem rounded border-none w-12rem iconPos="right" @click="router.push('/select-test')"
          label="Comenzar" icon="pi pi-arrow-right">
        </Button>
      </div>


      <img hidden lg:block  mt-0 w-200 src="/img/psychometric_practice.webp" />

    </div>

    <VPresentation />
  </section>
</template>
<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
import Button from "primevue/button";
import router from "@/router";
</script>
<style>
.home-background {
  background: -webkit-linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);

  background: linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);
}
</style>
