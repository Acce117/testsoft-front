<template>
  <section flex-col anim-scale-0.5 text-slate-8 mt-10rem>
    <div flex flex-col flex-items-center>
      <h1 text-8xl m-4 font-bold>TestSoft</h1>
      <h2 text-3xl m-0 text-center font-poppins>
        {{ $t('home.subtitle') }}
      </h2>
      <Button v-ripple mt-2rem rounded border-none w-12rem iconPos="right" @click="router.push('/select-test')"  label="Comenzar" icon="pi pi-arrow-right">

      </Button>
    </div>
    <VPresentation />
  </section>
</template>
<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
import Button from "primevue/button";
import router from "@/router";
</script>
