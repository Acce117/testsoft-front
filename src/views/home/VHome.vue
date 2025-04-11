<template>
  
  <section class="pt-24 anim-opacity-0.5">
    <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <p class="uppercase tracking-loose w-full">{{ $t('home.overtitle') }}</p>
        <h1 class="my-4 text-5xl font-bold leading-tight">
          {{ $t('home.title') }}
        </h1>
        <p class="leading-normal text-2xl mb-8">
          {{ $t('home.subtitle') }}
        </p>

        <Button v-ripple v-if="userStore().assignments[0].item_id == 3"
          class="mx-auto focus:shadow-outline lg:mx-0 transform transition duration-300 ease hover:scale-105 my-6 py-4 px-8 rounded-full shadow-lg"
          rounded iconPos="right" @click="router.push('/select-test')" :label="$t('global.start')"
          icon="pi pi-arrow-right" severity="warn">
        </Button>
      </div>
      <div class="w-full md:w-3/5 py-6 text-center">
        <img class="w-full md:w-4/5 z-50" src="/img/psychometric_practice.webp" />
        <!-- <img hidden lg:block mt-20 w-160 src="/img/psychometric_practice.webp" /> -->

      </div>
    </div>
  </section>


  <VPresentation />
</template>
<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
import Button from "primevue/button";
import router from "@/router";
import { userStore } from "@/modules/security/store/user-store";
</script>
<style>
.home-background {
  background: -webkit-linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);

  background: linear-gradient(10deg, #3faee4, #ffffff, #ffffff, #ffffff, #ffffff);
}

</style>
