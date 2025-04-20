<template>
  <h2 v-if="
    props.testResult.parameters.count_max > 0 &&
    props.testResult.parameters.count_min > 0
  ">
    {{ t("preferred") }}:
  </h2>
  <div v-if="props.testResult.parameters.count_max > 0">
    <VByCategory v-for="category in props.testResult?.categories" :category="category" :key="category.id_category" />
  </div>

  <h2 v-if="
    props.testResult.parameters.count_min > 0 &&
    props.testResult.parameters.count_max > 0
  ">
    {{ t("avoided") }}:
  </h2>
  <div v-if="props.testResult.parameters.count_min > 0">

    <VByCategory v-for="category in props.testResult?.categories" :category="category" :key="category.id_category" />
  </div>

</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import VByCategory from "./VByCategory.vue";
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
