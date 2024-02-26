<template>
  <VByCategory v-if="props.testResult?.process.element_by_category==1"  v-for="category in props.testResult.categories"  :category="category"/>
  <VByElement v-else-if="props.testResult?.process.all_element_value==1"  v-for="element in props.testResult"  :element="element"/>
</template>
<script setup lang="ts">
import VByCategory from './components/VByCategory.vue';
import VByElement from './components/VByElement.vue';
const props = defineProps({
  testResult: Object,
});
//<VByElement v-else-if="props.testResult?.process.all_element_value==1"  v-for="element in props.testResult"  :element="element"/>
</script>
