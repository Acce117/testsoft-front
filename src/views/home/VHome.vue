<template>
  <section flex-col anim-scale-0.5 text-slate-8 mt-10rem>
    <div flex flex-col flex-items-center>
      <h1 text-8xl m-4 font-bold>TestSoft</h1>
      <h2 text-3xl m-0 text-center>
        {{ $t('home.subtitle') }}
      </h2>
      <Button  mt-2rem bg-secondary font-bold  rounded border-none text-xl w-12rem label="Comenzar">
        
      </Button>
    </div>
    <VPresentation />
  </section>
</template>
<script setup lang="ts">
import VButton from "@/components/VButton.vue";
import VPresentation from "./components/VPresentation.vue";
import Button from "primevue/button";
</script>
