<template>

  <h2 my-0 v-if="
    props.testResult.parameters.count_max > 0 &&
    props.testResult.parameters.count_min > 0
  ">
    {{ $t("results.all-elements-top-values.preferred") }}:
  </h2>


  <VByElement v-for="element in props.testResult.preferred" :element="element" :key="element" />
  <hr w-full />

  <h2 my-0 v-if="
    props.testResult.parameters.count_min > 0 &&
    props.testResult.parameters.count_max > 0
  ">
    {{ $t("results.all-elements-top-values.avoided") }}:
  </h2>

  <VByElement v-for="element in props.testResult.avoided" :key="element" :element="element" />
  <hr w-full />

</template>
<script setup lang="ts">
import VByElement from "./VByElement.vue";
const props = defineProps({
  testResult: { type: Object, required: true },
});
</script>
