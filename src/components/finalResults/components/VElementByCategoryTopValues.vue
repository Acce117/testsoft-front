<template>
  <h2
    v-if="
      props.testResult?.process.count_max > 0 &&
      props.testResult?.process.count_min > 0
    "
  >
    {{ $t("results.all-elements-top-values.preferred") }}:
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
    {{ $t("results.all-elements-top-values.avoided") }}:
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
