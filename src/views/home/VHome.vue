<template>
  <section flex-col anim-scale-0.5 text-white centered gap-24 lg:flex-row mt-24 lg:ml-24 lg:mt-48>
    <div flex flex-col flex-items-center lg:w-3xl>
      <h1 text-16 lg:text-28>TestSoft</h1>
      <h2 text-8 lg:text-12 text-center>
        {{ $t('home.subtitle') }}
      </h2>
    </div>
      <VPresentation />
  </section>
</template>
<script setup lang="ts">
import VPresentation from "./components/VPresentation.vue";
</script>

