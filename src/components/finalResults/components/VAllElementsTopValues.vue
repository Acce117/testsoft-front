<template>
  <h2 v-if="props.testResult?.process.count_max >0 && props.testResult?.process.count_min >0">
    Tus
    {{ props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos" }}
    preferidos son:
  </h2>

  <VByElement
    v-for="element in props.testResult?.Preferred"
    :element="element"
  />
  <h2 v-if="props.testResult?.process.count_min >0 && props.testResult?.process.count_max >0">
    Tus
    {{ props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos" }}
    evitados son:
  </h2>

  <VByElement v-for="element in props.testResult?.Avoided" :element="element" />
</template>
<script setup lang="ts">
import VByElement from "./VByElement.vue";
const props = defineProps({
  testResult: Object,
});
</script>
