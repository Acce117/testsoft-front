<template>
  <h2 v-if="
    props.testResult.parameters.count_max > 0 &&
    props.testResult.parameters.count_min > 0
  ">
    {{ $t("results.all-elements-top-values.preferred") }}:
  </h2>
  <div v-if="props.testResult.parameters.count_max > 0">
    <VByCategory v-for="category in props.testResult?.categories" :category="category" :key="category.id_category" />
  </div>

  <h2 v-if="
    props.testResult.parameters.count_min > 0 &&
    props.testResult.parameters.count_max > 0
  ">
    {{ $t("results.all-elements-top-values.avoided") }}:
  </h2>
  <div v-if="props.testResult.parameters.count_min > 0">

    <VByCategory v-for="category in props.testResult?.categories" :category="category" :key="category.id_category" />
  </div>

</template>
<script setup lang="ts">
import VByCategory from "./VByCategory.vue";
const props = defineProps({
  testResult: { type: Object, required: true },
});
</script>
