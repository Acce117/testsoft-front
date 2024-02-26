<template>
  <VByElement
    v-for="element in props.testResult?.categories"
    :element="element"
  />
</template>
<script setup lang="ts">
import VByElement from "./VByElement.vue";
const props = defineProps({
  testResult: Object,
});
</script>
