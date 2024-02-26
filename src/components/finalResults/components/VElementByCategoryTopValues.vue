<template>
 
  <h2
    v-if="
      props.testResult?.process.count_max > 0 &&
      props.testResult?.process.count_min > 0
    "
  >
    Tus
    {{ props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos" }}
    preferidos son:
  </h2>

  <VByCategory
    v-if="props.testResult?.process.count_max > 0"
    v-for="category in props.testResult?.categories"
    :category="category"
  />
  <h2
    v-if="
      props.testResult?.process.count_min > 0 &&
      props.testResult?.process.count_max > 0
    "
  >
    Tus
    {{ props.testResult?.process.fk_id_test == 3 ? "roles" : "elementos" }}
    evitados son:
  </h2>

  <VByCategory
    v-if="props.testResult?.process.count_min > 0"
    v-for="category in props.testResult?.categories"
    :category="category"
  />
</template>
<script setup lang="ts">
import VByCategory from "./VByCategory.vue";
const props = defineProps({
  testResult: Object,
});
</script>
