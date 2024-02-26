<template>
  <VByCategory
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
