<template>

  <h2 my-0 v-if="
    props.testResult.parameters.count_max > 0 &&
    props.testResult.parameters.count_min > 0
  ">
    {{ t("preferred") }}:
  </h2>


  <VByElement v-for="element in props.testResult.preferred" :element="element" :key="element" />
  <hr w-full />

  <h2 my-0 v-if="
    props.testResult.parameters.count_min > 0 &&
    props.testResult.parameters.count_max > 0
  ">
    {{ t("avoided") }}:
  </h2>

  <VByElement v-for="element in props.testResult.avoided" :key="element" :element="element" />
  <hr w-full />

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VByElement from "./VByElement.vue";
const props = defineProps({
  testResult: { type: Object, required: true },
});
const { t } = useI18n()
</script>


<i18n lang="json">{
  "es": {
    "preferred": "Preferidos",
    "avoided": "Evitados"
  },
  "en": {
    "preferred": "Preferred",
    "avoided": "Avoided"
  }
}</i18n>
